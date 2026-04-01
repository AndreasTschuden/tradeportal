import { Search, ShoppingCart, User } from "lucide-react";
import { handleUserLink } from "@/actions/auth";
import Link from "next/link";

const MainNav = async () => {
  const result = await handleUserLink();

  console.log(result);

  return (
    <nav className="bg-white border-b border-gray-300 border-t-2 h-[10vh] flex items-center justify-between md:px-30 px-5">
      <div className="">
        <h1 className="text-2xl font-bold">
          TradePortal<strong className="text-red-700">.</strong>
        </h1>
      </div>
      <div className="flex items-center gap-15">
        <div className="flex p-2 border border-[#808080] rounded-sm px-4">
          <input
            type="text"
            placeholder="Search Products..."
            className="font-light"
          />
          <Search strokeWidth={1} color="#808080" />
        </div>
        <div className="flex gap-5">
          <Link
            href="/home/cart"
            className="flex gap-2 items-center justify-center"
          >
            <ShoppingCart size={40} strokeWidth={1} />
            <div className="">
              <h2 className="font-light">Cart</h2>
              <p>$ 160</p>
            </div>
          </Link>
          <div className="h-12 bg-gray-300 w-0.5"></div>
          <Link
            href={result}
            className="flex gap-2 items-center justify-center"
          >
            <User size={40} strokeWidth={1} />
            <div className="">
              <h2 className="font-light">
                {result === "/home/account" ? "User" : "Company"}
              </h2>
              <p>Account</p>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export { MainNav };
