'use server';

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { sendNotificationEmail } from '@/utils/email';

const adminSupabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function submitDirectoryRequest(formData: FormData) {
    try {
        const orgName = formData.get('orgName') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const services = formData.get('services') as string;
        const location = formData.get('location') as string;
        const website = (formData.get('website') as string) || 'N/A';
        const facebook = (formData.get('facebook') as string) || 'N/A';
        const instagram = (formData.get('instagram') as string) || 'N/A';

        const data = {
            first_name: orgName,
            last_name: 'Directory Request',
            email,
            subject: 'Join Teacher Directory',
            message: [
                `Organization: ${orgName}`,
                `Email: ${email}`,
                `Phone: ${phone}`,
                `Services: ${services}`,
                `Location: ${location}`,
                `Website: ${website}`,
                `Facebook: ${facebook}`,
                `Instagram: ${instagram}`,
            ].join('\n'),
        };

        const { error } = await adminSupabase
            .from('contact_messages')
            .insert([data]);

        if (error) {
            console.error('Error storing directory request:', error);
            return { success: false, error: error.message };
        }

        // Send email notification
        await sendNotificationEmail({
            subject: `🏫 New Directory Join Request: ${orgName}`,
            replyTo: email,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #3d230d; color: #faf5eb; padding: 20px; border-radius: 8px 8px 0 0;">
                        <h2 style="margin: 0;">New Directory Join Request</h2>
                    </div>
                    <div style="background: #faf5eb; padding: 20px; border: 1px solid #d4c4a8; border-radius: 0 0 8px 8px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #3d230d;">Organization:</td><td style="padding: 8px 0; color: #5c3a1e;">${orgName}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #3d230d;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #a07d3c;">${email}</a></td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #3d230d;">Phone:</td><td style="padding: 8px 0; color: #5c3a1e;">${phone}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #3d230d;">Services:</td><td style="padding: 8px 0; color: #5c3a1e;">${services}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #3d230d;">Location:</td><td style="padding: 8px 0; color: #5c3a1e;">${location}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #3d230d;">Website:</td><td style="padding: 8px 0;"><a href="${website}" style="color: #a07d3c;">${website}</a></td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #3d230d;">Facebook:</td><td style="padding: 8px 0;"><a href="${facebook}" style="color: #a07d3c;">${facebook}</a></td></tr>
                            <tr><td style="padding: 8px 0; font-weight: bold; color: #3d230d;">Instagram:</td><td style="padding: 8px 0;"><a href="${instagram}" style="color: #a07d3c;">${instagram}</a></td></tr>
                        </table>
                        <p style="margin-top: 16px; font-size: 12px; color: #7a5c3a;">Reply directly to this email to contact the school. Add them via the Admin Panel → Directory tab.</p>
                    </div>
                </div>
            `,
        });

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
