import Link from "next/link";

const CheckoutPage = () => {

  

  return (
    <div>
      <nav className="flex my-2 mb-4 text-sm">
        <Link href="/home" className="text-gray-400">
          Home
        </Link>
        <p className="px-3 text-gray-400">/</p>
        <Link href="/home/cart" className="text-red-700 font-bold">
          Cart
        </Link>
      </nav>
      <div>
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
        <div className="py-10">
          asd
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage