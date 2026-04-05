import Link from "next/link";
import { checkOrder, getOrderById } from "@/actions/orders";
import { redirect } from "next/navigation";
import { ShippingForm } from "@/components/app/cart/checkout/ShippingForm";

interface Props {
  params: Promise<{ order_id?: string }>;
}

const CheckoutPage = async ({ params }: Props) => {
  const { order_id } = await params;

  if (!order_id) {
    redirect("/home/cart");
  }

  await checkOrder(order_id);

  const order = await getOrderById(order_id);
  const subtotal = order.orders_products.reduce((sum, prod) => {
    return sum + Number(prod.unit_price) * prod.quantity;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto">
      <nav className="flex items-center my-2 mb-4 text-sm">
        <Link
          href="/home"
          className="text-gray-500 hover:text-red-700 transition-colors"
        >
          Home
        </Link>
        <p className="px-3 text-gray-400">/</p>
        <Link href="/home/cart" className="text-red-700 font-semibold">
          Cart
        </Link>
      </nav>

      <div className="flex flex-col gap-8">

        <div className="flex flex-col gap-10">
          <div className="h-px bg-gray-300 w-full"></div>
          <div className="flex gap-20 items-center justify-center">
            <div className="flex gap-5 items-center justify-center">
              <div className="bg-gray-200 text-black font-medium text-2xl w-13 h-13 rounded-full flex items-center justify-center">
                1
              </div>
              <h1 className="text-xl font-bold">CART ITEMS</h1>
            </div>
            <div className="flex gap-5 items-center justify-center">
              <div className="bg-red-700 text-white font-medium text-2xl w-13 h-13 rounded-full flex items-center justify-center">
                2
              </div>
              <h1 className="text-xl font-bold">CHECKOUT</h1>
            </div>
            <div className="flex gap-5 items-center justify-center">
              <div className="bg-gray-200 text-black font-medium text-2xl w-13 h-13 rounded-full flex items-center justify-center">
                3
              </div>
              <h1 className="text-xl font-bold">ORDER COMPLETE</h1>
            </div>
          </div>
          <div className="h-px bg-gray-300 w-full"></div>
        </div>

        <section className="pb-12">

          <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
            <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Bestellübersicht</h3>
              </div>

              <div className="divide-y divide-gray-100">
                {order.orders_products.map((prod) => {
                  const itemTotal = Number(prod.unit_price) * prod.quantity;

                  return (
                    <div
                      className="px-5 py-4 flex items-center justify-between gap-4"
                      key={prod.orders_id + prod.products_id + prod.product_variant}
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {prod.products.name}
                        </p>
                        <p className="text-sm text-gray-500">Menge: {prod.quantity}x</p>
                      </div>
                      <p className="font-semibold text-gray-900 whitespace-nowrap">
                        {itemTotal.toFixed(2)} €
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                <span className="font-medium text-gray-600">Gesamtsumme</span>
                <span className="text-xl font-semibold text-red-700">
                  {subtotal.toFixed(2)} €
                </span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg bg-white p-5 md:p-6">
              <h3 className="text-lg font-semibold mb-5">Versandadresse</h3>
              <ShippingForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckoutPage;
