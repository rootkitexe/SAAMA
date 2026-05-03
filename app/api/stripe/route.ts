import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-04-22.dahlia',
});

export async function POST(request: Request) {
    try {
        const { amount, categories, userId, studentName, registrationIds, profile } = await request.json();

        if (!amount || !categories || !userId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create line items for each category
        const lineItems = categories.map((cat: string) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: `${cat} — Competition Registration`,
                    description: `${studentName || 'Student'} — Sadhana Academy Competition`,
                },
                unit_amount: 3500, // $35.00 in cents
            },
            quantity: 1,
        }));

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5175';

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            metadata: {
                userId,
                registrationIds: JSON.stringify(registrationIds),
            },
            success_url: `${baseUrl}/portal/register/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/portal/register?canceled=true`,
            customer_email: profile?.email || undefined,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe session creation error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
