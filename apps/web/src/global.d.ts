declare module "*.css";

type Attribute = {
  name: string;
  values: string[];
  images?: Record<string, File> | undefined;
};

type VariantBase = Record<string, string>;

type Variant = VariantBase & {
  available: boolean;
  priceModifier: number;
};

type newestProductsType = {
  id: string;
  name: string;
  specifications : JsonValue;
};
type productType = {
  id: string;
  name: string;
  reviews: { id: string; stars: number }[];
  _count: { reviews: number };
};

type productWithStatsType = {
  id: string;
  name: string;
  currency : string;
  reviews: { id: string; stars: number }[];
  specifications : JsonValue;
  _count: { reviews: number };
  avgStars?: number;
};
