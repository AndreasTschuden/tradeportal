"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NewArrivalList = ({
  newestProducts,
}: {
  newestProducts: newestProductsType[];
}) => {
  const router = useRouter();

  return (
    <div className="flex gap-3 w-full lg:flex-row flex-col">
      {/* BIG LEFT */}
      {newestProducts[0] ? (
        <div
          className="relative lg:w-1/2 w-full aspect-square cursor-pointer"
          onClick={() => router.push(`/home/products/product/${newestProducts[0].id}`)}
        >
          <Image
            src={`https://minio.tschudea.de:8999/images/products/${Object.values(newestProducts[0].specifications.attributes[0].images)[0]}`}
            alt={newestProducts[0].name}
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />

          <div className="absolute xl:bottom-6 xl:left-6 bottom-2 left-2 z-10 bg-white bg-opacity-70 p-3 rounded-md max-w-[70%]">
              <h2 className="text-black font-bold md:text-3xl text-sm">
                {newestProducts[0].name}
              </h2>

              <p className="text-black font-light text-sm xl:block hidden">
                Lorem ipsum dolor sit amet.
              </p>

              <Link
                href={`/home/products/product/${newestProducts[0].id}`}
                className="text-black underline text-lg md:block hidden"
              >
                Shop now
              </Link>
            </div>
        </div>
      ) : (
        <div className="relative bg-gray-300 lg:w-1/2 w-full aspect-square"></div>
      )}

      {/* RIGHT SIDE */}
      <div className="flex flex-col gap-3 lg:w-1/2 w-full">
        {newestProducts[1] ? (
          <div
            className="relative w-full aspect-2/1 cursor-pointer"
            onClick={() => router.push(`/home/products/product/${newestProducts[1].id}`)}
          >
            <Image
              src={`https://minio.tschudea.de:8999/images/products/${Object.values(newestProducts[1].specifications.attributes[0].images)[0]}`}
              alt={newestProducts[1].name}
              fill
              className="object-cover"
            />

            <div className="absolute xl:bottom-6 xl:left-6 bottom-2 left-2 z-10 bg-white bg-opacity-70 p-3 rounded-md max-w-[70%]">
              <h2 className="text-black font-bold md:text-3xl text-sm">
                {newestProducts[1].name}
              </h2>

              <p className="text-black font-light text-sm xl:block hidden">
                Lorem ipsum dolor sit amet.
              </p>

              <Link
                href={`/home/products/product/${newestProducts[1].id}`}
                className="text-black underline text-lg md:block hidden"
              >
                Shop now
              </Link>
            </div>
          </div>
        ) : (
          <div className="relative w-full aspect-2/1 bg-gray-300"></div>
        )}

        {/* BOTTOM GRID */}
        <div className="flex gap-3 w-full">
          {newestProducts[2] ? (
            <div
              className="relative w-1/2 aspect-square cursor-pointer"
              onClick={() =>
                router.push(`/home/products/product/${newestProducts[2].id}`)
              }
            >
              <Image
               src={`https://minio.tschudea.de:8999/images/products/${Object.values(newestProducts[2].specifications.attributes[0].images)[0]}`}
                alt={newestProducts[2].name}
                fill
                className="object-cover"
              />

              <div className="absolute xl:bottom-6 xl:left-6 bottom-2 left-2 z-10 bg-white bg-opacity-70 p-3 rounded-md max-w-[70%]">
              <h2 className="text-black font-bold md:text-3xl text-sm">
                {newestProducts[2].name}
              </h2>

              <p className="text-black font-light text-sm xl:block hidden">
                Lorem ipsum dolor sit amet.
              </p>

              <Link
                href={`/home/products/product/${newestProducts[2].id}`}
                className="text-black underline text-lg md:block hidden"
              >
                Shop now
              </Link>
            </div>
            </div>
          ) : (
            <div className="relative w-1/2 aspect-square bg-gray-300"></div>
          )}

          {newestProducts[3] ? (
            <div
              className="relative w-1/2 aspect-square cursor-pointer"
              onClick={() =>
                router.push(`/home/products/product/${newestProducts[3].id}`)
              }
            >
              <Image
                src={`https://minio.tschudea.de:8999/images/products/${Object.values(newestProducts[3].specifications.attributes[0].images)[0]}`}
                alt={newestProducts[3].name}
                fill
                className="object-cover"
              />

               <div className="absolute xl:bottom-6 xl:left-6 bottom-2 left-2 z-10 bg-white bg-opacity-70 p-3 rounded-md max-w-[70%]">
              <h2 className="text-black font-bold md:text-3xl text-sm">
                {newestProducts[3].name}
              </h2>

              <p className="text-black font-light text-sm xl:block hidden">
                Lorem ipsum dolor sit amet.
              </p>

              <Link
                href={`/home/products/product/${newestProducts[3].id}`}
                className="text-black underline text-lg md:block hidden"
              >
                Shop now
              </Link>
            </div>
            </div>
          ) : (
            <div className="relative w-1/2 aspect-square bg-gray-200"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export { NewArrivalList };
