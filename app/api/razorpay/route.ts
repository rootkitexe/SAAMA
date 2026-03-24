import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        const { amount, categories, userId } = await request.json();

        const order = await razorpay.orders.create({
            amount: amount * 100, // Razorpay expects paise (cents)
            currency: 'INR',
            receipt: `rcpt_${Date.now()}`, // Keep it under 40 chars
            notes: {
                userId,
                categories: JSON.stringify(categories),
            },
        });

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        });
    } catch (error: any) {
        console.error('Razorpay order creation error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create order' },
            { status: 500 }
        );
    }
}

