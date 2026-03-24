'use client';

import { useState, useEffect, useCallback } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { CheckCircle, ChevronRight, ChevronLeft, Loader2, Music, CreditCard } from 'lucide-react';

const CATEGORIES = ['Geetham', 'Varnam', 'Krithi', 'Thillana', 'Viruttham', 'Alapana'] as const;
type Category = typeof CATEGORIES[number];

const ENTRY_FEE = 35; // USD per category

function calculateAgeAsOfMay1(birthday: string): number | null {
    if (!birthday) return null;
    const bday = new Date(birthday);
    const may1 = new Date(2026, 4, 1);
    let age = may1.getFullYear() - bday.getFullYear();
    const m = may1.getMonth() - bday.getMonth();
    if (m < 0 || (m === 0 && may1.getDate() < bday.getDate())) age--;
    return age;
}

function getAgeGroup(age: number | null): string {
    if (age === null) return '—';
    if (age >= 6 && age <= 9) return 'Sub-Junior';
    if (age >= 10 && age <= 14) return 'Junior';
    if (age >= 15 && age <= 18) return 'Senior';
    return 'Not Eligible';
}

function getRequiredSongCount(ageGroup: string): number {
    if (ageGroup === 'Senior') return 4;
    if (ageGroup === 'Junior') return 3;
    if (ageGroup === 'Sub-Junior') return 1;
    return 1;
}

type SongEntry = { song: string; raga: string; tala: string; composer: string };
type AlapanaEntry = { raga1: string; raga2: string; raga3: string };
type VirutthamEntry = { sahityam: string; raga1: string; raga2: string; raga3: string; raga4: string };

