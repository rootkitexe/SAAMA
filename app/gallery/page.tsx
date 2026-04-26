'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryPage() {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    // List of images
    const images: { src: string, alt: string }[] = [
        { src: "/gallery 1.jpeg", alt: "SaaMa festival gallery image 1" }
    ];

    const openLightbox = (index: number) => setSelectedImageIndex(index);
    const closeLightbox = () => setSelectedImageIndex(null);
    const nextImage = () => setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
    const prevImage = () => setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));

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

                {images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {images.map((image, index) => (
                            <div 
                                key={index} 
                                onClick={() => openLightbox(index)}
                                className="relative aspect-square overflow-hidden rounded-2xl shadow-sm border border-[#d4c4a8] cursor-pointer group hover:shadow-xl transition-all duration-300"
                            >
                                <img 
                                    src={image.src} 
                                    alt={image.alt} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-[#3d230d]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <ImageIcon className="text-white w-10 h-10" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white/50 border border-[#d4c4a8] rounded-2xl shadow-sm">
                        <ImageIcon className="w-16 h-16 text-[#c8a03e] mb-4 opacity-50" />
                        <h3 className="text-2xl font-serif font-bold text-[#5c3a1e] mb-2">Gallery Update in Progress</h3>
                        <p className="text-[#7a5c3a]">We are currently curating beautiful new moments to share with you. Check back soon!</p>
                    </div>
                )}

                {/* Lightbox Modal */}
                {selectedImageIndex !== null && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
                        <button 
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-[210]"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        
                        <button 
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 transition-colors z-[210] hidden md:block"
                        >
                            <ChevronLeft className="w-12 h-12" />
                        </button>

                        <button 
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 transition-colors z-[210] hidden md:block"
                        >
                            <ChevronRight className="w-12 h-12" />
                        </button>

                        <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center pointer-events-none">
                            <img 
                                src={images[selectedImageIndex].src} 
                                alt={images[selectedImageIndex].alt} 
                                className="max-w-full max-h-full object-contain pointer-events-auto shadow-2xl rounded-lg"
                            />
                        </div>

                        {/* Pagination Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-mono tracking-widest text-sm">
                            {selectedImageIndex + 1} / {images.length}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
