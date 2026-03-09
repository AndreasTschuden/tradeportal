import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const userConnectionString = process.env.DIRECT_URL_USER!;
const companyConnectionString = process.env.DIRECT_URL_COMPANY!;

const userAdapter = new PrismaPg({ connectionString: userConnectionString });
const companyAdapter = new PrismaPg({ connectionString: companyConnectionString });

const prismaUser = new PrismaClient({
  adapter: userAdapter,
});

const prismaCompany = new PrismaClient({
  adapter: companyAdapter,
});

export const db = {
  user: prismaUser,
  company: prismaCompany
};