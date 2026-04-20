import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { handleCompanyDeletion } from "@/actions/company-account";
import { handleCustomerDeletion } from "@/actions/customer-account";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import { PrismaClient } from "@/generated/prisma/client";
import { db } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "./password";

const connectionString = `${process.env.DATABASE_URL_BETTER_AUTH}`;
const getRequiredEnv = (key: string): string => {
	const value = process.env[key];
	if (!value) {
		throw new Error(`Missing required env var: ${key}`);
	}
	return value;
};

const resend = new Resend(getRequiredEnv("RESEND_API_KEY"));

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql", // or "mysql", "sqlite"
	}),
	user: {
		deleteUser: {
			enabled: true,
			afterDelete: async (user, _request) => {
				const company = await db.company.companies.findFirst({
					where: {
						owner_id: user.id,
					},
				});

				if (company) {
					await handleCompanyDeletion(user);
				}

				const customer = await db.user.customers.findFirst({
					where: {
						id: user.id,
					},
				});

				if (customer) {
					await handleCustomerDeletion(user);
				}
			},
			sendDeleteAccountVerification: async ({ user, url, token }, _request) => {
				const result = await resend.emails.send({
					from: getRequiredEnv("RESEND_FROM_EMAIL"),
					to: user.email,
					subject: `Delete account: ${user.name}`,
					text: `Click the following link to delete your account: ${url}`,
					html: `
                  <h2>Delete Account</h2>
                  <p>Please click the button below to delete your account</p>
                  <a href="${url}" 
                    style="padding:10px 15px;background:#000;color:#fff;text-decoration:none;border-radius:5px;">
                    Delete Account
                  </a>
                `,
				});
				console.log(`Delete user email sent to ${user.email}`, result);
			},
		},
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		password: {
			hash: hashPassword,
			verify: verifyPassword,
		},
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			console.log("Sending verification email to", user.email);
			const result = await resend.emails.send({
				from: getRequiredEnv("RESEND_FROM_EMAIL"),
				to: user.email,
				subject: "Verify your email address",
				text: `Click the following link to verify your email: ${url}`,
				html: `
        <h2>Email Verification</h2>
        <p>Please click the button below to verify your email address:</p>
        <a href="${url}" 
          style="padding:10px 15px;background:#000;color:#fff;text-decoration:none;border-radius:5px;">
          Verify Email
        </a>
      `,
			});
			console.log(`Verification email sent to ${user.email}`, result);
		},
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
	},
	plugins: [nextCookies()],
});
