'use server';

import { createClient } from '@supabase/supabase-js';
import { sendRegistrationConfirmationEmail } from '@/utils/email';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function triggerConfirmationEmail(registrationIds: string[]) {
    try {
        if (!registrationIds || registrationIds.length === 0) return { success: false, error: 'No registration IDs provided' };

        // Fetch the registrations to get the student name, items, and user_id
        const { data: registrations, error: regError } = await supabaseAdmin
            .from('registrations')
            .select('user_id, student_name, competition_item')
            .in('id', registrationIds);

        if (regError || !registrations || registrations.length === 0) {
            console.error('Failed to fetch registrations for email confirmation:', regError);
            return { success: false, error: 'Failed to fetch registrations' };
        }

        const userId = registrations[0].user_id;
        const studentName = registrations[0].student_name;
        const categories = registrations.map(r => r.competition_item);

        // Fetch the user's email from Auth using admin client
        const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);
        
        if (userError || !userData.user?.email) {
            console.error('Failed to fetch user email:', userError);
            return { success: false, error: 'Failed to fetch user email' };
        }

        const userEmail = userData.user.email;

        // Send the email
        const emailResult = await sendRegistrationConfirmationEmail({
            to: userEmail,
            studentName,
            categories,
        });

        if (!emailResult.success) {
            console.error('Failed to send confirmation email:', emailResult.error);
            return { success: false, error: emailResult.error };
        }

        return { success: true };
    } catch (error: any) {
        console.error('Error triggering confirmation email:', error);
        return { success: false, error: error.message };
    }
}
