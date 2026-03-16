import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";

const PUBLIC_ROUTES = [
  "/login",
  "/auth/signin",
  "/auth/signup",
  "/auth/signup/company",
];
const COMPANY_ROUTES = ["/company/publish-product"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/auth") {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  const companyUser = await db.company.companies.findFirst({
    where: {
      owner_id: session.user.id,
    },
  });

  if (!companyUser && COMPANY_ROUTES.includes(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico).*)", // Protect all routes except for /api, /_next/static, /favicon.ico and any /auth/* pages
  ],
};
