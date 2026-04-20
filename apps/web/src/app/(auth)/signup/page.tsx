import { Signup } from "@/components/app/Signup";

const Page = async () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="w-full max-w-lg">
				<Signup />
			</div>
		</div>
	);
};

export default Page;
