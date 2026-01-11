import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-12-15.clover",
    typescript: true,
});

/**
 * Create a Stripe Checkout Session
 */
export async function createCheckoutSession({
    priceId,
    successUrl,
    cancelUrl,
    customerId,
    metadata,
}: {
    priceId: string;
    successUrl: string;
    cancelUrl: string;
    customerId?: string;
    metadata?: Record<string, string>;
}) {
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer: customerId,
        metadata,
        allow_promotion_codes: true,
    });

    return session;
}

/**
 * Create a one-time price for a product
 */
export async function createPrice({
    amount,
    currency = "usd",
    productName,
    productId,
}: {
    amount: number;
    currency?: string;
    productName: string;
    productId?: string;
}) {
    // Create product if not exists
    let product: Stripe.Product;
    if (productId) {
        product = await stripe.products.retrieve(productId);
    } else {
        product = await stripe.products.create({
            name: productName,
        });
    }

    // Create price
    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(amount * 100), // Convert to cents
        currency,
    });

    return { product, price };
}

/**
 * Retrieve a checkout session
 */
export async function getCheckoutSession(sessionId: string) {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items", "customer", "payment_intent"],
    });
    return session;
}

/**
 * Construct webhook event
 */
export function constructWebhookEvent(
    payload: string | Buffer,
    signature: string,
    webhookSecret: string
) {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

export default stripe;
