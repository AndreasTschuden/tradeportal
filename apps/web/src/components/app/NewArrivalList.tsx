"use client";
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
      <div className="relative bg-black lg:w-1/2 w-full aspect-square" onClick={() => router.push(`/home/product/${newestProducts[0].id}`)}>
          <div className="absolute xl:bottom-6 xl:left-6 bottom-2 left-2">
          <h2 className="text-white font-bold md:text-3xl text-sm">
            {newestProducts[0].name}
          </h2>
          <p className="text-white font-extralight max-w-2/3 xl:block hidden">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut
          </p>
          <Link
            href={`/home/product/${newestProducts[0].id}`}
            className="text-white underline text-xl md:block hidden"
          >
            Shop now
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:w-1/2 w-full">
        <div className="relative w-full aspect-2/1 bg-black" onClick={() => router.push(`/home/product/${newestProducts[1].id}`)}>
          <div className="absolute xl:bottom-6 xl:left-6 bottom-2 left-2">
            <h2 className="text-white font-bold md:text-3xl text-sm">
              {newestProducts[1].name}
            </h2>
            <p className="text-white font-extralight max-w-2/3 xl:block hidden">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut
            </p>
            <Link
              href={`/home/product/${newestProducts[1].id}`}
              className="text-white underline text-xl md:block hidden"
            >
              Shop now
            </Link>
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <div className="relative w-1/2 aspect-square bg-black" onClick={() => router.push(`/home/product/${newestProducts[2].id}`)}>
            <div className="absolute xl:bottom-6 xl:left-6 bottom-2 left-2">
              <h2 className="text-white font-bold md:text-3xl text-sm">
                {newestProducts[2].name}
              </h2>
              <p className="text-white font-extralight xl:block hidden">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr
              </p>
              <Link
                href={`/home/product/${newestProducts[2].id}`}
                className="text-white underline text-xl md:block hidden"
              >
                Shop now
              </Link>
            </div>
          </div>
          <div className="relative w-1/2 aspect-square bg-black" onClick={() => router.push(`/home/product/${newestProducts[3].id}`)}>
            <div className="absolute xl:bottom-6 xl:left-6 bottom-2 left-2">
              <h2 className="text-white font-bold md:text-3xl text-sm">
                {newestProducts[3].name}
              </h2>
              <p className="text-white font-extralight xl:block hidden">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr
              </p>
              <Link
                href={`/home/product/${newestProducts[3].id}`}
                className="text-white underline text-xl md:block hidden"
              >
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { NewArrivalList };
