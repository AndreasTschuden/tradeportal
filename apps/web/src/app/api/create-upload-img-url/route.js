import { NextResponse } from "next/server";
import { minioCompanyClient } from "@/lib/minio";
import { createMinioUrl } from "@/lib/zod";

export async function POST(request) {
	const arr = await request.json();

	try {
		await createMinioUrl.parseAsync(arr);

		const resultArr = await Promise.all(
			//Promise.all waits until all promises get resolver, if one returns an error, it instantly fails and returns that error.
			arr.map(async ({ name, folder }) => {
				const presignedUrl = await minioCompanyClient.presignedPutObject(
					"images",
					`/${folder}/${name}`,
					10 * 60,
				);
				return { url: presignedUrl };
			}),
		);

		return NextResponse.json(resultArr);
	} catch (error) {
		console.error("Error uploading image:", error);
		return NextResponse.json(
			{
				error: error.message
					? error.message
					: "Error while connecting to bucket: " + error,
			},
			{ status: 400 },
		);
	}
}

// type errorArray = { message: string, path: [ number, string ] }[]

// const presignedUrl = await fetch("/api/create-upload-img-url", {
//         method: "POST",
//         body: JSON.stringify([{ name: "1"+file?.name, folder: "products" },{ name: "2"+file?.name, folder: "products" }]),
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await presignedUrl.json()
//       console.log(data)
//       if(data.error){
//         const obj : errorArray = JSON.parse(data.error);
//         obj.map((err) => {
//           console.log(err.message, "at place: "+ Number(err.path[0]+1))
//         })
//       }else{
//         data.map(async (obj: {url: string}) => { //they can also upload other malicious files, but since they need to be a registered company to upload something, we could just threaten to sue
//         const response = await fetch(obj.url, {
//           method: "PUT",
//           body: file, // raw File object
//           headers: { "Content-Type": file.type },
//         });
//         })
//       }
