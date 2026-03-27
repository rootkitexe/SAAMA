import React from 'react';
import { Image } from 'lucide-react';

export default function GalleryPage() {
    return (
        <div className="min-h-screen bg-[#faf5eb] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#3d230d] mb-4">Photo Gallery</h1>
                    <div className="h-1 w-24 bg-[#d4c4a8] mx-auto mb-6"></div>
                    <p className="text-lg text-[#7a5c3a] font-medium max-w-2xl mx-auto">
                        Capturing the essence of Sādhana, tradition, and musical excellence across our events, workshops, and concerts.
                    </p>
                </div>

                {/* Empty State / Coming Soon */}
                <div className="py-24 text-center bg-white rounded-2xl shadow-sm border border-[#d4c4a8] border-dashed flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-[#faf5eb] rounded-full flex items-center justify-center mb-6">
                        <Image className="w-10 h-10 text-[#d4c4a8]" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#5c3a1e] mb-3">Gallery Coming Soon</h3>
                    <p className="text-[#7a5c3a] max-w-md mx-auto">
                        We are currently curating a beautiful selection of photographs from our past festivals and events to share with you here.
                    </p>
                </div>
            </div>
        </div>
    );
}
