'use client';

import React, { useState, useEffect } from 'react';

interface Event {
    id: number;
    title: string;
    date: string;
    venue: string;
    image: string;
}

export default function UpcomingEventsGrid({ events }: { events: Event[] }) {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedEvent) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedEvent]);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {events.map((event, idx) => (
                    <div 
                        key={idx} 
                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#d4c4a8] hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
                        onClick={() => setSelectedEvent(event)}
                    >
                        <div className="h-56 overflow-hidden relative border-b border-[#d4c4a8]/50">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="bg-black/60 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        Click to view full details
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="p-7 flex flex-col flex-grow">
                            <h3 className="font-serif font-bold text-xl text-[#3d230d] mb-4 leading-snug line-clamp-3" title={event.title}>
                                {event.title}
                            </h3>
                            <div className="mt-auto space-y-3">
                                <p className="text-[14px] text-[#7a5c3a] font-medium flex items-start gap-2.5">
                                    <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    {event.date}
                                </p>
                                <p className="text-[14px] text-[#7a5c3a] flex items-start gap-2.5">
                                    <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    {event.venue}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Detail Modal */}
            {selectedEvent && (
                <div 
                    className="fixed inset-0 z-[10000] bg-black/80 flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSelectedEvent(null)}
                >
                    <button 
                        onClick={() => setSelectedEvent(null)}
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-black/40 rounded-full p-2 z-[10001]"
                        aria-label="Close"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    
                    <div 
                        className="relative max-w-5xl w-full flex flex-col md:flex-row bg-[#faf5eb] rounded-2xl overflow-hidden shadow-2xl max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the modal card
                    >
                        {/* Image Section */}
                        <div className="w-full md:w-3/5 bg-black flex items-center justify-center">
                            <img 
                                src={selectedEvent.image} 
                                alt={selectedEvent.title} 
                                className="w-full max-h-[45vh] md:max-h-[90vh] object-contain" 
                            />
                        </div>
                        
                        {/* Info Section */}
                        <div className="w-full md:w-2/5 p-8 flex flex-col justify-center border-l border-[#d4c4a8]/30 overflow-y-auto">
                            <h3 className="font-serif font-bold text-3xl text-[#3d230d] mb-6 leading-snug">
                                {selectedEvent.title}
                            </h3>
                            <div className="space-y-5">
                                <div className="bg-white/50 p-4 rounded-xl border border-[#d4c4a8]/50">
                                    <p className="text-lg text-[#5c3a1e] font-semibold flex items-center gap-3 mb-1">
                                        <svg className="w-6 h-6 shrink-0 text-[#a07d3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        Date & Time
                                    </p>
                                    <p className="text-[#7a5c3a] ml-9">{selectedEvent.date}</p>
                                </div>
                                <div className="bg-white/50 p-4 rounded-xl border border-[#d4c4a8]/50">
                                    <p className="text-lg text-[#5c3a1e] font-semibold flex items-center gap-3 mb-1">
                                        <svg className="w-6 h-6 shrink-0 text-[#a07d3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        Venue
                                    </p>
                                    <p className="text-[#7a5c3a] ml-9">{selectedEvent.venue}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
