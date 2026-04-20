import { NextResponse } from "next/server";
import { minioCustomerClient } from "@/lib/minio";
import { createMinioUrl } from "@/lib/zod";

// it will only get called when URL is empty in image and will then get saved into db until it expires, then it will get auto deleted out of db.

export async function POST(request) {
	const arr = await request.json();

	try {
		await createMinioUrl.parseAsync(arr);

		const resultArr = await Promise.all(
			//Promise.all waits until all promises get resolver, if one returns an error, it instantly fails and returns that error.
			arr.map(async ({ name, folder }) => {
				const presignedUrl = await minioCustomerClient.presignedGetObject(
					"images",
					`/${folder}/${name}`,
					60 * 60,
				);
				return { url: presignedUrl };
			}),
		);

		return NextResponse.json(resultArr);
	} catch (error) {
		console.error("Error creating URL:", error);
		return NextResponse.json(
			{
				error: error.message
					? error.message
					: `Error while connecting to bucket: ${error}`,
			},
			{ status: 400 },
		);
	}
}

// type errorArray = { message: string, path: [ number, string ] }[]

// const response = await fetch("/api/create-img-url", {
//   method: "POST",
//   body: JSON.stringify([{ name: "zeduardo-gorghetto-CS3WuMvmGfE-unsplash.jpg"/*gotten from db*/, folder: "products" },{ name: "zeduardo-gorghetto-CS3WuMvmGfE-unsplash.jpg", folder: "products" }]),
//   headers: { "Content-Type": "application/json" },
// });

// const data = await response.json()
// console.log(data)
// if(data.error){
// const obj : errorArray = JSON.parse(data.error);
// obj.map((err) => {
//   console.log(err.message, "at place: "+ Number(err.path[0]+1))
// })
// }
