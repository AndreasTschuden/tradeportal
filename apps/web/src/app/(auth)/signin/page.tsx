import { Signin } from "@/components/app/Signin";

const Page = async () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="w-full max-w-md">
				<h1 className="text-2xl font-bold mb-4">Sign in</h1>
				<Signin />
			</div>
		</div>
	);
};

export default Page;
