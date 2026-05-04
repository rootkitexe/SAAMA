import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-04-22.dahlia',
});

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata;

        if (metadata?.registrationIds) {
            try {
                const ids = JSON.parse(metadata.registrationIds);

                // First check if any of these are still pending_payment to prevent duplicate emails
                const { data: existingRegs } = await supabaseAdmin
                    .from('registrations')
                    .select('id, status')
                    .in('id', ids)
                    .eq('status', 'pending_payment');

                const needsUpdate = existingRegs && existingRegs.length > 0;

                // Update status from pending_payment → confirmed
                const { error } = await supabaseAdmin
                    .from('registrations')
                    .update({
                        status: 'confirmed',
                        payment_id: session.payment_intent as string,
                    })
                    .in('id', ids);

                if (error) {
                    console.error('Supabase update error:', error);
                } else if (needsUpdate) {
                    // Send confirmation email only if we just changed the status
                    const { triggerConfirmationEmail } = await import('@/app/portal/actions');
                    await triggerConfirmationEmail(ids);
                }
            } catch (err) {
                console.error('Error processing webhook:', err);
            }
        }
    }

    return NextResponse.json({ received: true });
}
