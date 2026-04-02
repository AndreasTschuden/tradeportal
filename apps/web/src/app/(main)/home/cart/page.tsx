import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import Link from "next/link";

const ShoppingCartPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const customer = await db.user.customers.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!customer) {
    redirect("/home");
  }

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
       Cart
      </div>
    </div>
  );
};

export default ShoppingCartPage;