type CategoryData = {
    songs?: SongEntry[];
    alapana?: AlapanaEntry;
    viruttham?: VirutthamEntry;
};

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function RegisterPage() {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [userId, setUserId] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [categoryData, setCategoryData] = useState<Record<string, CategoryData>>({});
    const [errorMsg, setErrorMsg] = useState('');

    const age = profile?.birthday ? calculateAgeAsOfMay1(profile.birthday) : null;
    const ageGroup = getAgeGroup(age);
    const songCount = getRequiredSongCount(ageGroup);
    const totalFee = selectedCategories.length * ENTRY_FEE;

    useEffect(() => {
        async function load() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { window.location.href = '/login'; return; }
            setUserId(user.id);

            const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            setProfile(data);
            setLoading(false);
        }
        load();
    }, []);

    // Initialize category data when categories change
    const initCategoryData = useCallback((cats: Category[]) => {
        const newData: Record<string, CategoryData> = {};
        cats.forEach(cat => {
            if (cat === 'Alapana') {
                newData[cat] = categoryData[cat] || { alapana: { raga1: '', raga2: '', raga3: '' } };
            } else if (cat === 'Viruttham') {
                newData[cat] = categoryData[cat] || { viruttham: { sahityam: '', raga1: '', raga2: '', raga3: '', raga4: '' } };
            } else {
                const existing = categoryData[cat]?.songs;
                const songs: SongEntry[] = [];
                for (let i = 0; i < songCount; i++) {
                    songs.push(existing?.[i] || { song: '', raga: '', tala: '', composer: '' });
                }
                newData[cat] = { songs };
            }
        });
        setCategoryData(newData);
    }, [categoryData, songCount]);

    const toggleCategory = (cat: Category) => {
        setSelectedCategories(prev => {
            const next = prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat];
            return next;
        });
    };

    const updateSong = (cat: string, idx: number, field: keyof SongEntry, value: string) => {
        setCategoryData(prev => {
            const updated = { ...prev };
            const songs = [...(updated[cat]?.songs || [])];
            songs[idx] = { ...songs[idx], [field]: value };
            updated[cat] = { ...updated[cat], songs };
            return updated;
        });
    };

    const updateAlapana = (field: string, value: string) => {
        setCategoryData(prev => ({
            ...prev,
            Alapana: { alapana: { ...(prev.Alapana?.alapana as AlapanaEntry), [field]: value } }
        }));
    };

    const updateViruttham = (field: string, value: string) => {
        setCategoryData(prev => ({
            ...prev,
            Viruttham: { viruttham: { ...(prev.Viruttham?.viruttham as VirutthamEntry), [field]: value } }
        }));
    };

    const goToStep2 = () => {
        if (selectedCategories.length === 0) {
            setErrorMsg('Please select at least one category.');
            return;
        }
        if (ageGroup === 'Not Eligible' || ageGroup === '—') {
            setErrorMsg('Your age is not eligible for any group. Please update your profile.');
            return;
        }
        setErrorMsg('');
        initCategoryData(selectedCategories);
        setStep(2);
    };

    const loadRazorpayScript = (): Promise<boolean> => {
        return new Promise(resolve => {
            if (window.Razorpay) { resolve(true); return; }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setSubmitting(true);
        setErrorMsg('');

        try {
            // 1. Create Razorpay order
            const res = await fetch('/api/razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: totalFee,
                    categories: selectedCategories,
                    userId,
                }),
            });
            const orderData = await res.json();
            if (!res.ok) throw new Error(orderData.error);

            // 2. Load Razorpay script
            const loaded = await loadRazorpayScript();
            if (!loaded) throw new Error('Failed to load Razorpay');

            // 3. Open Razorpay checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'SaaMa',
                description: `Competition Registration (${selectedCategories.length} categories)`,
                order_id: orderData.orderId,
                handler: async function (response: any) {
                    // Payment successful — save registrations
                    try {
                        const entries = selectedCategories.map(cat => ({
                            user_id: userId,
                            competition_item: cat,
                            category: 'Music',
                            student_name: profile?.full_name || '',
                            dob: profile?.birthday || null,
                            songs: categoryData[cat] || {},
                            status: 'confirmed',
                            payment_id: response.razorpay_payment_id,
                        }));

                        const { error } = await supabase.from('registrations').insert(entries);
                        if (error) throw error;

                        window.location.href = '/portal';
                    } catch (err: any) {
                        setErrorMsg('Payment received but registration save failed: ' + err.message);
                        setSubmitting(false);
                    }
                },
                prefill: {
                    email: profile?.email || '',
                    contact: profile?.mobile || profile?.phone || '',
                },
                theme: {
                    color: '#3d230d',
                },
                modal: {
                    ondismiss: function () {
                        setSubmitting(false);
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err: any) {
            setErrorMsg(err.message || 'Payment failed');
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#faf5eb] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#3d230d]" />
            </div>
        );
    }

    if (!profile?.full_name || !profile?.birthday) {
        return (
            <div className="min-h-screen bg-[#faf5eb] flex items-center justify-center px-4">
                <div className="bg-white/80 border border-[#d4c4a8] rounded-xl p-8 max-w-md text-center shadow-sm">
                    <h2 className="text-2xl font-bold text-[#5c3a1e] mb-4">Complete Your Profile First</h2>
                    <p className="text-[#7a5c3a] mb-6">You need to fill in your profile (name, birthday, etc.) before registering for competitions.</p>
                    <a href="/portal/profile" className="inline-block bg-[#3d230d] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#2a1809] transition-colors">
                        Go to Profile →
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#faf5eb] py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">

                {/* Progress */}
                <div className="mb-10">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-[#d4c4a8] -z-10" />
                        {[1, 2, 3].map(s => (
                            <div key={s} className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${step >= s ? 'border-[#3d230d] bg-[#3d230d] text-white' : 'border-[#d4c4a8] bg-[#faf5eb] text-[#7a5c3a]'}`}>
                                {step > s ? <CheckCircle className="h-5 w-5" /> : s}
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 flex justify-between text-xs font-bold text-[#7a5c3a] px-1">
                        <span>Select Categories</span>
                        <span>Repertoire Details</span>
                        <span>Review & Pay</span>
                    </div>
                </div>

                {/* Profile Info Banner */}
                <div className="bg-white/80 border border-[#d4c4a8] rounded-lg p-4 mb-6 flex items-center justify-between shadow-sm">
                    <div className="text-sm text-[#5c3a1e]">
                        <span className="font-bold">{profile.full_name}</span> · Age: <span className="font-bold">{age}</span>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${ageGroup === 'Sub-Junior' ? 'bg-green-100 text-green-800' : ageGroup === 'Junior' ? 'bg-blue-100 text-blue-800' : ageGroup === 'Senior' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}>
                        {ageGroup}
                    </span>
                </div>

                <div className="bg-white/80 border border-[#d4c4a8] rounded-xl p-8 shadow-sm">

                    {/* STEP 1: Category Selection */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-[#5c3a1e] flex items-center gap-2">
                                <Music className="h-6 w-6 text-[#3d230d]" /> Select Categories
                            </h2>
                            <p className="text-[#7a5c3a] text-sm">Select all the categories you wish to register for. Each category costs <strong className="text-[#3d230d]">US $35</strong>.</p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => toggleCategory(cat)}
                                        className={`py-4 px-4 rounded-lg border-2 font-bold text-center transition-all ${selectedCategories.includes(cat) ? 'border-[#3d230d] bg-[#3d230d]/10 text-[#3d230d]' : 'border-[#d4c4a8] bg-white text-[#7a5c3a] hover:border-[#3d230d]/50'}`}
                                    >
                                        {selectedCategories.includes(cat) && <CheckCircle className="h-4 w-4 inline mr-1" />}
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {selectedCategories.length > 0 && (
                                <div className="bg-[#3d230d]/5 border border-[#3d230d]/20 rounded-lg p-4 text-sm">
                                    <span className="text-[#5c3a1e]">Selected: <strong>{selectedCategories.length}</strong> categories</span>
                                    <span className="float-right text-[#3d230d] font-bold text-lg">${totalFee}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 2: Repertoire Details */}
                    {step === 2 && (
                        <div className="space-y-8">
                            <h2 className="text-2xl font-bold text-[#5c3a1e]">Repertoire Details</h2>

                            {selectedCategories.map(cat => (
                                <div key={cat} className="border border-[#d4c4a8] rounded-lg p-6 bg-[#faf5eb]">
                                    <h3 className="font-bold text-lg text-[#3d230d] mb-4">{cat}</h3>

                                    {/* Geetham / Varnam / Krithi / Thillana — Song inputs */}
                                    {['Geetham', 'Varnam', 'Krithi', 'Thillana'].includes(cat) && (
                                        <div className="space-y-4">
                                            <p className="text-xs text-[#7a5c3a]">
                                                {ageGroup} category: submit <strong>{songCount}</strong> {songCount === 1 ? 'composition' : 'compositions'}
                                            </p>
                                            {categoryData[cat]?.songs?.map((song, idx) => (
                                                <div key={idx} className="bg-white rounded-lg border border-[#d4c4a8] p-4">
                                                    <p className="text-xs font-bold text-[#7a5c3a] uppercase mb-3">Composition {idx + 1}</p>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <input placeholder="Song" value={song.song} onChange={e => updateSong(cat, idx, 'song', e.target.value)} className="bg-[#faf5eb] border border-[#d4c4a8] rounded-lg px-3 py-2 text-sm text-[#5c3a1e]" />
                                                        <input placeholder="Raga" value={song.raga} onChange={e => updateSong(cat, idx, 'raga', e.target.value)} className="bg-[#faf5eb] border border-[#d4c4a8] rounded-lg px-3 py-2 text-sm text-[#5c3a1e]" />
                                                        <input placeholder="Tala" value={song.tala} onChange={e => updateSong(cat, idx, 'tala', e.target.value)} className="bg-[#faf5eb] border border-[#d4c4a8] rounded-lg px-3 py-2 text-sm text-[#5c3a1e]" />
                                                        <input placeholder="Composer" value={song.composer} onChange={e => updateSong(cat, idx, 'composer', e.target.value)} className="bg-[#faf5eb] border border-[#d4c4a8] rounded-lg px-3 py-2 text-sm text-[#5c3a1e]" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Alapana — 3 Ragas */}
                                    {cat === 'Alapana' && (
                                        <div className="space-y-3">
                                            <p className="text-xs text-[#7a5c3a]">Submit 3 ragas. The judges will select one for you to present.</p>
                                            {(['raga1', 'raga2', 'raga3'] as const).map((field, i) => (
                                                <div key={field}>
                                                    <label className="text-xs font-bold text-[#7a5c3a] uppercase">Raga {i + 1}</label>
                                                    <input placeholder={`Raga ${i + 1}`} value={(categoryData.Alapana?.alapana as any)?.[field] || ''} onChange={e => updateAlapana(field, e.target.value)} className="w-full bg-white border border-[#d4c4a8] rounded-lg px-3 py-2 text-sm text-[#5c3a1e] mt-1" />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Viruttham — Sahityam + 4 Ragas */}
                                    {cat === 'Viruttham' && (
                                        <div className="space-y-3">
                                            <p className="text-xs text-[#7a5c3a]">Submit 1 viruttham with up to 4 ragas.</p>
                                            <div>
                                                <label className="text-xs font-bold text-[#7a5c3a] uppercase">Sahityam</label>
                                                <input placeholder="Sahityam" value={(categoryData.Viruttham?.viruttham as any)?.sahityam || ''} onChange={e => updateViruttham('sahityam', e.target.value)} className="w-full bg-white border border-[#d4c4a8] rounded-lg px-3 py-2 text-sm text-[#5c3a1e] mt-1" />
                                            </div>
                                            {(['raga1', 'raga2', 'raga3', 'raga4'] as const).map((field, i) => (
                                                <div key={field}>
                                                    <label className="text-xs font-bold text-[#7a5c3a] uppercase">Raga {i + 1}</label>
                                                    <input placeholder={`Raga ${i + 1}`} value={(categoryData.Viruttham?.viruttham as any)?.[field] || ''} onChange={e => updateViruttham(field, e.target.value)} className="w-full bg-white border border-[#d4c4a8] rounded-lg px-3 py-2 text-sm text-[#5c3a1e] mt-1" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* STEP 3: Review & Pay */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-[#5c3a1e] flex items-center gap-2">
                                <CreditCard className="h-6 w-6 text-[#3d230d]" /> Review & Pay
                            </h2>

                            <div className="space-y-4">
                                <div className="border border-[#d4c4a8] rounded-lg overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-[#3d230d] text-white">
                                            <tr>
                                                <th className="text-left px-4 py-2">Category</th>
                                                <th className="text-right px-4 py-2">Fee</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedCategories.map(cat => (
                                                <tr key={cat} className="border-t border-[#d4c4a8]">
                                                    <td className="px-4 py-3 font-medium text-[#5c3a1e]">{cat}</td>
                                                    <td className="px-4 py-3 text-right text-[#5c3a1e]">$35.00</td>
                                                </tr>
                                            ))}
                                            <tr className="border-t-2 border-[#3d230d] bg-[#3d230d]/5">
                                                <td className="px-4 py-3 font-bold text-[#3d230d]">Total</td>
                                                <td className="px-4 py-3 text-right font-bold text-[#3d230d] text-lg">${totalFee}.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="bg-[#faf5eb] border border-[#d4c4a8] rounded-lg p-4 text-sm text-[#7a5c3a]">
                                    <strong>Participant:</strong> {profile.full_name} · <strong>Age Group:</strong> {ageGroup} · <strong>Birthday:</strong> {profile.birthday}
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-yellow-800 text-xs">
                                    By proceeding, you confirm that all details are accurate and agree to the competition rules. No changes allowed after <strong>May 14, 2026</strong>.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {errorMsg && (
                        <div className="mt-4 p-3 rounded-md bg-red-100 text-red-800 text-sm font-medium">
                            {errorMsg}
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="mt-8 flex items-center justify-between pt-6 border-t border-[#d4c4a8]">
                        {step > 1 ? (
                            <button type="button" onClick={() => setStep(s => s - 1)} className="flex items-center text-sm font-medium text-[#7a5c3a] hover:text-[#5c3a1e]">
                                <ChevronLeft className="h-4 w-4 mr-1" /> Back
                            </button>
                        ) : <div />}

                        {step === 1 && (
                            <button type="button" onClick={goToStep2} className="flex items-center bg-[#3d230d] text-white font-bold py-2.5 px-6 rounded-lg hover:bg-[#2a1809] transition-colors">
                                Next <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        )}
                        {step === 2 && (
                            <button type="button" onClick={() => setStep(3)} className="flex items-center bg-[#3d230d] text-white font-bold py-2.5 px-6 rounded-lg hover:bg-[#2a1809] transition-colors">
                                Review & Pay <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        )}
                        {step === 3 && (
                            <button type="button" onClick={handlePayment} disabled={submitting} className="flex items-center bg-[#3d230d] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#2a1809] transition-colors disabled:opacity-50 shadow-lg">
                                {submitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <CreditCard className="h-5 w-5 mr-2" />}
                                {submitting ? 'Processing...' : `Pay $${totalFee} with Razorpay`}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

