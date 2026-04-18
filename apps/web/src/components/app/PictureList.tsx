"use client";

import Image from "next/image";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { buttonClass } from "../ui/FormControls";

const PictureList = ({ images }: { images: Record<string, string> }) => {
	const imageNames: string[] = [];
	const optionNames: string[] = [];

	Object.entries(images).forEach(([key, value]) => {
		imageNames.push(value);
		optionNames.push(key);
	});

	const [imageNamesState, setImageNamesState] = useState(imageNames);
	const [optionNamesState, setOptionNamesState] = useState(optionNames);
	const [open, setOpen] = useState(false);

	if (imageNamesState.length === 0) {
		return (
			<div className="flex items-center justify-center aspect-square">
				No Images uploaded
			</div>
		);
	}

	if (imageNamesState.length === 1) {
		return (
			<div className="relative w-full aspect-square mb-4">
				<Image
					src={`https://minio.tschudea.de:8999/images/products/${imageNamesState[0]}`}
					alt={optionNames[0] ?? "Product image"}
					fill
					className="rounded-2xl object-cover"
				/>
			</div>
		);
	}

	const swapPictures = (from: number) => {
		const imgArr = [...imageNamesState];
		const optArr = [...optionNamesState];

		[imgArr[0], imgArr[from]] = [imgArr[from], imgArr[0]];
		[optArr[0], optArr[from]] = [optArr[from], optArr[0]];

		setImageNamesState(imgArr);
		setOptionNamesState(optArr);
	};

	return (
		<div className="mb-4 flex flex-col gap-4 sm:flex-row">
			<div className="relative aspect-square w-full sm:w-3/4">
				<Image
					src={`https://minio.tschudea.de:8999/images/products/${imageNamesState[0]}`}
					alt={optionNamesState[0]}
					fill
					className="rounded-2xl object-cover"
				/>
			</div>

			<div className="flex w-full gap-4 sm:w-1/4 sm:flex-col">
				{imageNamesState[1] ? (
					<button
						type="button"
						className="relative aspect-square flex-1 rounded-2xl bg-gray-100 sm:flex-none"
						onClick={() => swapPictures(1)}
					>
						<Image
							src={`https://minio.tschudea.de:8999/images/products/${imageNamesState[1]}`}
							alt={optionNamesState[1]}
							fill
							className="object-cover rounded-2xl"
						/>
					</button>
				) : (
					<div className="aspect-square" />
				)}

				{imageNamesState[2] ? (
					<button
						type="button"
						className="relative aspect-square flex-1 rounded-2xl bg-gray-100 sm:flex-none"
						onClick={() => swapPictures(2)}
					>
						<Image
							src={`https://minio.tschudea.de:8999/images/products/${imageNamesState[2]}`}
							alt={optionNamesState[2]}
							fill
							className="object-cover rounded-2xl"
						/>
					</button>
				) : (
					<div className="aspect-square" />
				)}

				{imageNamesState.length === 4 ? (
					<button
						type="button"
						className="relative aspect-square flex-1 rounded-2xl bg-gray-100 sm:flex-none"
						onClick={() => swapPictures(3)}
					>
						<Image
							src={`https://minio.tschudea.de:8999/images/products/${imageNamesState[3]}`}
							alt={optionNamesState[3]}
							fill
							className="object-cover rounded-2xl"
						/>
					</button>
				) : imageNamesState.length > 4 ? (
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<button
								type="button"
								className="flex aspect-square w-full flex-1 items-center justify-center rounded-2xl border border-gray-300 font-medium sm:flex-none"
							>
								{imageNamesState.length - 3} more...
							</button>
						</DialogTrigger>

						<DialogContent className="max-w-7xl! w-full max-h-[85vh] overflow-y-auto">
							<DialogHeader>
								<DialogTitle>Photo Album</DialogTitle>
							</DialogHeader>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{imageNamesState.map((name, index) => (
									<button
										key={name}
										type="button"
										onClick={() => {
											swapPictures(index);
											setOpen(false);
										}}
										className="w-full"
									>
										<div className="relative w-full aspect-square">
											<Image
												src={`https://minio.tschudea.de:8999/images/products/${name}`}
												alt={name}
												fill
												className="object-cover rounded-xl"
											/>
										</div>
									</button>
								))}
							</div>
						</DialogContent>
					</Dialog>
				) : (
					<div className="aspect-square" />
				)}
			</div>
		</div>
	);
};

export { PictureList };
