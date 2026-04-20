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
	specifications: JsonValue;
};
type productType = {
	id: string;
	name: string;
	category: number;
	reviews: { id: string; stars: number }[];
	_count: { reviews: number };
};

type productWithStatsType = {
	id: string;
	name: string;
	currency: string;
	base_price: Decimal;
	reviews: { id: string; stars: number }[];
	specifications: JsonValue;
	_count: { reviews: number };
	avgStars?: number;
	created_at?: Date;
	isactive?: boolean;
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
};

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
};

type CategoryType = {
	name: string;
	id: number;
	description: string | null;
};

type Companyinfos = {
	email: string;
	address: string | null;
	id: string;
	owner_id: string;
	stripe_account_id: string;
	onboarding_started_at: Date;
	onboarding_completed_at: Date | null;
	company_name: string;
	certificate_of_incorporation: string | null;
	is_verified: boolean;
	approved_by: string | null;
	phone_number: string;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | null;
	founded_at: Date | null;
	website: string | null;
	linkedin_url: string | null;
	head_of_company: string | null;
	employee_count: number | null;
};

type PersonalInformation = {
	id: string;
	name: string;
	address: string | null;
	profile_picture: string | null;
	phone: string | null;
	email: string;
	gender: string;
	city: string | null;
	region: string | null;
	postal_code: string | null;
	country: string | null;
	created_at: Date;
	updated_at: Date;
};

type productsForCompanyType = {
	id: string;
	name: string;
	currency: string;
	base_price: Decimal;
	reviews: { id: string; stars: number }[];
	specifications: JsonValue;
	_count: { reviews: number };
	avgStars?: number;
	created_at: Date;
	isactive: boolean;
	categories_products: {
		categories_id: number;
	}[];
};

type allProductsType = {
	categories_products: {
		categories: {
			id: number;
		};
	}[];
	reviews: {
		id: string;
		created_at: Date;
		updated_at: Date;
		products_id: string;
		customers_id: string;
		stars: number;
		comment: string | null;
		report_points: number;
		reviewer_comment: string | null;
	}[];
	_count: {
		reviews: number;
	};
} & {
	id: string;
	name: string;
	base_price: Decimal;
	currency: string;
	short_description: string;
	long_description: string;
	specifications: JsonValue;
	companies_id: string;
	created_at: Date;
	updated_at: Date;
	isactive: boolean;
	avgStars?: number;
};

type companyType = {
	_count: {
		products: number;
	};
} & {
	id: string;
	owner_id: string;
	stripe_account_id: string;
	onboarding_started_at: Date;
	onboarding_completed_at: Date | null;
	company_name: string;
	certificate_of_incorporation: string | null;
	is_verified: boolean;
	approved_by: string | null;
	email: string;
	phone_number: string;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | null;
	founded_at: Date | null;
	website: string | null;
	address: string | null;
	linkedin_url: string | null;
	head_of_company: string | null;
	employee_count: number | null;
};

type cartItemsWithAvgStars = {
	products: {
		reviews: {
			id: string;
			stars: number;
		}[];
		_count: {
			reviews: number;
		};
	} & {
		name: string;
		id: string;
		created_at: Date;
		updated_at: Date;
		base_price: Decimal;
		currency: string;
		short_description: string;
		long_description: string;
		specifications: JsonValue;
		companies_id: string;
		isactive: boolean;
		avgStars?: number;
	};
} & {
	products_id: string;
	customers_id: string;
	updated_at: Date;
	product_variant: number;
	quantity: number;
};

type orderType = {
	orders_products: ({
		products: {
			name: string;
		};
	} & {
		specifications: JsonValue;
		products_id: string;
		orders_id: string;
		product_variant: number;
		unit_price: Decimal;
		quantity: number;
		discount: Decimal;
	})[];
} & {
	id: string;
	customers_id: string;
	order_date: Date;
	shipped_date: Date | null;
	shipper: string;
	tracking_number: string;
	status: string;
	shipped_to: string;
	created_at: Date;
	updated_at: Date;
};
