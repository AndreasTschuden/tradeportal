"use client"
import {publicStripe} from '@/lib/stripe'
import { useEffect } from 'react';

export function Checkout () {

useEffect(() => {

        // Fetch Checkout Session and retrieve the client secret
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  // Initialize Checkout
  const stripe = await publicStripe;
  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}

      initialize();

})

//something about checkout.unmount, look into that as well.

    return(
        <div id="checkout">
        {/* <!-- Checkout will insert the payment form here --> */}
        </div>
    )
}