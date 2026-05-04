'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { CheckCircle, ChevronRight, ChevronLeft, Loader2, Music, CreditCard } from 'lucide-react';

const ALL_CATEGORIES = ['Geetham', 'Varnam', 'Krithi', 'Thillana', 'Viruttham', 'Alapana', 'Swarams'] as const;
type Category = typeof ALL_CATEGORIES[number];

const SUB_JUNIOR_CATEGORIES: Category[] = ['Geetham', 'Varnam'];
const JUNIOR_SENIOR_CATEGORIES: Category[] = ['Krithi', 'Thillana', 'Viruttham', 'Alapana', 'Swarams'];

const ENTRY_FEE = 1; // USD per category

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
    if (age >= 5 && age <= 9) return 'Sub-Junior';
    if (age >= 10 && age <= 14) return 'Junior';
    if (age >= 15 && age <= 18) return 'Senior';
    return 'Not Eligible';
}

function getAvailableCategories(ageGroup: string): Category[] {
    if (ageGroup === 'Sub-Junior') return SUB_JUNIOR_CATEGORIES;
    if (ageGroup === 'Junior' || ageGroup === 'Senior') return JUNIOR_SENIOR_CATEGORIES;
    return [];
}

function getRequiredSongCount(ageGroup: string): number {
    if (ageGroup === 'Senior') return 3;
    if (ageGroup === 'Junior') return 3;
    if (ageGroup === 'Sub-Junior') return 2;
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
        paypal?: any;
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
    const availableCategories = getAvailableCategories(ageGroup);

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

    // Validate that all repertoire fields are filled before proceeding to payment
    const validateRepertoireData = (): string | null => {
        for (const cat of selectedCategories) {
            if (['Geetham', 'Varnam', 'Krithi', 'Thillana', 'Swarams'].includes(cat)) {
                const songs = categoryData[cat]?.songs || [];
                for (let i = 0; i < songs.length; i++) {
                    const s = songs[i];
                    if (!s.song.trim() || !s.raga.trim() || !s.tala.trim() || !s.composer.trim()) {
                        return `Please fill in all fields for ${cat} — Composition ${i + 1} (Song, Raga, Tala, and Composer are all required).`;
                    }
                }
            } else if (cat === 'Alapana') {
                const a = categoryData.Alapana?.alapana as AlapanaEntry | undefined;
                if (!a?.raga1?.trim() || !a?.raga2?.trim() || !a?.raga3?.trim()) {
                    return 'Please fill in all 3 ragas for Alapana.';
                }
            } else if (cat === 'Viruttham') {
                const v = categoryData.Viruttham?.viruttham as VirutthamEntry | undefined;
                if (!v?.sahityam?.trim()) {
                    return 'Please fill in the Sahityam for Viruttham.';
                }
                if (!v?.raga1?.trim() || !v?.raga2?.trim()) {
                    return 'Viruttham requires a minimum of 2 ragas. Please fill in at least Raga 1 and Raga 2.';
                }
            }
        }
        return null;
    };

    const goToStep3 = () => {
        const validationError = validateRepertoireData();
        if (validationError) {
            setErrorMsg(validationError);
            return;
        }
        setErrorMsg('');
        setStep(3);
    };

    const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | null>(null);
    const paypalContainerRef = useRef<HTMLDivElement>(null);
    const paypalRendered = useRef(false);

    // Load PayPal SDK
    const loadPayPalScript = (): Promise<boolean> => {
        return new Promise(resolve => {
            if (window.paypal) { resolve(true); return; }
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // Render PayPal buttons when PayPal is selected
    useEffect(() => {
        if (paymentMethod !== 'paypal' || !paypalContainerRef.current || paypalRendered.current) return;

        const renderButtons = async () => {
            const loaded = await loadPayPalScript();
            if (!loaded || !window.paypal || !paypalContainerRef.current) return;

            paypalRendered.current = true;
            window.paypal.Buttons({
                style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
                createOrder: (_data: any, actions: any) => {
                    return actions.order.create({
                        purchase_units: [{
                            description: `Competition Registration (${selectedCategories.length} categories)`,
                            amount: { value: totalFee.toFixed(2) },
                        }],
                    });
                },
                onApprove: async (_data: any, actions: any) => {
                    setSubmitting(true);
                    try {
                        const details = await actions.order.capture();
                        // Save registrations to Supabase
                        const entries = selectedCategories.map(cat => ({
                            user_id: userId,
                            competition_item: cat,
                            category: 'Music',
                            student_name: profile?.full_name || '',
                            dob: profile?.birthday || null,
                            songs: categoryData[cat] || {},
                            status: 'confirmed',
                            payment_id: details.id,
                            payment_method: 'paypal',
                        }));

                        const { data: savedRegs, error } = await supabase.from('registrations').insert(entries).select('id');
                        if (error) throw error;

                        if (savedRegs && savedRegs.length > 0) {
                            const ids = savedRegs.map(r => r.id);
                            const { triggerConfirmationEmail } = await import('@/app/portal/actions');
                            await triggerConfirmationEmail(ids);
                        }

                        window.location.href = '/portal/register/success';
                    } catch (err: any) {
                        setErrorMsg('Payment received but registration save failed: ' + err.message);
                        setSubmitting(false);
                    }
                },
                onError: (err: any) => {
                    console.error('PayPal error:', err);
                    setErrorMsg('PayPal payment failed. Please try again.');
                },
                onCancel: () => {
                    setSubmitting(false);
                },
            }).render(paypalContainerRef.current);
        };

        renderButtons();
    }, [paymentMethod, selectedCategories, totalFee, userId, profile, categoryData, supabase]);

    // Reset PayPal rendered state when switching methods
    useEffect(() => {
        if (paymentMethod !== 'paypal') {
            paypalRendered.current = false;
        }
    }, [paymentMethod]);

    // Handle Stripe payment
    const handleStripePayment = async () => {
        setSubmitting(true);
        setErrorMsg('');

        try {
            // 1. Save registrations to Supabase first (with pending_payment status)
            const entries = selectedCategories.map(cat => ({
                user_id: userId,
                competition_item: cat,
                category: 'Music',
                student_name: profile?.full_name || '',
                dob: profile?.birthday || null,
                songs: categoryData[cat] || {},
                status: 'pending_payment',
                payment_method: 'stripe',
            }));

            const { data: savedRegs, error: insertError } = await supabase
                .from('registrations')
                .insert(entries)
                .select('id');

            if (insertError) throw new Error('Failed to save registration: ' + insertError.message);

            const registrationIds = savedRegs?.map((r: any) => r.id) || [];

            // 2. Create Stripe Checkout session (only pass IDs, not song data)
            const res = await fetch('/api/stripe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: totalFee,
                    categories: selectedCategories,
                    userId,
                    studentName: profile?.full_name || '',
                    registrationIds,
                    profile: {
                        email: profile?.email || '',
                    },
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            // Redirect to Stripe Checkout
            window.location.href = data.url;
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
                            <p className="text-[#7a5c3a] text-sm">
                                Select all the categories you wish to register for. Each category costs <strong className="text-[#3d230d]">US $35</strong>.
                                {ageGroup === 'Sub-Junior' && (
                                    <span className="block mt-1 text-[#7a5c3a] italic">Sub-Junior participants may only compete in Geetham and Varnam.</span>
                                )}
                                {(ageGroup === 'Junior' || ageGroup === 'Senior') && (
                                    <span className="block mt-1 text-[#7a5c3a] italic">Junior and Senior participants may compete in Kriti, Thillana, Viruttham, Alapana, and Swarams.</span>
                                )}
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {availableCategories.map(cat => (
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

                                    {/* Geetham / Varnam / Krithi / Thillana / Swarams — Song inputs */}
                                    {['Geetham', 'Varnam', 'Krithi', 'Thillana', 'Swarams'].includes(cat) && (
                                        <div className="space-y-4">
                                            <p className="text-xs text-[#7a5c3a]">
                                                {ageGroup} category: submit <strong>{songCount}</strong> {songCount === 1 ? 'composition' : 'compositions'}. All fields are required.
                                            </p>
                                            {categoryData[cat]?.songs?.map((song, idx) => (
                                                <div key={idx} className="bg-white rounded-lg border border-[#d4c4a8] p-4">
                                                    <p className="text-xs font-bold text-[#7a5c3a] uppercase mb-3">Composition {idx + 1}</p>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <input placeholder="Song *" required value={song.song} onChange={e => updateSong(cat, idx, 'song', e.target.value)} className="bg-[#faf5eb] border border-[#d4c4a8] rounded-lg px-3 py-2 text-sm text-[#5c3a1e]" />
                                                        <input placeholder="Raga *" required value={song.raga} onChange={e => updateSong(cat, idx, 'raga', e.target.value)} className="bg-[#faf5eb] border border-[#d4c4a8] rounded-lg px-3 py-2 text-sm text-[#5c3a1e]" />
                                                        <input placeholder="Tala *" required value={song.tala} onChange={e => updateSong(cat, idx, 'tala', e.target.value)} className="bg-[#faf5eb] border border-[#d4c4a8] rounded-lg px-3 py-2 text-sm text-[#5c3a1e]" />
                                                        <input placeholder="Composer *" required value={song.composer} onChange={e => updateSong(cat, idx, 'composer', e.target.value)} className="bg-[#faf5eb] border border-[#d4c4a8] rounded-lg px-3 py-2 text-sm text-[#5c3a1e]" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Alapana — 3 Ragas */}
                                    {cat === 'Alapana' && (
                                        <div className="space-y-3">
                                            <p className="text-xs text-[#7a5c3a]">Submit 3 ragas. The judges will select one for you to present. All fields are required.</p>
                                            {(['raga1', 'raga2', 'raga3'] as const).map((field, i) => (
                                                <div key={field}>
                                                    <label className="text-xs font-bold text-[#7a5c3a] uppercase">Raga {i + 1} *</label>
                                                    <input placeholder={`Raga ${i + 1}`} required value={(categoryData.Alapana?.alapana as any)?.[field] || ''} onChange={e => updateAlapana(field, e.target.value)} className="w-full bg-white border border-[#d4c4a8] rounded-lg px-3 py-2 text-sm text-[#5c3a1e] mt-1" />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Viruttham — Sahityam + 4 Ragas */}
                                    {cat === 'Viruttham' && (
                                        <div className="space-y-3">
                                            <p className="text-xs text-[#7a5c3a]">Submit 1 viruttham with a minimum of 2 and maximum of 4 ragas. Sahityam and at least 2 ragas are required.</p>
                                            <div>
                                                <label className="text-xs font-bold text-[#7a5c3a] uppercase">Sahityam *</label>
                                                <input placeholder="Sahityam" required value={(categoryData.Viruttham?.viruttham as any)?.sahityam || ''} onChange={e => updateViruttham('sahityam', e.target.value)} className="w-full bg-white border border-[#d4c4a8] rounded-lg px-3 py-2 text-sm text-[#5c3a1e] mt-1" />
                                            </div>
                                            {(['raga1', 'raga2', 'raga3', 'raga4'] as const).map((field, i) => (
                                                <div key={field}>
                                                    <label className="text-xs font-bold text-[#7a5c3a] uppercase">Raga {i + 1} {i < 2 ? '*' : '(optional)'}</label>
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
                                    By proceeding, you confirm that all details are accurate and agree to the competition rules. No changes allowed after <strong>May 29, 2026</strong>.
                                </div>

                                {/* Payment Method Selection */}
                                <div className="pt-4">
                                    <p className="text-sm font-bold text-[#5c3a1e] mb-3">Choose Payment Method:</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('stripe')}
                                            className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all font-bold text-sm ${paymentMethod === 'stripe'
                                                    ? 'border-[#635bff] bg-[#635bff]/10 text-[#635bff]'
                                                    : 'border-[#d4c4a8] bg-white text-[#5c3a1e] hover:border-[#635bff]/50'
                                                }`}
                                        >
                                            <CreditCard className="h-5 w-5" />
                                            Pay with Card
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('paypal')}
                                            className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all font-bold text-sm ${paymentMethod === 'paypal'
                                                    ? 'border-[#0070ba] bg-[#0070ba]/10 text-[#0070ba]'
                                                    : 'border-[#d4c4a8] bg-white text-[#5c3a1e] hover:border-[#0070ba]/50'
                                                }`}
                                        >
                                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.893 4.267-1.016 7.153-5.882 7.153h-2.19c-1.573 0-2.905 1.146-3.15 2.7l-1.12 7.106a.641.641 0 0 0 .633.74h3.592c.524 0 .968-.382 1.05-.9l.862-5.468c.082-.518.526-.9 1.05-.9h.66c4.298 0 7.664-1.747 8.647-6.797.37-1.898.085-3.384-.545-4.093z" /></svg>
                                            Pay with PayPal
                                        </button>
                                    </div>

                                    {/* PayPal Buttons Container */}
                                    {paymentMethod === 'paypal' && (
                                        <div className="mt-4">
                                            <div ref={paypalContainerRef} className="min-h-[150px]"></div>
                                        </div>
                                    )}
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
                            <button type="button" onClick={goToStep3} className="flex items-center bg-[#3d230d] text-white font-bold py-2.5 px-6 rounded-lg hover:bg-[#2a1809] transition-colors">
                                Review & Pay <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        )}
                        {step === 3 && paymentMethod === 'stripe' && (
                            <button type="button" onClick={handleStripePayment} disabled={submitting} className="flex items-center bg-[#635bff] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#4b45c6] transition-colors disabled:opacity-50 shadow-lg">
                                {submitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <CreditCard className="h-5 w-5 mr-2" />}
                                {submitting ? 'Redirecting...' : `Pay $${totalFee} with Card`}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
