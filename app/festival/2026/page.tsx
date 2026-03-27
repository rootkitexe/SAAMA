'use client';

import React, { useState } from 'react';
import { Calendar, Ticket, MapPin } from 'lucide-react';

export default function Festival2026Page() {
    const [activeTab, setActiveTab] = useState<'schedule' | 'tickets' | 'venue'>('schedule');

    return (
        <div className="min-h-screen bg-[#faf5eb] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#3d230d] mb-4">Aaroha Carnatic Music Festival 2026</h1>
                    <p className="text-lg text-[#7a5c3a] font-medium max-w-2xl mx-auto">
                        Join us for an immersive two-day celebration of Carnatic music featuring world-renowned artists, interactive workshops, and inspiring performances.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    
                    {/* Left Sidebar Navigation */}
                    <div className="w-full md:w-64 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-[#d4c4a8] overflow-hidden sticky top-8">
                        <nav className="flex flex-col">
                            <button 
                                onClick={() => setActiveTab('schedule')}
                                className={`flex items-center gap-3 px-6 py-4 text-left font-bold transition-colors border-b border-[#d4c4a8]/50 ${activeTab === 'schedule' ? 'bg-[#3d230d] text-white' : 'text-[#5c3a1e] hover:bg-[#faf5eb]'}`}
                            >
                                <Calendar className="w-5 h-5" /> Schedule
                            </button>
                            <button 
                                onClick={() => setActiveTab('tickets')}
                                className={`flex items-center gap-3 px-6 py-4 text-left font-bold transition-colors border-b border-[#d4c4a8]/50 ${activeTab === 'tickets' ? 'bg-[#3d230d] text-white' : 'text-[#5c3a1e] hover:bg-[#faf5eb]'}`}
                            >
                                <Ticket className="w-5 h-5" /> Tickets
                            </button>
                            <button 
                                onClick={() => setActiveTab('venue')}
                                className={`flex items-center gap-3 px-6 py-4 text-left font-bold transition-colors ${activeTab === 'venue' ? 'bg-[#3d230d] text-white' : 'text-[#5c3a1e] hover:bg-[#faf5eb]'}`}
                            >
                                <MapPin className="w-5 h-5" /> Venue & Parking
                            </button>
                        </nav>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-grow bg-white rounded-2xl shadow-sm border border-[#d4c4a8] p-6 sm:p-10 min-h-[500px]">
                        
                        {activeTab === 'schedule' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h2 className="text-3xl font-serif font-bold text-[#3d230d] mb-6 border-b border-[#d4c4a8] pb-4">Festival Schedule</h2>
                                
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#5c3a1e] mb-4 bg-[#faf5eb] inline-block px-4 py-1 rounded-md">Day 1: Saturday, June 20, 2026</h3>
                                        <ul className="space-y-4 ml-2">
                                            <li className="flex gap-4">
                                                <span className="text-[#3d230d] font-bold w-24 shrink-0">09:00 AM</span>
                                                <span className="text-[#7a5c3a]">Inauguration & Inaugural Concert</span>
                                            </li>
                                            <li className="flex gap-4">
                                                <span className="text-[#3d230d] font-bold w-24 shrink-0">11:00 AM</span>
                                                <span className="text-[#7a5c3a]">Workshop and Interactive Session</span>
                                            </li>
                                            <li className="flex gap-4">
                                                <span className="text-[#3d230d] font-bold w-24 shrink-0">02:00 PM</span>
                                                <span className="text-[#7a5c3a]">Afternoon Performances</span>
                                            </li>
                                            <li className="flex gap-4">
                                                <span className="text-[#3d230d] font-bold w-24 shrink-0">06:00 PM</span>
                                                <span className="text-[#7a5c3a]">Main Evening Concert</span>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-xl font-bold text-[#5c3a1e] mb-4 bg-[#faf5eb] inline-block px-4 py-1 rounded-md">Day 2: Sunday, June 21, 2026</h3>
                                        <ul className="space-y-4 ml-2">
                                            <li className="flex gap-4">
                                                <span className="text-[#3d230d] font-bold w-24 shrink-0">09:00 AM</span>
                                                <span className="text-[#7a5c3a]">Morning Lec-Dem</span>
                                            </li>
                                            <li className="flex gap-4">
                                                <span className="text-[#3d230d] font-bold w-24 shrink-0">11:00 AM</span>
                                                <span className="text-[#7a5c3a]">Student Competitions Showcase</span>
                                            </li>
                                            <li className="flex gap-4">
                                                <span className="text-[#3d230d] font-bold w-24 shrink-0">04:00 PM</span>
                                                <span className="text-[#7a5c3a]">Grand Finale Concert</span>
                                            </li>
                                            <li className="flex gap-4">
                                                <span className="text-[#3d230d] font-bold w-24 shrink-0">07:30 PM</span>
                                                <span className="text-[#7a5c3a]">Awards Ceremony & Closing</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'tickets' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h2 className="text-3xl font-serif font-bold text-[#3d230d] mb-6 border-b border-[#d4c4a8] pb-4">Tickets</h2>
                                <div className="py-12 text-center bg-[#faf5eb] rounded-xl border border-[#d4c4a8] border-dashed">
                                    <Ticket className="w-12 h-12 text-[#d4c4a8] mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-[#5c3a1e] mb-2">Ticket Details Coming Soon!</h3>
                                    <p className="text-[#7a5c3a] max-w-md mx-auto">
                                        We are finalizing the ticketing tiers and packages for the 2026 festival. Please check back shortly for full details and purchasing links.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'venue' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h2 className="text-3xl font-serif font-bold text-[#3d230d] mb-6 border-b border-[#d4c4a8] pb-4">Venue & Parking</h2>
                                <div className="py-12 text-center bg-[#faf5eb] rounded-xl border border-[#d4c4a8] border-dashed">
                                    <MapPin className="w-12 h-12 text-[#d4c4a8] mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-[#5c3a1e] mb-2">Venue Details Coming Soon!</h3>
                                    <p className="text-[#7a5c3a] max-w-md mx-auto">
                                        We will be releasing comprehensive venue maps, parking instructions, and navigation guides soon to ensure a smooth arrival experience.
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
