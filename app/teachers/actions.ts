'use server';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const adminSupabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function submitDirectoryRequest(formData: FormData) {
    try {
        const data = {
            first_name: formData.get('orgName') as string,
            last_name: 'Directory Request',
            email: formData.get('email') as string,
            subject: 'Join Teacher Directory',
            message: [
                `Organization: ${formData.get('orgName')}`,
                `Email: ${formData.get('email')}`,
                `Phone: ${formData.get('phone')}`,
                `Services: ${formData.get('services')}`,
                `Location: ${formData.get('location')}`,
                `Website: ${formData.get('website') || 'N/A'}`,
                `Facebook: ${formData.get('facebook') || 'N/A'}`,
                `Instagram: ${formData.get('instagram') || 'N/A'}`,
            ].join('\n'),
        };

        const { error } = await adminSupabase
            .from('contact_messages')
            .insert([data]);

        if (error) {
            console.error('Error storing directory request:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (e: any) {
        console.error('Directory Request Exception:', e);
        return { success: false, error: e.message || 'An unexpected error occurred.' };
    }
}

export async function getDirectoryEntries() {
    const { data, error } = await adminSupabase
        .from('teacher_directory')
        .select('*')
        .order('id', { ascending: true });
    
    if (error) {
        console.error('Error fetching directory:', error);
        return [];
    }
    return data || [];
}
