'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryPage() {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    // List of 21 images
    const images = [
        { src: '/gallery/saama-1.png', alt: 'SaaMa Gallery 1' },
        { src: '/gallery/saama-2.jpg', alt: 'SaaMa Gallery 2' },
        { src: '/gallery/saama-3.jpg', alt: 'SaaMa Gallery 3' },
        { src: '/gallery/saama-4.jpg', alt: 'SaaMa Gallery 4' },
        { src: '/gallery/saama-5.jpg', alt: 'SaaMa Gallery 5' },
        { src: '/gallery/saama-6.jpg', alt: 'SaaMa Gallery 6' },
        { src: '/gallery/saama-7.jpg', alt: 'SaaMa Gallery 7' },
        { src: '/gallery/saama-8.jpg', alt: 'SaaMa Gallery 8' },
        { src: '/gallery/saama-9.jpg', alt: 'SaaMa Gallery 9' },
        { src: '/gallery/saama-10.jpg', alt: 'SaaMa Gallery 10' },
        { src: '/gallery/saama-11.jpg', alt: 'SaaMa Gallery 11' },
        { src: '/gallery/saama-12.jpg', alt: 'SaaMa Gallery 12' },
        { src: '/gallery/saama-13.jpg', alt: 'SaaMa Gallery 13' },
        { src: '/gallery/saama-14.jpg', alt: 'SaaMa Gallery 14' },
        { src: '/gallery/saama-15.jpg', alt: 'SaaMa Gallery 15' },
        { src: '/gallery/saama-16.jpg', alt: 'SaaMa Gallery 16' },
        { src: '/gallery/saama-17.jpg', alt: 'SaaMa Gallery 17' },
        { src: '/gallery/saama-18.jpg', alt: 'SaaMa Gallery 18' },
        { src: '/gallery/saama-19.jpg', alt: 'SaaMa Gallery 19' },
        { src: '/gallery/saama-20.png', alt: 'SaaMa Gallery 20' },
        { src: '/gallery/saama-21.jpg', alt: 'SaaMa Gallery 21' },
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
