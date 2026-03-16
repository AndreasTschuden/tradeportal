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
  category : number;
  reviews: { id: string; stars: number }[];
  _count: { reviews: number };
};

type productWithStatsType = {
  id: string;
  name: string;
  currency : string;
  base_price: Decimal;
  reviews: { id: string; stars: number }[];
  specifications : JsonValue;
  _count: { reviews: number };
  avgStars?: number;
};

type detailedProductType = {
   id: string;
    categories_products: {
        categories: {
            id: number;
        };
    }[];
    reviews: {
        id: string;
        stars: number;
    }[];
    name: string;
    _count: {
        reviews: number;
    };
    base_price: Decimal;
    currency: string;
    short_description: string;
    long_description: string;
    specifications: JsonValue;
    companies: {
        id: string;
        address: string | null;
        company_name: string;
    };
  avgStars?: number;
}

type ReviewType = {
    id: string;
    products_id: string;
    customers_id: string;
    stars: number;
    comment: string | null;
    report_points: number;
    created_at: Date;
    updated_at: Date;
    reviewer_comment: string | null;
    customers: {
        name: string;
    };
}

type CategoryType = {
   name: string;
    id: number;
    description: string | null;
}