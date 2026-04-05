import Link from "next/link";
import { verifyStripeSession } from "@/lib/verify-session";
import { redirect } from "next/navigation";

// Next.js Pages erhalten searchParams direkt als Prop
interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

const SuccessPage = async ({ searchParams }: Props) => {
  // 1. Warte auf die SearchParams (in Next.js 15+ sind diese ein Promise)
  const { session_id } = await searchParams;

  // 2. Sicherheitscheck: Wenn keine ID da ist, zurück zum Warenkorb
  if (!session_id) {
    redirect("/home/cart");
  }

  // 3. Session bei Stripe verifizieren
  const result = await verifyStripeSession(session_id);

  // 4. Wenn die Zahlung nicht erfolgreich war, Fehlermeldung oder Redirect
  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600">Zahlung fehlgeschlagen</h1>
        <p>{result.message}</p>
        <Link href="/home/cart" className="mt-4 text-blue-500 underline">Zurück zum Warenkorb</Link>
      </div>
    );
  }

  

  return (
    <div className="max-w-7xl mx-auto px-4">
      <nav className="flex my-4 text-sm">
        <Link href="/home" className="text-gray-400">Home</Link>
        <p className="px-3 text-gray-400">/</p>
        <Link href="/home/cart" className="text-gray-400">Cart</Link>
        <p className="px-3 text-gray-400">/</p>
        <span className="text-red-700 font-bold">Order Completed</span>
      </nav>

      <div className="flex flex-col gap-10">
        <div className="h-px bg-gray-300 w-full"></div>
        
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-center justify-center">
          <div className="flex gap-5 items-center justify-center opacity-50">
            <div className="bg-gray-200 text-black font-medium text-2xl w-12 h-12 rounded-full flex items-center justify-center">
              1
            </div>
            <h1 className="text-xl font-bold">CART ITEMS</h1>
          </div>
          
          <div className="flex gap-5 items-center justify-center">
            <div className="bg-red-700 text-white font-medium text-2xl w-12 h-12 rounded-full flex items-center justify-center">
              2
            </div>
            <h1 className="text-xl font-bold">ORDER COMPLETE</h1>
          </div>
        </div>

        <div className="h-px bg-gray-300 w-full"></div>

        <div className="text-center py-10">
          <h2 className="text-3xl font-bold mb-4">Vielen Dank für deine Bestellung!</h2>
          <p className="text-gray-600">
            Eine Bestätigung wurde an <span className="font-semibold">{result.customer}</span> gesendet.
          </p>
          <Link 
            href="/home" 
            className="mt-8 inline-block bg-red-700 text-white px-8 py-3 rounded-md font-medium"
          >
            Weiter einkaufen
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;