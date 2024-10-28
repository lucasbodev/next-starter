// ./app/actions/checkout.ts
'use server';

import { Stripe } from '@stripe/stripe-js';

import { formatAmountForStripe } from '@/utils/stripe-helpers';

import getStripe from "@/lib/services/stripe-service";

const stripe = getStripe();

export async function createCheckoutSession(amount: number) {
    const CURRENCY = 'usd'; // Adjust to your currency

    const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'donate',
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: CURRENCY,
                    product_data: {
                        name: 'Custom amount donation',
                    },
                    unit_amount: formatAmountForStripe(amount, CURRENCY),
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancelled`,
    };

    const session = await stripe.checkout.sessions.create(params);
    return session.id;
}
