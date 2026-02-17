import Stripe from "stripe";

export const secretStripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const publicStripe = Stripe(process.env.STRIPE_PUBLIC_KEY);
