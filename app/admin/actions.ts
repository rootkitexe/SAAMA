'use server';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

// Instantiate admin client to securely bypass RLS on server
const adminSupabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function addUpcomingEvent(formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const date = formData.get('date') as string;
        const venue = formData.get('venue') as string;
        const imageFile = formData.get('image') as File | null;

        if (!title || !date || !venue || !imageFile) {
            return { error: 'All fields including the image are required.' };
        }

        // Handle Image Storage locally to public/events
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const filename = Date.now() + '_' + imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uploadDir = path.join(process.cwd(), 'public', 'events');
        
        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filepath = path.join(uploadDir, filename);
        fs.writeFileSync(filepath, buffer);

        // Public path for the database and frontend
        const publicImagePath = `/events/${filename}`;

        // Insert into database
        const { data, error } = await adminSupabase
            .from('upcoming_events')
            .insert([{
                title,
                date,
                venue,
                image: publicImagePath
            }]);

        if (error) {
            console.error('Supabase Insert Error:', error);
            return { error: 'Failed to insert event into database.' };
        }

        // Force homepage and admin page to refresh to show new event
        revalidatePath('/');
        revalidatePath('/admin');

        return { success: true };
    } catch (e: any) {
        console.error('Event Upload Exception:', e);
        return { error: e.message || 'An unexpected error occurred during upload.' };
    }
}

export async function deleteUpcomingEvent(id: number) {
    try {
        const { error } = await adminSupabase
            .from('upcoming_events')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Supabase Delete Error:', error);
            return { error: 'Failed to delete event from database.' };
        }

        revalidatePath('/');
        revalidatePath('/admin');
        
        return { success: true };
    } catch (e: any) {
        console.error('Delete Event Exception:', e);
        return { error: e.message || 'An unexpected error occurred.' };
    }
}

export async function addBlogPost(formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const author = formData.get('author') as string;
        const readTime = formData.get('readTime') as string;
        const content = formData.get('content') as string;
        const imageFile = formData.get('image') as File | null;

        if (!title || !author || !readTime || !content || !imageFile) {
            return { error: 'All fields including the image are required.' };
        }

        // Handle Image Storage locally to public/blog
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const filename = Date.now() + '_' + imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uploadDir = path.join(process.cwd(), 'public', 'blog');
        
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filepath = path.join(uploadDir, filename);
        fs.writeFileSync(filepath, buffer);

        // Public path for the database and frontend
        const publicImagePath = `/blog/${filename}`;

        // Insert into database
        const { data, error } = await adminSupabase
            .from('blog_posts')
            .insert([{
                title,
                author,
                read_time: readTime,
                content,
                image: publicImagePath
            }]);

        if (error) {
            console.error('Supabase Insert Error:', error);
            return { error: 'Failed to insert blog post into database.' };
        }

        revalidatePath('/blog');
        revalidatePath('/admin');

        return { success: true };
    } catch (e: any) {
        console.error('Blog Upload Exception:', e);
        return { error: e.message || 'An unexpected error occurred during upload.' };
    }
}

export async function deleteBlogPost(id: number) {
    try {
        const { error } = await adminSupabase
            .from('blog_posts')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Supabase Delete Error:', error);
            return { error: 'Failed to delete blog post from database.' };
        }

        revalidatePath('/blog');
        revalidatePath('/admin');
        
        return { success: true };
    } catch (e: any) {
        console.error('Delete Blog Exception:', e);
        return { error: e.message || 'An unexpected error occurred.' };
    }
}
