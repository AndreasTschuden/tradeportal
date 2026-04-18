"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getCategories } from "@/actions/categories";
import { toast } from "sonner";

type Categories = {
  id: number;
  name: string;
  description: string | null;
}[];

const SubNav = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All Categories");
  const [categories, setCategories] = useState<Categories>();

  useEffect(() => {
    const getResponse = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error: unknown) {
        toast.error("Error while getting categories");
        setCategories([]);
      }
    };

    getResponse();
  }, []);

  const handeClick = (id: number) => {
    setOpen(false);
    router.push(`/home/products/?category=${id}`);
  };

  const router = useRouter();

  return (
    <nav className="bg-red-700 min-h-[5vh] py-2 h-full w-full md:px-30 px-5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <div className="relative">
          {/* Trigger */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 text-white"
          >
            <Menu className="text-white" />
            <span className="text-sm font-normal">{selected}</span>
          </button>

          {/* Dropdown */}
          {open && categories != undefined && (
            <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden z-50 grid grid-cols-2 gap-2 w-96">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handeClick(cat.id)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <Link href="home/products" className="text-white font-normal text-sm">
            Products
          </Link>
        </div>
      </div>
      <div className="lg:block hidden">
        <div className="flex md:gap-4">
          <button
            type="button"
            className="text-white font-normal text-sm"
            onClick={() =>
              document
                .getElementById("new-arrival-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            New Arrival
          </button>
          <button
            type="button"
            className="text-white font-normal text-sm"
            onClick={() =>
              document
                .getElementById("explore-products-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Products
          </button>
          <button
            type="button"
            className="text-white font-normal text-sm"
            onClick={() =>
              document
                .getElementById("gurantees-section")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Guarantees
          </button>
        </div>
      </div>
    </nav>
  );
};

export { SubNav };
