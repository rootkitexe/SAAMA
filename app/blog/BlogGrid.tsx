'use client';

import React, { useState } from 'react';
import { BookOpen, Users, X } from 'lucide-react';

export default function BlogGrid({ posts }: { posts: any[] }) {
    const [selectedPost, setSelectedPost] = useState<any | null>(null);

    // Disable scrolling when modal is open
    React.useEffect(() => {
        if (selectedPost) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedPost]);

    if (posts.length === 0) {
        return (
            <div className="py-24 text-center bg-white rounded-2xl shadow-sm border border-[#d4c4a8] border-dashed flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-[#faf5eb] rounded-full flex items-center justify-center mb-6">
                    <BookOpen className="w-10 h-10 text-[#d4c4a8]" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#5c3a1e] mb-3">No Posts Yet</h3>
                <p className="text-[#7a5c3a] max-w-md mx-auto">
                    We're currently preparing our first series of articles showcasing artist interviews, musical concepts, and festival announcements. Check back soon!
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post) => (
                    <div 
                        key={post.id} 
                        onClick={() => setSelectedPost(post)}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#d4c4a8] hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
                    >
                        <div className="h-56 overflow-hidden relative border-b border-[#d4c4a8]/50">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-7 flex flex-col flex-grow">
                            <h3 className="font-serif font-bold text-xl text-[#3d230d] mb-4 leading-snug line-clamp-3">
                                {post.title}
                            </h3>
                            <div className="mt-auto space-y-3">
                                <p className="text-[14px] text-[#7a5c3a] font-medium flex items-center gap-2.5">
                                    <BookOpen className="w-5 h-5 shrink-0" /> {post.read_time}
                                </p>
                                <p className="text-[14px] text-[#7a5c3a] font-medium flex items-center gap-2.5">
                                    <Users className="w-5 h-5 shrink-0" /> {post.author}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Article Reading Modal */}
            {selectedPost && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 pb-20 sm:pb-6 overflow-y-auto">
                    <div className="bg-[#faf5eb] w-full max-w-4xl min-h-[60vh] max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
                        {/* Close Button sticky top */}
                        <div className="sticky top-0 right-0 w-full flex justify-end p-4 z-10">
                            <button 
                                onClick={() => setSelectedPost(null)}
                                className="bg-[#3d230d] text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                title="Close Article"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="overflow-y-auto w-full -mt-16 pb-12">
                            {/* Header Image */}
                            <div className="w-full h-64 sm:h-96 relative">
                                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#faf5eb] via-transparent to-black/30"></div>
                            </div>
                            
                            {/* Article Body */}
                            <div className="px-4 md:px-8 -mt-16 relative z-10">
                                <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-[#d4c4a8] mb-12">
                                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#3d230d] mb-6 leading-tight">
                                        {selectedPost.title}
                                    </h2>
                                    
                                    <div className="flex flex-wrap items-center gap-6 text-[#7a5c3a] font-medium mb-10 pb-6 border-b border-[#d4c4a8]/40">
                                        <p className="flex items-center gap-2"><Users className="w-5 h-5" /> By {selectedPost.author}</p>
                                        <p className="flex items-center gap-2"><BookOpen className="w-5 h-5" /> {selectedPost.read_time}</p>
                                        <p className="flex items-center gap-2 text-sm opacity-70">
                                            {new Date(selectedPost.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                    
                                    <div 
                                        className="text-lg text-[#5c3a1e] font-medium leading-[1.8] space-y-6 rich-text"
                                        dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
