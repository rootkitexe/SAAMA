import React from 'react';
import { createClient } from '@/utils/supabase/server';
import BlogGrid from './BlogGrid';

export const revalidate = 0; // Ensures fresh blogs

export default async function BlogPage() {
    const supabase = await createClient();
    
    const { data: blogPosts, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('id', { ascending: false });

    if (error) {
        console.error("Error fetching blog posts:", error);
    }

    const posts = blogPosts || [];

    return (
        <div className="min-h-screen bg-[#faf5eb] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#3d230d] mb-4">Our Blog</h1>
                    <div className="h-1 w-24 bg-[#d4c4a8] mx-auto mb-6"></div>
                    <p className="text-lg text-[#7a5c3a] font-medium max-w-2xl mx-auto">
                        Stories, insights, and updates from the heart of the Carnatic music community.
                    </p>
                </div>

                <BlogGrid posts={posts} />
            </div>
        </div>
    );
}
