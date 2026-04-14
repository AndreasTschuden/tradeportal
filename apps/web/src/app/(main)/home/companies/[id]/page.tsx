import Link from "next/link";
import { getCompanyById } from "@/actions/company";

interface PageProps {
	params: { id: string };
}

const Page = async ({ params }: PageProps) => {
	const { id } = await params;
	const company = await getCompanyById(id);

	if (!company) {
		return <div className="p-6">Company not found</div>;
	}

	const formatDate = (date?: Date | null) =>
		date ? new Date(date).toLocaleDateString() : "N/A";

	const InfoItem = ({
		label,
		value,
	}: {
		label: string;
		value?: string | number | null;
	}) => (
		<div>
			<p className="text-sm text-gray-500">{label}</p>
			<p className="font-medium wrap-break-words">{value || "N/A"}</p>
		</div>
	);

	const LinkItem = ({
		label,
		href,
	}: {
		label: string;
		href?: string | null;
	}) => (
		<div>
			<p className="text-sm text-gray-500">{label}</p>
			{href ? (
				<a
					href={href}
					target="_blank"
					className="text-blue-600 hover:underline break-all"
					rel="noopener"
				>
					{href}
				</a>
			) : (
				<p>N/A</p>
			)}
		</div>
	);

	return (
		<div>
			<nav className="flex my-2 mb-6 text-sm">
				<Link href="/home" className="text-gray-400">
					Home
				</Link>
				<p className="px-3 text-gray-400">/</p>
				<Link href={`/home/companies/${id}`} className="text-red-700 font-bold">
					{company?.company_name}
				</Link>
			</nav>

			<div className="bg-white shadow rounded-2xl p-6 mb-6">
				<h1 className="text-3xl font-bold mb-3">{company.company_name}</h1>

				<span
					className={`px-3 py-1 text-sm rounded-full ${
						company.is_verified
							? "bg-green-100 text-green-700"
							: "bg-gray-100 text-gray-600"
					}`}
				>
					{company.is_verified ? "Verified" : "Not Verified"}
				</span>
			</div>

			<div className="space-y-6">
				<div className="bg-white rounded-2xl p-6">
					<h2 className="text-lg font-semibold mb-4">General</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<InfoItem label="Company Name" value={company.company_name} />
						<InfoItem label="Employees" value={company.employee_count} />
						<InfoItem label="Head of Company" value={company.head_of_company} />
						<InfoItem label="Founded" value={formatDate(company.founded_at)} />
					</div>
				</div>

				<div className="bg-white shadow rounded-2xl p-6">
					<h2 className="text-lg font-semibold mb-4">Contact</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<InfoItem label="Email" value={company.email} />
						<InfoItem label="Phone" value={company.phone_number} />
						<InfoItem label="Address" value={company.address} />
					</div>
				</div>

				<div className="bg-white shadow rounded-2xl p-6">
					<h2 className="text-lg font-semibold mb-4">Online Presence</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<LinkItem label="Website" href={company.website} />
						<LinkItem label="LinkedIn" href={company.linkedin_url} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
