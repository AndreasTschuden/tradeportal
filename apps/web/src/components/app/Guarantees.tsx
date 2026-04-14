import { Headset, ShieldCheck, Truck } from "lucide-react";
import React from "react";

const Guarantees = () => {
	return (
		<div
			className="border-t border-b min-h-[15vh] flex items-center justify-between lg:flex-row lg:py-0 py-10 flex-col gap-10 w-full md:px-30 px-5"
			id="gurantees-section"
		>
			<div className="flex lg:flex-row flex-col items-center gap-4">
				<Headset strokeWidth={1} size={30} />
				<div>
					<h2 className="font-bold lg:text-left text-center">
						24/7 CUSTOMER SUPPORT
					</h2>
					<p className="text-gray-500 lg:text-left text-center">
						Lorem ipsum dolor sit amet, consetetur sadipscing
					</p>
				</div>
			</div>

			<div className="flex lg:flex-row flex-col items-center gap-4">
				<ShieldCheck strokeWidth={1} size={30} />
				<div>
					<h2 className="font-bold lg:text-left text-center">
						MONEY BACK GUARANTEE
					</h2>
					<p className="text-gray-500 lg:text-left text-center">
						Lorem ipsum dolor sit amet, consetetur sadipscing
					</p>
				</div>
			</div>

			<div className="flex lg:flex-row flex-col items-center gap-4">
				<Truck strokeWidth={1} size={30} />
				<div>
					<h2 className="font-bold lg:text-left text-center">
						FREE AND FAST DELIVERY
					</h2>
					<p className="text-gray-500 lg:text-left text-center">
						Lorem ipsum dolor sit amet, consetetur sadipscing
					</p>
				</div>
			</div>
		</div>
	);
};

export { Guarantees };
