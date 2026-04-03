'use server';

import { createClient } from '@/utils/supabase/server';

export async function submitContactMessage(formData: FormData) {
    const supabase = await createClient();

    const data = {
        first_name: formData.get('firstName') as string,
        last_name: formData.get('lastName') as string,
        email: formData.get('email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
    };

    const { error } = await supabase
        .from('contact_messages')
        .insert([data]);

    if (error) {
        console.error('Error storing contact message:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}
