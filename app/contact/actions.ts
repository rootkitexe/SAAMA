'use server';

import { createClient } from '@/utils/supabase/server';
import { sendNotificationEmail } from '@/utils/email';

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

    // Send email notification
    await sendNotificationEmail({
        subject: `📩 New Contact Form: ${data.subject}`,
        replyTo: data.email,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #3d230d; color: #faf5eb; padding: 20px; border-radius: 8px 8px 0 0;">
                    <h2 style="margin: 0;">New Contact Form Submission</h2>
                </div>
                <div style="background: #faf5eb; padding: 20px; border: 1px solid #d4c4a8; border-radius: 0 0 8px 8px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 8px 0; font-weight: bold; color: #3d230d;">Name:</td><td style="padding: 8px 0; color: #5c3a1e;">${data.first_name} ${data.last_name}</td></tr>
                        <tr><td style="padding: 8px 0; font-weight: bold; color: #3d230d;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #a07d3c;">${data.email}</a></td></tr>
                        <tr><td style="padding: 8px 0; font-weight: bold; color: #3d230d;">Subject:</td><td style="padding: 8px 0; color: #5c3a1e;">${data.subject}</td></tr>
                    </table>
                    <div style="margin-top: 16px; padding: 16px; background: white; border: 1px solid #d4c4a8; border-radius: 6px;">
                        <p style="margin: 0; color: #3d230d; font-weight: bold; margin-bottom: 8px;">Message:</p>
                        <p style="margin: 0; color: #5c3a1e; line-height: 1.6;">${data.message.replace(/\n/g, '<br>')}</p>
                    </div>
                    <p style="margin-top: 16px; font-size: 12px; color: #7a5c3a;">You can reply directly to this email to respond to ${data.first_name}.</p>
                </div>
            </div>
        `,
    });

    return { success: true };
}
