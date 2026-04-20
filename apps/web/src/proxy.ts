import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";

const PUBLIC_ROUTES = [
	"/signin",
	"/signup",
	"/signup/company",
	"/terms-and-service",
];

const COMPANY_ROUTES = ["/home/company/publish-product, /home/company/account"];

const CUSTOMER_ROUTES = ["/home/account"];

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	console.log(pathname);

	if (pathname === "/") {
		const url = request.nextUrl.clone();
		url.pathname = "/home";
		return NextResponse.redirect(url);
	}

	if (PUBLIC_ROUTES.includes(pathname)) {
		return NextResponse.next();
	}

	const session = await auth.api.getSession({
		headers: request.headers,
	});

	if (!session) {
		const url = request.nextUrl.clone();
		url.pathname = "/signin";
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

	const customerUser = await db.company.customers.findFirst({
		where: {
			id: session.user.id,
		},
	});

	if (!customerUser && CUSTOMER_ROUTES.includes(pathname)) {
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
