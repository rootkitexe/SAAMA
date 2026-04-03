'use client';

import { Mail, Facebook, Instagram, Send, MapPin } from 'lucide-react';
import { FormEvent, useState } from 'react';

import { submitContactMessage } from './actions';

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formData = new FormData(e.currentTarget);
        try {
            const result = await submitContactMessage(formData);
            if (result.success) {
                setIsSent(true);
            } else {
                alert('We encountered an error while sending your message. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('We encountered an error while sending your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#faf5eb] min-h-screen py-16 px-4 sm:px-6 lg:px-12">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#3d230d] mb-4">Connect With Us</h1>
                    <p className="text-lg text-[#7a5c3a] max-w-2xl mx-auto">
                        Whether you have a question, want to volunteer, or are interested in sponsorship opportunities, we'd love to hear from you.
                    </p>
                </div>

                <div className="grid md:grid-cols-5 gap-12">
                    
                    {/* Left Column: Contact Info */}
                    <div className="md:col-span-2 space-y-10">
                        {/* Info Block */}
                        <div className="bg-white border border-[#d4c4a8]/50 rounded-2xl p-8 shadow-[0_4px_20px_-4px_rgba(61,35,13,0.05)]">
                            <h3 className="text-xl font-bold text-[#5c3a1e] mb-6 border-b border-[#d4c4a8]/30 pb-4">Get in Touch</h3>
                            
                            <ul className="space-y-6 text-[#7a5c3a]">
                                <li className="flex gap-4">
                                    <div className="mt-1 h-10 w-10 shrink-0 bg-[#faf5eb] rounded-full flex items-center justify-center text-[#5c3a1e]">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#3d230d] text-sm uppercase tracking-wide mb-1">Email</p>
                                        <a href="mailto:saama.seattle@gmail.com" className="hover:text-[#3d230d] transition-colors font-medium break-all">saama.seattle@gmail.com</a>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="mt-1 h-10 w-10 shrink-0 bg-[#faf5eb] rounded-full flex items-center justify-center text-[#5c3a1e]">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#3d230d] text-sm uppercase tracking-wide mb-1">Location</p>
                                        <p>Greater Seattle Area, WA</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Additional Information */}
                        <div className="space-y-6 text-[#7a5c3a] px-2 text-sm leading-relaxed">
                            <p>
                                <strong className="text-[#5c3a1e]">Volunteering & Feedback:</strong> We welcome individuals who are interested in volunteering at the festival or who would like to share feedback, suggestions, or inquiries related to our programs.
                            </p>
                            <p>
                                <strong className="text-[#5c3a1e]">Sponsorship:</strong> Local businesses and sponsors who wish to promote their services through our festival platforms are encouraged to reach out.
                            </p>
                        </div>
                        
                        {/* Social Links */}
                        <div className="px-2">
                            <h4 className="font-bold text-[#3d230d] mb-4 text-sm uppercase tracking-wide">Follow Our Journey</h4>
                            <div className="flex items-center gap-4">
                                <a 
                                    href="https://www.facebook.com/samaaseattle" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full bg-white border border-[#d4c4a8] flex items-center justify-center text-[#5c3a1e] hover:bg-[#3d230d] hover:text-white transition-all shadow-sm"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a 
                                    href="https://www.instagram.com/saama.seattle/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full bg-white border border-[#d4c4a8] flex items-center justify-center text-[#5c3a1e] hover:bg-[#3d230d] hover:text-white transition-all shadow-sm"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="md:col-span-3">
                        <div className="bg-white border border-[#d4c4a8] rounded-2xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full">
                            <h2 className="text-2xl font-serif font-bold text-[#3d230d] mb-8">Send a Message</h2>
                            
                            {isSent ? (
                                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
                                    <div className="w-16 h-16 bg-[#faf5eb] border border-[#d4c4a8] text-[#5c3a1e] rounded-full flex items-center justify-center">
                                        <Send className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-[#3d230d]">Message Sent!</h3>
                                    <p className="text-[#7a5c3a] max-w-sm">
                                        Thank you for reaching out to SaaMa. We've received your message and our team will get back to you shortly.
                                    </p>
                                    <button 
                                        onClick={() => setIsSent(false)}
                                        className="mt-4 text-[#5c3a1e] font-bold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="firstName" className="text-sm font-bold text-[#5c3a1e]">First Name *</label>
                                            <input 
                                                type="text" 
                                                id="firstName" 
                                                name="firstName"
                                                className="w-full bg-[#faf5eb] border border-[#d4c4a8] rounded-lg px-4 py-3 text-[#3d230d] focus:outline-none focus:ring-2 focus:ring-[#c8a03e]/50 focus:border-[#c8a03e] transition-all"
                                                placeholder="Jane"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="lastName" className="text-sm font-bold text-[#5c3a1e]">Last Name *</label>
                                            <input 
                                                type="text" 
                                                id="lastName" 
                                                name="lastName"
                                                className="w-full bg-[#faf5eb] border border-[#d4c4a8] rounded-lg px-4 py-3 text-[#3d230d] focus:outline-none focus:ring-2 focus:ring-[#c8a03e]/50 focus:border-[#c8a03e] transition-all"
                                                placeholder="Doe"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-bold text-[#5c3a1e]">Email Address *</label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            name="email"
                                            className="w-full bg-[#faf5eb] border border-[#d4c4a8] rounded-lg px-4 py-3 text-[#3d230d] focus:outline-none focus:ring-2 focus:ring-[#c8a03e]/50 focus:border-[#c8a03e] transition-all"
                                            placeholder="jane@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-bold text-[#5c3a1e]">Subject *</label>
                                        <input 
                                            type="text" 
                                            id="subject" 
                                            name="subject"
                                            className="w-full bg-[#faf5eb] border border-[#d4c4a8] rounded-lg px-4 py-3 text-[#3d230d] focus:outline-none focus:ring-2 focus:ring-[#c8a03e]/50 focus:border-[#c8a03e] transition-all"
                                            placeholder="How can we help you?"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-bold text-[#5c3a1e]">Message *</label>
                                        <textarea 
                                            id="message" 
                                            name="message"
                                            rows={5}
                                            className="w-full bg-[#faf5eb] border border-[#d4c4a8] rounded-lg px-4 py-3 text-[#3d230d] focus:outline-none focus:ring-2 focus:ring-[#c8a03e]/50 focus:border-[#c8a03e] transition-all resize-none"
                                            placeholder="Write your message here..."
                                            required
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#3d230d] hover:bg-[#2a1809] text-white px-8 py-4 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-sm hover:shadow-md"
                                    >
                                        <Send className="w-4 h-4" />
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

