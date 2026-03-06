"use client";

import { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { publishProductSchema, fixedProductSchema } from "@/lib/zod";
import { publishProduct } from "@/app/actions/company";

type ProductFormValues = z.infer<typeof fixedProductSchema>;

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(fixedProductSchema),
  });

  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [finalJSON, setFinalJSON] = useState<string | null>(null);
  const [zodErrors, setZodErrors] = useState<Record<string, string>>({});
  const [images, setImages] = useState<string[]>([]);
  const [serverErrors, setServerErrors] = useState<string>("");

  const addAttribute = () => {
    setAttributes([...attributes, { name: "", values: [], images: undefined }]);
  };

  const updateAttributeName = (index: number, name: string) => {
    const newAttr = [...attributes];
    newAttr[index].name = name;
    setAttributes(newAttr);

    const newZodErr = { ...zodErrors };
    if (newZodErr.attributes !== "") {
      newZodErr.attributes = "";
      setZodErrors(newZodErr);
    }
  };

  const updateAttributeValues = (index: number, values: string) => {
    const newAttr = [...attributes];
    newAttr[index].values = values.split(",").map((v) => v.trim());
    setAttributes(newAttr);

    const newZodErr = { ...zodErrors };
    if (newZodErr.attributes !== "") {
      newZodErr.attributes = "";
      setZodErrors(newZodErr);
    }
  };

  const updateAttributeImage = (index: number, value: string, file: File) => {
    if (index !== 0) return;
    const newAttr = [...attributes];
    newAttr[index].images = {
      ...newAttr[index].images,
      [value]: file,
    };
    setAttributes(newAttr);
  };

  const generateVariants = () => {
    const newZodErr = { ...zodErrors };
    if (newZodErr.variants === "") {
      newZodErr.variants = "";
      setZodErrors(newZodErr);
    }

    const combinations = attributes.reduce<VariantBase[]>((acc, attr) => {
      if (acc.length === 0) {
        return attr.values.map((v) => ({
          [attr.name]: v,
        }));
      }

      return acc.flatMap((a) =>
        attr.values.map((v) => ({
          ...a,
          [attr.name]: v,
        })),
      );
    }, []);

    const fullVariants: any = combinations.map((v) => ({
      ...v,
      available: true,
      priceModifier: 1,
    }));

    setVariants(fullVariants);
    setFinalJSON(null);
  };

  const toggleAvailable = (index: number) => {
    const newVariants = [...variants];
    newVariants[index].available = !newVariants[index].available;
    setVariants(newVariants);
  };

  const updatePriceModifier = (index: number, value: number) => {
    const newVariants = [...variants];
    newVariants[index].priceModifier = value || 1;
    setVariants(newVariants);

    const newZodErr = { ...zodErrors };
    if (newZodErr.variants !== "") {
      newZodErr.variants = "";
      setZodErrors(newZodErr);
    }
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    value: string,
  ) => {
    if (e.target.files && e.target.files[0]) {
      updateAttributeImage(index, value, e.target.files[0]);
      const uploadedImages = attributes[0].images;
      if (uploadedImages) {
        const imageUrlArray = Object.values(uploadedImages).map((value) => {
          return URL.createObjectURL(value);
        });
        setImages(imageUrlArray);
      }

      console.log(e.target.files[0]);
    }
  };  

  const onSubmit = async (data: ProductFormValues) => {
    const json = {
      title: data.title,
      basePrice: data.basePrice,
      currency: data.currency,
      attributes: attributes.map((a, i) => ({
        name: a.name,
        values: a.values,
        images: i === 0 ? a.images : undefined,
      })),
      variants,
    };
    const result = publishProductSchema.safeParse(json);

    if (!result.success) {
      const messages = result.error.issues.reduce(
        (acc, iss) => {
          acc[iss.path[0] as string] = iss.message;
          return acc;
        },
        {} as Record<string, string>,
      );
      setZodErrors(messages);
      console.log(json);
      return;
    }

    try {
      await publishProduct(json);
      setFinalJSON(JSON.stringify(json, null, 2));
    } catch (e) {
      if (e instanceof Error) {
        setServerErrors(e.message);
      } else {
        console.log("Unbekannter Fehler", e);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-400 mx-auto xl:h-[calc(100vh-2rem)] flex flex-col xl:flex-row gap-6">
          {/* ================= LEFT SIDE ================= */}
          <div className="flex-1 flex flex-col gap-6 overflow-hidden">
            {/* ---------- FORM CARD ---------- */}
            <div className="bg-white rounded-2xl shadow-xl border p-6">
              <h1 className="text-2xl font-bold mb-6">Produkt erstellen</h1>
              <div className="overflow-y-auto bg-white max-h-[60vh]">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block mb-1 font-medium">
                      Produktname
                    </label>
                    <input
                      {...register("title")}
                      className="w-full border rounded-md p-2"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Basispreis</label>
                    <input
                      type="number"
                      {...register("basePrice", { valueAsNumber: true })}
                      className="w-full border rounded-md p-2"
                    />
                    {errors.basePrice && (
                      <p className="text-red-500 text-sm">
                        {errors.basePrice.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Currency</label>
                    <input
                      type="text"
                      {...register("currency")}
                      className="w-full border rounded-md p-2"
                    />
                    {errors.currency && (
                      <p className="text-red-500 text-sm">
                        {errors.currency.message}
                      </p>
                    )}
                  </div>

                  {attributes.map((attr, i) => (
                    <div
                      key={i}
                      className="p-4 border rounded-xl bg-gray-50 space-y-3"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        <input
                          placeholder="Attributname"
                          value={attr.name}
                          onChange={(e) =>
                            updateAttributeName(i, e.target.value)
                          }
                          className="flex-1 border rounded-md p-2"
                        />
                        <input
                          placeholder="Werte (kommagetrennt)"
                          value={attr.values.join(",")}
                          onChange={(e) =>
                            updateAttributeValues(i, e.target.value)
                          }
                          className="flex-1 border rounded-md p-2"
                        />
                      </div>

                      {i === 0 && attr.values.length > 0 && (
                        <div className="flex flex-wrap gap-4">
                          {attr.values.map((val, idx) => (
                            <div key={idx}>
                              <label className="text-sm block mb-1">
                                {val} Bild
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, i, val)}
                                className="text-sm"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {zodErrors.attributes && (
                    <p className="text-red-500">{zodErrors.attributes}</p>
                  )}
                  <div className="flex gap-4 flex-wrap">
                    <button
                      type="button"
                      onClick={addAttribute}
                      className="px-4 py-2 bg-green-600 text-white rounded-md"
                    >
                      Neues Attribut hinzufügen
                    </button>
                    <button
                      type="button"
                      onClick={generateVariants}
                      className="px-4 py-2 bg-black text-white rounded-md"
                    >
                      Weiter
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-black text-white rounded-md"
                    >
                      Publish
                    </button>

                    {serverErrors && (
                      <p className="text-red-500">{serverErrors}</p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* ---------- IMAGE CARD ---------- */}
            <div className="bg-white rounded-2xl shadow-xl border p-6 flex-1 overflow-auto">
              <h1 className="text-2xl font-bold mb-4">Bilder</h1>

              {images && images.length > 0 ? (
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square overflow-hidden rounded-xl border bg-gray-50"
                    >
                      <img
                        src={image}
                        alt={`Bild ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Keine Bilder vorhanden</p>
              )}
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="w-full xl:w-150 bg-white rounded-2xl shadow-xl border p-6 flex flex-col overflow-hidden">
            <h1 className="text-2xl font-bold mb-6">Varianten</h1>

            {variants.length > 0 ? (
              <div className="flex-1 overflow-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200 text-left">
                      <th className="p-2 border"></th>
                      {attributes.map((a, i) => (
                        <th key={i} className="p-2 border">
                          {a.name}
                        </th>
                      ))}
                      <th className="p-2 border">Price Modifier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {variants.map((v, i) => (
                      <tr key={i}>
                        <td className="p-2 border w-1">
                          <input
                            type="checkbox"
                            checked={v.available}
                            onChange={() => toggleAvailable(i)}
                            className="
                          w-5 h-5
                          rounded-md
                          border-2 border-gray-300
                          text-green-600
                          focus:ring-2 focus:ring-green-500
                          focus:ring-offset-1
                          cursor-pointer
                        "
                          />
                        </td>

                        {attributes.map((a, j) => (
                          <td key={j} className="p-2 border">
                            {v[a.name]}
                          </td>
                        ))}

                        <td className="p-2 border">
                          <input
                            type="number"
                            step="0.01"
                            min={0}
                            value={v.priceModifier}
                            className="w-20 border rounded-md p-1"
                            onChange={(e) =>
                              updatePriceModifier(i, Number(e.target.value))
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center border rounded-xl">
                <p>Keine Varianten generiert</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
