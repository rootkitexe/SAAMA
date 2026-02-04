'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createRegistration(formData: any) {
    const supabase = await createClient()

    console.log("Received Registration Data:", formData);

    try {
        // 1. Get User
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            throw new Error("Must be logged in to register")
        }

        // 2. Update Profile (if needed)
        if (formData.fullName || formData.phone) {
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    full_name: formData.fullName,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zip
                })
                .eq('id', user.id)

            if (profileError) {
                console.error('Profile Update Error (Non-fatal):', profileError)
            }
        }

        // 3. Create Registration
        // Validate DOB to prevent DB error
        const dobValue = formData.dob ? formData.dob : null;

        const { error: regError } = await supabase
            .from('registrations')
            .insert({
                user_id: user.id,
                competition_item: formData.item,
                category: formData.category,
                student_name: formData.fullName,
                dob: dobValue,
                guru_name: formData.guruName,
                songs: formData.songs,
                status: 'pending_payment'
            })

        if (regError) {
            console.error('Supabase Insert Error:', regError)
            throw new Error("Database Error: " + regError.message)
        }

    } catch (err: any) {
        console.error("Unknown Server Error:", err)
        throw new Error(err.message || "An unexpected error occurred")
    }

    revalidatePath('/portal')
    redirect('/portal')
}
