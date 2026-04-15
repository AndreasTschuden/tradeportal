"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const RemoveAccount = () => {
	return (
		<button
			type="button"
			className="bg-[#FF000020] py-2 px-7 rounded-xl font-medium text-[#FF0000] flex gap-1"
			onClick={async () => {
				const result = await authClient.deleteUser({
					callbackURL: "/signin",
				});

				if (!result) {
					toast.error("Did not work");
					return;
				}

				toast.success("Send Email!");
			}}
		>
			<Trash2 strokeWidth={1} />
			Remove Account Forever
		</button>
	);
};

export default RemoveAccount;
