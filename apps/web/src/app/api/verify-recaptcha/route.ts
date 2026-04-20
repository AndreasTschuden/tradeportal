import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const body = await req.json();
	const { token } = body;

	const secretKey = process.env.CAPTCHA_SECRET_KEY;

	const verificationResponse = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
		{
			method: "POST",
		},
	);

	const verificationResult = await verificationResponse.json();

	if (verificationResult.success && verificationResult.score >= 0.5) {
		return NextResponse.json({
			success: true,
			score: verificationResult.score,
		});
	} else {
		return NextResponse.json({
			success: false,
			score: verificationResult.score,
			errorCodes: verificationResult["error-codes"],
		});
	}
}
