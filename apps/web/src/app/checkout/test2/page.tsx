const page = async () => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/account-status/acct_1TIQoQIURzxvDsy2`,
	);

	const linkData = await res.json();

	console.log("Account Status Response:", linkData);

	return <div>page</div>;
};

export default page;
