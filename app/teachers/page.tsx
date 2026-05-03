'use client';

import { useState } from 'react';
import { Search, Mail, Phone, Globe, Facebook, Instagram, X, Loader2, CheckCircle } from 'lucide-react';
import { submitDirectoryRequest } from './actions';

// Hardcoded seed data — admin-added entries from Supabase will appear alongside these
const directoryData = [
  {
    id: 1,
    name: "Sadhana Academy for Musical Arts",
    email: "saama.seattle@gmail.com",
    phone: "(425) 591-2391",
    services: ["Concerts", "Workshops", "Lec-Dems"],
    location: "Bellevue, WA",
    links: { website: "https://saamaseattle.org", facebook: "https://www.facebook.com/sadhanaseattle", instagram: "https://www.instagram.com/sadhanaseattle/" }
  }
];

export default function TeachersDirectoryPage() {
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formError, setFormError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError('');

        const formData = new FormData(e.currentTarget);
        const result = await submitDirectoryRequest(formData);

        if (result.success) {
            setIsSuccess(true);
        } else {
            setFormError(result.error || 'Something went wrong. Please try again.');
        }
        setIsSubmitting(false);
    };

    const closeModal = () => {
        setShowModal(false);
        setIsSuccess(false);
        setFormError('');
    };

    return (
        <div className="min-h-screen bg-[#faf5eb] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#3d230d] mb-4">
                        Seattle Classical Music and Dance <span className="text-[#5c3a1e]">School Directory</span>
                    </h1>
                    <p className="text-[#7a5c3a] font-medium text-lg max-w-2xl mx-auto">
                        Engage with premier schools and centers dedicated to Indian classical arts in the Seattle area.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-[#a07d3c]" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, service, or location..."
                            className="block w-full pl-11 pr-4 py-3 border border-[#d4c4a8] rounded-full bg-white text-[#3d230d] shadow-sm focus:ring-2 focus:ring-[#a07d3c] focus:border-transparent outline-none transition-all placeholder:text-[#a07d3c]/60"
                        />
                    </div>
                    <p className="text-center text-sm text-[#7a5c3a] mt-3">{directoryData.length} schools found</p>
                </div>

                {/* Directory Table — Desktop */}
                <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-[#d4c4a8] overflow-hidden mb-20">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#faf5eb] border-b border-[#d4c4a8] text-[#5c3a1e] font-bold text-sm">
                                    <th className="px-6 py-4">Organization</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Services</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4 text-center">Links</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#d4c4a8]/50">
                                {directoryData.map((school) => (
                                    <tr key={school.id} className="hover:bg-[#faf5eb]/30 transition-colors">
                                        <td className="px-6 py-5 font-semibold text-[#3d230d]">{school.name}</td>
                                        <td className="px-6 py-5 text-sm text-[#5c3a1e] space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-[#a07d3c]" />
                                                <a href={`mailto:${school.email}`} className="hover:underline">{school.email}</a>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-[#a07d3c]" />
                                                <a href={`tel:${school.phone.replace(/[^0-9]/g, '')}`} className="hover:underline">{school.phone}</a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-wrap gap-2">
                                                {school.services.map((service, idx) => (
                                                    <span key={idx} className="bg-[#5c3a1e] text-[#faf5eb] text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">{service}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-[#5c3a1e]">{school.location}</td>
                                        <td className="px-6 py-5 text-[#a07d3c]">
                                            <div className="flex items-center justify-center gap-3">
                                                {school.links.website && (
                                                    <a href={school.links.website} target="_blank" rel="noreferrer" className="hover:text-[#3d230d] transition-colors"><Globe className="w-5 h-5" /></a>
                                                )}
                                                {school.links.facebook && (
                                                    <a href={school.links.facebook} target="_blank" rel="noreferrer" className="hover:text-[#3d230d] transition-colors"><Facebook className="w-5 h-5" /></a>
                                                )}
                                                {school.links.instagram && (
                                                    <a href={school.links.instagram} target="_blank" rel="noreferrer" className="hover:text-[#3d230d] transition-colors"><Instagram className="w-5 h-5" /></a>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Directory Cards — Mobile */}
                <div className="md:hidden space-y-4 mb-16">
                    {directoryData.map((school) => (
                        <div key={school.id} className="bg-white rounded-xl shadow-sm border border-[#d4c4a8] p-5 space-y-3">
                            <h3 className="font-bold text-[#3d230d] text-lg">{school.name}</h3>
                            <div className="text-sm text-[#5c3a1e] space-y-1.5">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-[#a07d3c] shrink-0" />
                                    <a href={`mailto:${school.email}`} className="hover:underline break-all">{school.email}</a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-[#a07d3c] shrink-0" />
                                    <a href={`tel:${school.phone.replace(/[^0-9]/g, '')}`} className="hover:underline">{school.phone}</a>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {school.services.map((service, idx) => (
                                    <span key={idx} className="bg-[#5c3a1e] text-[#faf5eb] text-xs font-medium px-2.5 py-1 rounded-full">{service}</span>
                                ))}
                            </div>
                            <p className="text-sm text-[#7a5c3a]">📍 {school.location}</p>
                            <div className="flex items-center gap-3 text-[#a07d3c]">
                                {school.links.website && (
                                    <a href={school.links.website} target="_blank" rel="noreferrer" className="hover:text-[#3d230d] transition-colors"><Globe className="w-5 h-5" /></a>
                                )}
                                {school.links.facebook && (
                                    <a href={school.links.facebook} target="_blank" rel="noreferrer" className="hover:text-[#3d230d] transition-colors"><Facebook className="w-5 h-5" /></a>
                                )}
                                {school.links.instagram && (
                                    <a href={school.links.instagram} target="_blank" rel="noreferrer" className="hover:text-[#3d230d] transition-colors"><Instagram className="w-5 h-5" /></a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action Footer */}
                <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-[#d4c4a8] max-w-3xl mx-auto">
                    <h3 className="text-2xl font-serif font-bold text-[#3d230d] mb-3">
                        Teachers and Schools – Get Listed!
                    </h3>
                    <p className="text-[#7a5c3a] mb-8">
                        Be part of our Seattle music directory and connect with students seeking Indian classical arts education.
                    </p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-block bg-[#3d230d] text-[#faf5eb] hover:bg-[#5c3a1e] font-bold px-8 py-3 rounded-full transition-all shadow-md cursor-pointer"
                    >
                        Join the Directory
                    </button>
                </div>

            </div>

            {/* Join Directory Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4" onClick={closeModal}>
                    <div 
                        className="bg-[#faf5eb] rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#d4c4a8]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[#d4c4a8]">
                            <h3 className="text-xl font-serif font-bold text-[#3d230d]">Join the Directory</h3>
                            <button onClick={closeModal} className="p-1 hover:bg-[#d4c4a8]/30 rounded-full transition-colors">
                                <X className="w-5 h-5 text-[#5c3a1e]" />
                            </button>
                        </div>

                        {isSuccess ? (
                            <div className="p-8 text-center">
                                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                                <h4 className="text-xl font-bold text-[#3d230d] mb-2">Request Submitted!</h4>
                                <p className="text-[#7a5c3a]">Thank you for your interest. Our team will review your submission and get back to you shortly.</p>
                                <button onClick={closeModal} className="mt-6 bg-[#3d230d] text-white font-bold px-6 py-2 rounded-full hover:bg-[#5c3a1e] transition-colors">
                                    Close
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                <p className="text-sm text-[#7a5c3a] mb-2">Fill in your details below and we'll review your listing request.</p>
                                
                                {/* Organization Name */}
                                <div>
                                    <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Organization Name *</label>
                                    <input type="text" name="orgName" required placeholder="e.g. Seattle Violin Academy"
                                        className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-2 focus:ring-[#3d230d] focus:border-[#3d230d] outline-none" />
                                </div>

                                {/* Contact */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Email *</label>
                                        <input type="email" name="email" required placeholder="contact@example.com"
                                            className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-2 focus:ring-[#3d230d] focus:border-[#3d230d] outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Phone *</label>
                                        <input type="tel" name="phone" required placeholder="(425) 555-0100"
                                            className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-2 focus:ring-[#3d230d] focus:border-[#3d230d] outline-none" />
                                    </div>
                                </div>

                                {/* Services */}
                                <div>
                                    <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Services Offered *</label>
                                    <input type="text" name="services" required placeholder="e.g. Vocal Carnatic, Violin Lessons, Workshops"
                                        className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-2 focus:ring-[#3d230d] focus:border-[#3d230d] outline-none" />
                                    <p className="text-xs text-[#7a5c3a] mt-1">Separate multiple services with commas</p>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-bold text-[#5c3a1e] mb-1">Location *</label>
                                    <input type="text" name="location" required placeholder="e.g. Redmond, WA"
                                        className="w-full rounded-lg p-2.5 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] font-medium border border-[#d4c4a8] focus:ring-2 focus:ring-[#3d230d] focus:border-[#3d230d] outline-none" />
                                </div>

                                {/* Links */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-bold text-[#5c3a1e]">Links (optional)</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div>
                                            <label className="block text-xs text-[#7a5c3a] mb-1">Website</label>
                                            <input type="url" name="website" placeholder="https://..."
                                                className="w-full rounded-lg p-2 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] text-sm border border-[#d4c4a8] focus:ring-2 focus:ring-[#3d230d] focus:border-[#3d230d] outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-[#7a5c3a] mb-1">Facebook</label>
                                            <input type="url" name="facebook" placeholder="https://facebook.com/..."
                                                className="w-full rounded-lg p-2 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] text-sm border border-[#d4c4a8] focus:ring-2 focus:ring-[#3d230d] focus:border-[#3d230d] outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-[#7a5c3a] mb-1">Instagram</label>
                                            <input type="url" name="instagram" placeholder="https://instagram.com/..."
                                                className="w-full rounded-lg p-2 bg-white text-[#3d230d] placeholder:text-[#d4c4a8] text-sm border border-[#d4c4a8] focus:ring-2 focus:ring-[#3d230d] focus:border-[#3d230d] outline-none" />
                                        </div>
                                    </div>
                                </div>

                                {formError && (
                                    <p className="text-red-700 bg-red-100 p-2 rounded text-sm font-bold border border-red-300">{formError}</p>
                                )}

                                <div className="flex justify-end gap-3 pt-2">
                                    <button type="button" onClick={closeModal}
                                        className="px-5 py-2 border border-[#d4c4a8] rounded-lg text-[#5c3a1e] font-bold hover:bg-white transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={isSubmitting}
                                        className="bg-[#3d230d] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#5c3a1e] transition-colors disabled:opacity-50 flex items-center gap-2">
                                        {isSubmitting ? <><Loader2 className="animate-spin h-4 w-4" /> Submitting...</> : 'Submit Request'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
