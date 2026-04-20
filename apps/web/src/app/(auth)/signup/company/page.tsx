import { SignupCompany } from "@/components/app/SignupCompany";

const Page = async () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="w-full max-w-lg">
				<SignupCompany />
			</div>
		</div>
	);
};

export default Page;
