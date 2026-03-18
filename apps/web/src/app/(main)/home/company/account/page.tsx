import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";

const page = () => {

  return (
    <div>Company Account</div>
  )
}

export default page