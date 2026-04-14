import React from "react";
import { SignupCompany } from "@/components/app/SignupCompany";

const Page = async () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="w-full max-w-lg">
				<h1 className="text-2xl font-bold mb-4">Sign up (company)</h1>
				<SignupCompany />
			</div>
		</div>
	);
};

export default Page;
