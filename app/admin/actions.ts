'use server';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

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

        // Upload to Supabase Storage
        const filename = `${Date.now()}_${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const { data: uploadData, error: uploadError } = await adminSupabase
            .storage
            .from('events')
            .upload(filename, imageFile, {
                contentType: imageFile.type,
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            console.error('Storage Upload Error:', uploadError);
            return { error: 'Failed to upload image to Supabase Storage.' };
        }

        // Get the Public URL
        const { data: { publicUrl } } = adminSupabase
            .storage
            .from('events')
            .getPublicUrl(filename);

        // Insert into database
        const { data, error } = await adminSupabase
            .from('upcoming_events')
            .insert([{
                title,
                date,
                venue,
                image: publicUrl
            }]);

        if (error) {
            console.error('Supabase Insert Error:', error);
            return { error: 'Failed to insert event into database.' };
        }

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

        // Upload to Supabase Storage
        const filename = `${Date.now()}_${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const { data: uploadData, error: uploadError } = await adminSupabase
            .storage
            .from('blog')
            .upload(filename, imageFile, {
                contentType: imageFile.type,
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            console.error('Storage Upload Error:', uploadError);
            return { error: 'Failed to upload blog image to Supabase Storage.' };
        }

        // Get the Public URL
        const { data: { publicUrl } } = adminSupabase
            .storage
            .from('blog')
            .getPublicUrl(filename);

        // Insert into database
        const { data, error } = await adminSupabase
            .from('blog_posts')
            .insert([{
                title,
                author,
                read_time: readTime,
                content,
                image: publicUrl
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

