import Link from "next/link";

const page = () => {
	return (
		<div>
			<nav className="flex my-2 mb-4 text-sm">
				<Link href="/home" className="text-gray-400">
					Home
				</Link>
				<p className="px-3 text-gray-400">/</p>
				<Link href="/signin" className="text-gray-400">
					Sign in
				</Link>
				<p className="px-3 text-gray-400">/</p>
				<Link href="/terms-and-service" className="text-red-700 font-bold">
					Terms and Service
				</Link>
			</nav>
			<div className="flex flex-col gap-10">
				<div className="flex flex-row">
					<div>
						<h2 className="text-3xl font-bold">Terms and Service</h2>
						<p className="text-gray-400">
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr
						</p>
					</div>
				</div>
				<div className="flex flex-col gap-8">
					<div className="font-bold text-lg">
						Last Updated:{" "}
						<strong className="font-normal text-lg">April 2026</strong>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="font-medium text-lg">1. Acceptance of Terms</h3>
						<p className="text-md font-normal text-gray-500">
							By accessing or using this website, you agree to be legally bound
							by these Terms of Service and all applicable laws and regulations.
							These terms apply to all visitors, users, customers, and any other
							individuals who access or use the website or its services. If you
							do not agree with any provision of these terms, you must
							immediately discontinue use of the website and its services. Your
							continued use of the website constitutes your ongoing acceptance
							of these Terms
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="font-medium text-lg">2. Shipping and Delivery</h3>
						<p className="text-md font-normal text-gray-500">
							Delivery times provided on the website are estimates only and are
							not guaranteed, as shipping may be affected by external factors
							beyond our control. We are not responsible for delays caused by
							shipping carriers, customs authorities, natural events, or other
							unforeseen circumstances. Risk of loss and title for purchased
							products transfer to the customer upon delivery to the designated
							shipping provider. It is the customer’s responsibility to provide
							accurate shipping information to ensure proper delivery.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="font-medium text-lg">3. Products and Services</h3>
						<p className="text-md font-normal text-gray-500">
							All products and services offered on this website are subject to
							availability and may be withdrawn or modified at any time without
							prior notice. We make reasonable efforts to ensure that product
							descriptions, images, and specifications are accurate, but we do
							not guarantee that all information is complete, current, or
							error-free. We reserve the right to limit quantities, refuse
							orders, or cancel transactions at our sole discretion, including
							in cases of pricing errors or suspected fraud. Any such
							cancellation will be communicated to the customer as soon as
							reasonably possible.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="font-medium text-lg">4. Pricing and Payment</h3>
						<p className="text-md font-normal text-gray-500">
							All prices displayed on the website are listed in [Currency] and
							may be updated or changed without prior notice. While we strive to
							ensure pricing accuracy, errors may occur, and we reserve the
							right to correct any inaccuracies and cancel orders arising from
							such errors. Payment must be completed in full before an order is
							processed, confirmed, or shipped, and you agree to provide
							accurate and valid payment information. If a payment is declined,
							disputed, or otherwise unsuccessful, we reserve the right to
							suspend or cancel the related order.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="font-medium text-lg">6. Returns and Refunds</h3>
						<p className="text-md font-normal text-gray-500">
							Returns and refunds are governed by our Return Policy, which forms
							an integral part of these Terms of Service. Items must be returned
							unused, undamaged, and in their original packaging within the
							specified return period to qualify for a refund or exchange. We
							reserve the right to inspect returned products before approving
							any refund and to deny refunds that do not meet our return
							conditions. Approved refunds will be processed using the original
							payment method within a reasonable timeframe.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="font-medium text-lg">7. Intellectual Property</h3>
						<p className="text-md font-normal text-gray-500">
							All content available on this website, including but not limited
							to text, graphics, logos, images, videos, designs, and software,
							is the property of the company or its licensors and is protected
							by applicable intellectual property laws. Unauthorized
							reproduction, distribution, modification, display, or transmission
							of any content is strictly prohibited without prior written
							consent. You are granted a limited, non-exclusive,
							non-transferable license to access and use the website solely for
							personal and non-commercial purposes. Any unauthorized use may
							result in legal action and termination of access rights.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="font-medium text-lg">8. Limitation of Liability</h3>
						<p className="text-md font-normal text-gray-500">
							To the fullest extent permitted by law, we shall not be liable for
							any indirect, incidental, special, consequential, or punitive
							damages arising out of or related to your use of the website or
							its products and services. This includes, without limitation, loss
							of profits, data, business opportunities, or goodwill, even if we
							have been advised of the possibility of such damages. Our total
							cumulative liability for any claim related to the website or
							products shall not exceed the amount paid by you for the relevant
							product or service. Use of the website and its services is at your
							own risk.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="font-medium text-lg">9. Changes to Terms</h3>
						<p className="text-md font-normal text-gray-500">
							We reserve the right to update, modify, or replace these Terms of
							Service at any time at our sole discretion. Any changes will be
							effective immediately upon posting on the website, unless
							otherwise stated. It is your responsibility to review these terms
							periodically to stay informed of any updates. Continued use of the
							website following the publication of changes constitutes your
							acceptance of the revised Terms.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="font-medium text-lg">10. Contact Information</h3>
						<p className="text-md font-normal text-gray-500">
							If you have any questions, concerns, or inquiries regarding these
							Terms of Service, you may contact us using the information
							provided below. We will make reasonable efforts to respond to all
							legitimate inquiries within a reasonable timeframe. Please ensure
							that your contact details are accurate and complete when
							submitting a request to facilitate proper communication. Official
							correspondence should be directed to the contact details listed
							below.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="font-medium text-lg">2. Use of the Website</h3>
						<p className="text-md font-normal text-gray-500">
							You agree to use this website solely for lawful purposes and in
							compliance with all applicable local, national, and international
							laws and regulations. You must not attempt to gain unauthorized
							access to any part of the website, its servers, databases, or
							connected systems through hacking, password mining, or any other
							means. Any misuse, interference, disruption, or attempt to damage
							the functionality, security, or accessibility of the website is
							strictly prohibited and may result in legal action. We reserve the
							right to restrict or terminate access to users who violate these
							provisions.
						</p>
					</div>
				</div>
				<div>
					<div className="font-bold text-lg">
						Email:{" "}
						<strong className="font-normal text-lg">
							tradepotal.support@tschudea.de
						</strong>
					</div>
					<div className="font-bold text-lg">
						Address:{" "}
						<strong className="font-normal text-lg">
							St.Jakob im Rosental 9184
						</strong>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
