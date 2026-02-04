'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Music, Mic2, MapPin, CheckCircle, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { createRegistration } from './actions';

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        // Profile
        fullName: '',
        dob: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        // Competition
        category: 'Music', // Music or Dance
        item: 'Carnatic Vocal',
        // Details
        guruName: '',
        songs: [{ raga: '', tala: '', composer: '', song: '' }] // Default 1 song
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSongChange = (index: number, field: string, value: string) => {
        const newSongs: any = [...formData.songs];
        newSongs[index][field] = value;
        setFormData(prev => ({ ...prev, songs: newSongs }));
    };

    const addSong = () => {
        setFormData(prev => ({
            ...prev,
            songs: [...prev.songs, { raga: '', tala: '', composer: '', song: '' }]
        }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await createRegistration(formData);
        } catch (error) {
            if ((error as Error).message.includes('NEXT_REDIRECT')) {
                return;
            }
            alert("Registration failed: " + (error as Error).message);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-white/10 -z-10" />
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${step >= s ? 'border-primary bg-primary text-white' : 'border-white/20 bg-black text-gray-500'}`}>
                                {step > s ? <CheckCircle className="h-5 w-5" /> : s}
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-between text-xs font-medium text-gray-400 px-1">
                        <span>Profile</span>
                        <span>Selection</span>
                        <span>Details</span>
                        <span>Review</span>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
                            e.preventDefault();
                        }
                    }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl"
                >

                    {/* Step 1: Participant Profile */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <User className="h-6 w-6 text-primary" /> Participant Profile
                            </h2>
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full rounded-md bg-white/10 border-white/10 text-white focus:ring-primary focus:border-primary p-2.5" placeholder="As it should appear on certificates" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Date of Birth</label>
                                    <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full rounded-md bg-white/10 border-white/10 text-white focus:ring-primary focus:border-primary p-2.5" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full rounded-md bg-white/10 border-white/10 text-white focus:ring-primary focus:border-primary p-2.5" placeholder="(555) 123-4567" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Mailing Address</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full rounded-md bg-white/10 border-white/10 text-white focus:ring-primary focus:border-primary p-2.5" placeholder="1234 Music Lane" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">City</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full rounded-md bg-white/10 border-white/10 text-white focus:ring-primary focus:border-primary p-2.5" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">State</label>
                                        <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full rounded-md bg-white/10 border-white/10 text-white focus:ring-primary focus:border-primary p-2.5" maxLength={2} placeholder="WA" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Zip</label>
                                        <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} className="w-full rounded-md bg-white/10 border-white/10 text-white focus:ring-primary focus:border-primary p-2.5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Competition Selection */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Music className="h-6 w-6 text-primary" /> Competition Selection
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-3">Category</label>
                                    <div className="flex gap-4">
                                        {['Music', 'Dance'].map((cat) => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                                                className={`flex-1 py-3 px-4 rounded-xl border-2 font-bold transition-all ${formData.category === cat ? 'border-primary bg-primary/10 text-white' : 'border-white/10 bg-black text-gray-500 hover:border-gray-500'}`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Competition Item</label>
                                    <select name="item" value={formData.item} onChange={handleInputChange} className="w-full rounded-md bg-white/10 border-white/10 text-white focus:ring-primary focus:border-primary p-2.5">
                                        <option value="Carnatic Vocal">Carnatic Vocal</option>
                                        <option value="Violin Solo">Violin Solo</option>
                                        <option value="Mridangam">Mridangam</option>
                                        <option value="Veena">Veena</option>
                                        <option value="Flute">Flute</option>
                                    </select>
                                </div>

                                <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                                    <p className="text-blue-400 text-sm">
                                        <strong>Note:</strong> Your Age Group (Junior/Senior) will be automatically calculated based on your Date of Birth provided in the profile step.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Song & Guru Details */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Mic2 className="h-6 w-6 text-primary" /> Song Details
                            </h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Guru / Music School</label>
                                <input type="text" name="guruName" value={formData.guruName} onChange={handleInputChange} className="w-full rounded-md bg-white/10 border-white/10 text-white focus:ring-primary focus:border-primary p-2.5" placeholder="e.g. Smt. Teacher Name" />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium text-gray-400">Songs / Compositions</label>
                                    <button type="button" onClick={addSong} className="text-xs text-primary hover:text-white underline">+ Add Another Song</button>
                                </div>

                                {formData.songs.map((song, idx) => (
                                    <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
                                        <p className="text-xs font-bold text-gray-500 uppercase">Song {idx + 1}</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input type="text" placeholder="Raga" value={song.raga} onChange={(e) => handleSongChange(idx, 'raga', e.target.value)} className="bg-black/30 border-white/10 rounded px-2 py-1.5 text-sm text-white" />
                                            <input type="text" placeholder="Tala" value={song.tala} onChange={(e) => handleSongChange(idx, 'tala', e.target.value)} className="bg-black/30 border-white/10 rounded px-2 py-1.5 text-sm text-white" />
                                            <input type="text" placeholder="Composer" value={song.composer} onChange={(e) => handleSongChange(idx, 'composer', e.target.value)} className="bg-black/30 border-white/10 rounded px-2 py-1.5 text-sm text-white" />
                                            <input type="text" placeholder="Song Name (Start)" value={song.song} onChange={(e) => handleSongChange(idx, 'song', e.target.value)} className="bg-black/30 border-white/10 rounded px-2 py-1.5 text-sm text-white" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <CheckCircle className="h-6 w-6 text-primary" /> Review & Submit
                            </h2>

                            <div className="space-y-4 text-sm text-gray-300">
                                <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
                                    <div>
                                        <span className="block text-gray-500 text-xs">Participant</span>
                                        <span className="font-bold text-white">{formData.fullName}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 text-xs">DOB</span>
                                        <span className="font-bold text-white">{formData.dob}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
                                    <div>
                                        <span className="block text-gray-500 text-xs">Competition</span>
                                        <span className="font-bold text-white">{formData.item} ({formData.category})</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 text-xs">Guru</span>
                                        <span className="font-bold text-white">{formData.guruName}</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="block text-gray-500 text-xs mb-2">Songs</span>
                                    <ul className="space-y-1">
                                        {formData.songs.map((s, i) => (
                                            <li key={i} className="bg-white/5 px-2 py-1 rounded border border-white/5">
                                                {s.song} <span className="text-gray-500">in</span> {s.raga}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-yellow-900/20 border border-yellow-500/20 p-3 rounded text-yellow-500 text-xs">
                                    By submitting, you confirm that all details are accurate and you agree to the festival rules.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/10">
                        {step > 1 ? (
                            <button type="button" onClick={prevStep} className="flex items-center text-sm font-medium text-gray-400 hover:text-white">
                                <ChevronLeft className="h-4 w-4 mr-1" /> Back
                            </button>
                        ) : <div />} {/* Spacer */}

                        {step < 4 ? (
                            <button type="button" onClick={nextStep} className="flex items-center rounded-md bg-white px-6 py-2 text-sm font-bold text-black hover:bg-gray-200">
                                Next Step <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        ) : (
                            <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!isSubmitting) handleSubmit(e as any);
                                }}
                                className="flex items-center rounded-md bg-primary px-6 py-2 text-sm font-bold text-white hover:bg-red-700 shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                                    </>
                                ) : (
                                    "Submit Registration"
                                )}
                            </button>
                        )}
                    </div>

                </form>
            </div>
        </div>
    );
}
