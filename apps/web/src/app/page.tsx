import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { signOutAction } from "./actions/auth";
import File from "@/components/app/file";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-4xl font-bold">TradePortal</h1>
        <div className="flex gap-4 mt-8">
          <Link
            href="/login"
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white p-5 text-lg font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </Link>
          <File/>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">TradePortal</h1>
      <div className="mt-8 text-center">
        <p className="text-lg mb-4">User ID: {session.user.id}</p>
        <form action={signOutAction}>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Logout
          </button>
        </form>
      </div>
      <div className="mt-6 w-full flex justify-center px-4"></div>
    </div>
  );
}
