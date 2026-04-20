import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const getRequiredEnv = (key: string): string => {
	const value = process.env[key];
	if (!value) {
		throw new Error(`Missing required env var: ${key}`);
	}
	return value;
};

const userConnectionString = getRequiredEnv("DATABASE_URL_USER");
const companyConnectionString = getRequiredEnv("DATABASE_URL_COMPANY");

const userAdapter = new PrismaPg({ connectionString: userConnectionString });
const companyAdapter = new PrismaPg({
	connectionString: companyConnectionString,
});

const prismaUser = new PrismaClient({
	adapter: userAdapter,
});

const prismaCompany = new PrismaClient({
	adapter: companyAdapter,
});

export const db = {
	user: prismaUser,
	company: prismaCompany,
};
