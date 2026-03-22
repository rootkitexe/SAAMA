'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { User as UserIcon, Save, Loader2 } from 'lucide-react';

function calculateAgeAsOfMay1(birthday: string): number | null {
    if (!birthday) return null;
    const bday = new Date(birthday);
    const may1 = new Date(2026, 4, 1); // May 1, 2026
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

export default function ProfilePage() {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [profile, setProfile] = useState({
        full_name: '',
        birthday: '',
        sex: '',
        mobile: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
    });

    useEffect(() => {
        async function loadProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { window.location.href = '/login'; return; }

            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (data) {
                setProfile({
                    full_name: data.full_name || '',
                    birthday: data.birthday || '',
                    sex: data.sex || '',
                    mobile: data.mobile || '',
                    phone: data.phone || '',
                    email: data.email || user.email || '',
                    address: data.address || '',
                    city: data.city || '',
                    state: data.state || '',
                    zip: data.zip || '',
                });
            } else {
                setProfile(prev => ({ ...prev, email: user.email || '' }));
            }
            setLoading(false);
        }
        loadProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                email: user.email,
                full_name: profile.full_name,
                birthday: profile.birthday || null,
                sex: profile.sex,
                mobile: profile.mobile,
                phone: profile.phone,
                address: profile.address,
                city: profile.city,
                state: profile.state,
                zip: profile.zip,
            });

        setSaving(false);
        if (error) {
            setMessage('Error saving profile: ' + error.message);
        } else {
            setMessage('Profile saved successfully!');
        }
    };

    const age = calculateAgeAsOfMay1(profile.birthday);
    const ageGroup = getAgeGroup(age);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#faf5eb] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#8b0a30]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#faf5eb] py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-[#5c3a1e] flex items-center gap-3">
                            <UserIcon className="h-8 w-8 text-[#8b0a30]" /> User Profile
                        </h1>
                        <p className="text-[#7a5c3a] mt-2">Please complete your profile before registering for competitions.</p>
                    </div>
                    <a href="/portal" className="inline-flex items-center justify-center gap-2 text-sm font-bold text-[#8b0a30] bg-white px-5 py-2.5 rounded-md border border-[#d4c4a8] hover:bg-[#f0ebe0] transition-colors shadow-sm">
                        ← Back to Dashboard
                    </a>
                </div>

                <div className="bg-white/80 border border-[#d4c4a8] rounded-xl p-8 shadow-sm space-y-6">

                    <div>
                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Email</label>
                        <input type="email" value={profile.email} disabled className="w-full rounded-md bg-[#f0ebe0] border border-[#d4c4a8] text-[#7a5c3a] p-2.5 cursor-not-allowed" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Full Name *</label>
                        <input type="text" name="full_name" value={profile.full_name} onChange={handleChange} className="w-full rounded-md bg-white border border-[#d4c4a8] text-[#5c3a1e] p-2.5 focus:ring-[#8b0a30] focus:border-[#8b0a30]" placeholder="As it should appear on certificates" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Birthday *</label>
                            <input type="date" name="birthday" value={profile.birthday} onChange={handleChange} className="w-full rounded-md bg-white border border-[#d4c4a8] text-[#5c3a1e] p-2.5 focus:ring-[#8b0a30] focus:border-[#8b0a30]" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Age as of May 1</label>
                            <div className="flex items-center gap-3">
                                <input type="text" value={age !== null ? `${age} years` : '—'} disabled className="flex-1 rounded-md bg-[#f0ebe0] border border-[#d4c4a8] text-[#5c3a1e] p-2.5 cursor-not-allowed font-bold" />
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${ageGroup === 'Sub-Junior' ? 'bg-green-100 text-green-800' : ageGroup === 'Junior' ? 'bg-blue-100 text-blue-800' : ageGroup === 'Senior' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}>
                                    {ageGroup}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Sex</label>
                            <select name="sex" value={profile.sex} onChange={handleChange} className="w-full rounded-md bg-white border border-[#d4c4a8] text-[#5c3a1e] p-2.5 focus:ring-[#8b0a30] focus:border-[#8b0a30]">
                                <option value="">Select...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Mobile No</label>
                            <input type="tel" name="mobile" value={profile.mobile} onChange={handleChange} className="w-full rounded-md bg-white border border-[#d4c4a8] text-[#5c3a1e] p-2.5 focus:ring-[#8b0a30] focus:border-[#8b0a30]" placeholder="(555) 123-4567" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Address</label>
                        <input type="text" name="address" value={profile.address} onChange={handleChange} className="w-full rounded-md bg-white border border-[#d4c4a8] text-[#5c3a1e] p-2.5 focus:ring-[#8b0a30] focus:border-[#8b0a30]" placeholder="Street address" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-[#5c3a1e] mb-1">City</label>
                            <input type="text" name="city" value={profile.city} onChange={handleChange} className="w-full rounded-md bg-white border border-[#d4c4a8] text-[#5c3a1e] p-2.5 focus:ring-[#8b0a30] focus:border-[#8b0a30]" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#5c3a1e] mb-1">State</label>
                            <input type="text" name="state" value={profile.state} onChange={handleChange} className="w-full rounded-md bg-white border border-[#d4c4a8] text-[#5c3a1e] p-2.5 focus:ring-[#8b0a30] focus:border-[#8b0a30]" maxLength={2} placeholder="WA" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Zip</label>
                            <input type="text" name="zip" value={profile.zip} onChange={handleChange} className="w-full rounded-md bg-white border border-[#d4c4a8] text-[#5c3a1e] p-2.5 focus:ring-[#8b0a30] focus:border-[#8b0a30]" />
                        </div>
                    </div>

                    {message && (
                        <div className={`p-3 rounded-md text-sm font-medium ${message.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {message}
                        </div>
                    )}

                    <button onClick={handleSave} disabled={saving} className="w-full flex items-center justify-center gap-2 bg-[#8b0a30] text-white font-bold py-3 px-6 rounded-md hover:bg-[#6a0822] transition-colors disabled:opacity-50">
                        {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
                        {saving ? 'Saving...' : 'Save Profile'}
                    </button>
                </div>
            </div>
        </div>
    );
}
