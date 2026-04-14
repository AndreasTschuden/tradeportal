"use server";

type errorArray = { message: string; path: [number, string] }[];

export async function createUploadImageUrl(
	nameArr: { name: string; folder: string }[],
	fileArr: File[],
) {
	const response = await fetch(
		`${process.env.BASE_URL}/api/create-upload-img-url`,
		{
			method: "POST",
			body: JSON.stringify(nameArr),
			headers: { "Content-Type": "application/json" },
		},
	);

	const data = await response.json();

	console.log(data);

	if (data.error) {
		const obj: errorArray = JSON.parse(data.error);
		obj.map((err) => {
			console.log(err.message, "at place: " + Number(err.path[0] + 1));
		});
	} else {
		data.map(async (obj: { url: string }, index: number) => {
			const response = await fetch(obj.url, {
				method: "PUT",
				body: fileArr[index], // raw File object
				headers: { "Content-Type": fileArr[index].type },
			});
		});
	}
}

export async function createImgUrl(
	nameArr: { name: string; folder: string }[],
) {
	const presignedUrl = await fetch(
		`${process.env.BASE_URL}/api/create-img-url`,
		{
			method: "POST",
			body: JSON.stringify(nameArr),
			headers: { "Content-Type": "application/json" },
		},
	);

	const data = await presignedUrl.json();
	console.log(data);

	if (data.error) {
		const obj: errorArray = JSON.parse(data.error);
		obj.map((err) => {
			console.log(err.message, "at place: " + Number(err.path[0] + 1));
		});
	}
}
