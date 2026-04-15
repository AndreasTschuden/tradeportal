"use client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function ReCaptchaProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const reCaptchaKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY ?? "";

	return (
		<GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>
			{children}
		</GoogleReCaptchaProvider>
	);
}
