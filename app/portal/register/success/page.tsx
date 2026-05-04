import Link from 'next/link';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-04-22.dahlia',
});

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function RegistrationSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    const params = await searchParams;
    const sessionId = params.session_id;
    let saved = false;
    let error = '';

    if (sessionId) {
        try {
            // Fetch the Stripe session to verify payment
            const session = await stripe.checkout.sessions.retrieve(sessionId);

            if (session.payment_status === 'paid' && session.metadata) {
                const { registrationIds } = session.metadata;

                if (registrationIds) {
                    const ids = JSON.parse(registrationIds);

                    // First check if any of these are still pending_payment to prevent duplicate emails
                    const { data: existingRegs } = await supabaseAdmin
                        .from('registrations')
                        .select('id, status')
                        .in('id', ids)
                        .eq('status', 'pending_payment');

                    const needsUpdate = existingRegs && existingRegs.length > 0;

                    // Update the registration status from pending_payment → confirmed
                    const { error: updateError } = await supabaseAdmin
                        .from('registrations')
                        .update({
                            status: 'confirmed',
                            payment_id: session.payment_intent as string,
                        })
                        .in('id', ids);

                    if (updateError) {
                        error = updateError.message;
                    } else {
                        saved = true;
                        
                        // Send confirmation email only if we just changed the status
                        if (needsUpdate) {
                            const { triggerConfirmationEmail } = await import('@/app/portal/actions');
                            await triggerConfirmationEmail(ids);
                        }
                    }
                }
            }
        } catch (err: any) {
            error = err.message || 'Failed to verify payment';
        }
    }

    return (
        <div className="min-h-screen bg-[#faf5eb] flex items-center justify-center px-4">
            <div className="bg-white/80 border border-[#d4c4a8] rounded-xl p-10 max-w-md text-center shadow-sm">
                {error ? (
                    <>
                        <div className="flex justify-center mb-6">
                            <div className="bg-yellow-100 rounded-full p-4">
                                <AlertTriangle className="h-12 w-12 text-yellow-600" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-[#3d230d] mb-3">Payment Received</h1>
                        <p className="text-[#7a5c3a] mb-2">Your payment was successful, but there was an issue updating your registration.</p>
                        <p className="text-sm text-red-600 mb-6">Error: {error}</p>
                        <p className="text-sm text-[#7a5c3a]/70 mb-8">Please contact support with your payment confirmation.</p>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center mb-6">
                            <div className="bg-green-100 rounded-full p-4">
                                <CheckCircle className="h-12 w-12 text-green-600" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-[#3d230d] mb-3">Payment Successful!</h1>
                        <p className="text-[#7a5c3a] mb-2">Your competition registration has been confirmed.</p>
                        <p className="text-sm text-[#7a5c3a]/70 mb-8">
                            A confirmation will appear in your dashboard. You can view your registrations at any time.
                        </p>
                    </>
                )}
                <Link
                    href="/portal"
                    className="inline-block bg-[#3d230d] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#2a1809] transition-colors"
                >
                    Go to Dashboard →
                </Link>
            </div>
        </div>
    );
}
