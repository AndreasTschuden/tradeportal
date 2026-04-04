import { redirect } from "next/navigation";

async function handleCheckout() {
  const form = new FormData();
  form.append("accountId", "acct_1TIQoQIURzxvDsy2"); // Beispiel: Connected Account ID
  form.append(
    "products",
    JSON.stringify([
      { name: "Test T Shirt", price: 1000, currency: "usd", quantity: 1, sellerId: "acct_1TIQoQIURzxvDsy2"},
      { name: "Test T Shirt", price: 2000, currency: "usd", quantity: 1, sellerId: "acct_1TIQoQIURzxvDsy2"},
    ])
  );

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create-checkout-session`, {
    method: "POST",
    body: form,
  });

  const data = await res.json();

  if (data.url) {
    // direkt zur Stripe Checkout Seite weiterleiten
    redirect(data.url);
  } else {
    console.error("Fehler beim Erstellen der Session:", data.error);
  }
}

export default function Page() {
  async function action(formData: FormData) {
    "use server";

    await handleCheckout();
  }

  return (
    <form action={action}>
      <button type="submit">Checkout</button>
    </form>
  );
}
