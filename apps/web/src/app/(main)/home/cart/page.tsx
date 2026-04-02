import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";

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
      <div>ShoppingCart</div>
    </div>
  );
};

export default ShoppingCartPage;
