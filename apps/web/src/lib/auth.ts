import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { nextCookies } from "better-auth/next-js";
import { hashPassword, verifyPassword } from "./password";
import { Resend } from "resend";

const connectionString = `${process.env.DIRECT_URL}`;

const resend = new Resend(process.env.RESEND_API_KEY!);

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite"
  }),
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
      from: process.env.RESEND_FROM_EMAIL!,
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
