-- Created by Redgate Data Modeler (https://datamodeler.redgate-platform.com)
-- Last modification date: 2026-02-14 02:23:11.241

-- 1.) Clear public schema
DO $$ DECLARE
    r RECORD;
BEGIN
    -- Löscht alle Tabellen in public Schema
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;


-- 2.) Clear all tables in public schema
-- DO
-- $$
-- DECLARE
--     r RECORD;
-- BEGIN
--     -- Für alle Tabellen im Schema public
--     FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
--         EXECUTE 'TRUNCATE TABLE public.' || quote_ident(r.tablename) || ' CASCADE;';
--     END LOOP;
-- END;
-- $$;

-- tables
-- Table: account
CREATE TABLE account (
    id text  NOT NULL,
    "accountId" text  NOT NULL,
    "providerId" text  NOT NULL,
    "userId" text  NOT NULL,
    "accessToken" text  NULL,
    "refreshToken" text  NULL,
    "idToken" text  NULL,
    "accessTokenExpiresAt" timestamptz  NULL,
    "refreshTokenExpiresAt" timestamptz  NULL,
    scope text  NULL,
    password text  NULL,
    "createdAt" timestamptz  NOT NULL DEFAULT now(),
    "updatedAt" timestamptz  NOT NULL DEFAULT now(),
    CONSTRAINT accounts_pk PRIMARY KEY (id)
);

-- Table: admins
CREATE TABLE admins (
    id text DEFAULT gen_random_uuid() NOT NULL,
    user_id text  NOT NULL,
    name text  NOT NULL,
    role text  NOT NULL,
    CONSTRAINT admins_pk PRIMARY KEY (id)
);

-- Table: categories
CREATE TABLE categories (
    id int  NOT NULL GENERATED ALWAYS AS IDENTITY,
    name text  NOT NULL,
    description text  NULL,
    CONSTRAINT categories_pk PRIMARY KEY (id)
);

-- Table: categories_products
CREATE TABLE categories_products (
    categories_id int  NOT NULL,
    products_id text  NOT NULL,
    CONSTRAINT categories_products_pk PRIMARY KEY (categories_id,products_id)
);

-- Table: companies
CREATE TABLE companies (
    id text DEFAULT gen_random_uuid() NOT NULL,
    owner_id text  NOT NULL,
    stripe_account_id text  NOT NULL,
    onboarding_started_at timestamptz  NOT NULL,
    onboarding_completed_at timestamptz  NULL,
    company_name text  NOT NULL,
    Certificate_of_Incorporation text  NULL,
    is_verified boolean  NOT NULL,
    approved_by text  NULL,
    email text  NOT NULL,
    phone_number text  NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    deleted_at timestamptz  NULL,
    founded_at date  NULL,
    website text  NULL,
    address text  NULL,
    linkedin_url text  NULL,
    head_of_company text  NULL,
    employee_count int  NULL,
    CONSTRAINT company_email UNIQUE (email) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT companies_pk PRIMARY KEY (id)
);

-- Table: customers
CREATE TABLE customers (
    id text  NOT NULL,
    name text  NOT NULL,
    address text  NOT NULL,
    profile_picture text  NULL,
    phone text  NULL,
    email text  NOT NULL,
    gender text  NOT NULL,
    city text  NOT NULL,
    region text  NOT NULL,
    postal_code text  NOT NULL,
    country text  NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT customer_email UNIQUE (email) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT customers_pk PRIMARY KEY (id)
);

-- Table: orders
CREATE TABLE orders (
    id text DEFAULT gen_random_uuid() NOT NULL,
    customers_id text  NOT NULL,
    order_date date  NOT NULL,
    shipped_date date  NULL,
    shipper text  NOT NULL,
    tracking_number text  NOT NULL,
    status text  NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT orders_pk PRIMARY KEY (id)
);

-- Table: orders_products
CREATE TABLE orders_products (
    products_id text  NOT NULL,
    orders_id text  NOT NULL,
    unit_price numeric(12,2)  NOT NULL,
    quantity int  NOT NULL,
    discount numeric(3,2)  NOT NULL,
    specifications jsonb  NOT NULL,
    CONSTRAINT orders_products_pk PRIMARY KEY (products_id,orders_id)
);

-- Table: products
CREATE TABLE products (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text  NOT NULL,
    currency varchar(3)  NOT NULL,
    specifications jsonb  NOT NULL,
    companies_id text  NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    isActive boolean  NOT NULL,
    CONSTRAINT products_pk PRIMARY KEY (id)
);

-- Table: reviews
CREATE TABLE reviews (
    id text DEFAULT gen_random_uuid() NOT NULL,
    products_id text  NOT NULL,
    customers_id text  NOT NULL,
    stars smallint  NOT NULL,
    comment text  NULL,
    report_points int DEFAULT 0 NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    reviewer_comment text  NULL,
    CONSTRAINT reviews_pk PRIMARY KEY (id)
);

-- Table: session
CREATE TABLE session (
    id text  NOT NULL,
    "expiresAt" timestamptz  NOT NULL,
    token text  NOT NULL,
    "createdAt" timestamptz  NOT NULL DEFAULT now(),
    "updatedAt" timestamptz  NOT NULL DEFAULT now(),
    "ipAddress" text  NULL,
    "userAgent" text  NULL,
    "userId" text  NOT NULL,
    CONSTRAINT ak_sessions_token UNIQUE (token) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT sessions_pk PRIMARY KEY (id)
);

CREATE INDEX idx_sessions_user_id on session ("userId" ASC);

-- Table: shopping_cart_products
CREATE TABLE shopping_cart_products (
    customers_id text  NOT NULL,
    products_id text  NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT shopping_cart_products_pk PRIMARY KEY (customers_id,products_id)
);

-- Table: transactions
CREATE TABLE transactions (
    id text DEFAULT gen_random_uuid() NOT NULL,
    customers_id text  NOT NULL,
    companies_id text  NOT NULL,
    amount numeric(12,2)  NOT NULL,
    currency varchar(3)  NOT NULL,
    isRefund boolean DEFAULT false NOT NULL,
    orders_id text  NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT transactions_pk PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE "user" (
    id text  NOT NULL,
    name text  NOT NULL,
    email text  NOT NULL,
    "emailVerified" boolean  NOT NULL DEFAULT false,
    image text  NULL,
    "createdAt" timestamptz  NOT NULL DEFAULT now(),
    "updatedAt" timestamptz  NOT NULL DEFAULT now(),
    CONSTRAINT ak_users_email UNIQUE (email) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

-- Table: verification
CREATE TABLE verification (
    id text  NOT NULL,
    identifier text  NOT NULL,
    value text  NOT NULL,
    "expiresAt" timestamptz  NOT NULL,
    "createdAt" timestamptz  NOT NULL DEFAULT now(),
    "updatedAt" timestamptz  NOT NULL DEFAULT now(),
    CONSTRAINT verifications_pk PRIMARY KEY (id)
);

CREATE INDEX idx_verifications_identifier on verification (identifier ASC);

-- foreign keys
-- Reference: Companies_user (table: companies)
ALTER TABLE companies ADD CONSTRAINT Companies_user
    FOREIGN KEY (owner_id)
    REFERENCES "user" (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Table_14_categories (table: categories_products)
ALTER TABLE categories_products ADD CONSTRAINT Table_14_categories
    FOREIGN KEY (categories_id)
    REFERENCES categories (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Table_14_products (table: categories_products)
ALTER TABLE categories_products ADD CONSTRAINT Table_14_products
    FOREIGN KEY (products_id)
    REFERENCES products (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Table_16_companies (table: transactions)
ALTER TABLE transactions ADD CONSTRAINT Table_16_companies
    FOREIGN KEY (companies_id)
    REFERENCES companies (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Table_16_customers (table: transactions)
ALTER TABLE transactions ADD CONSTRAINT Table_16_customers
    FOREIGN KEY (customers_id)
    REFERENCES customers (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: accounts_users (table: account)
ALTER TABLE account ADD CONSTRAINT accounts_users
    FOREIGN KEY ("userId")
    REFERENCES "user" (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: admins_user (table: admins)
ALTER TABLE admins ADD CONSTRAINT admins_user
    FOREIGN KEY (user_id)
    REFERENCES "user" (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: companies_admins (table: companies)
ALTER TABLE companies ADD CONSTRAINT companies_admins
    FOREIGN KEY (approved_by)
    REFERENCES admins (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: customers_user (table: customers)
ALTER TABLE customers ADD CONSTRAINT customers_user
    FOREIGN KEY (id)
    REFERENCES "user" (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: orders_customers (table: orders)
ALTER TABLE orders ADD CONSTRAINT orders_customers
    FOREIGN KEY (customers_id)
    REFERENCES customers (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: orders_products_orders (table: orders_products)
ALTER TABLE orders_products ADD CONSTRAINT orders_products_orders
    FOREIGN KEY (orders_id)
    REFERENCES orders (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: orders_products_products (table: orders_products)
ALTER TABLE orders_products ADD CONSTRAINT orders_products_products
    FOREIGN KEY (products_id)
    REFERENCES products (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: products_companies (table: products)
ALTER TABLE products ADD CONSTRAINT products_companies
    FOREIGN KEY (companies_id)
    REFERENCES companies (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: reviews_customers (table: reviews)
ALTER TABLE reviews ADD CONSTRAINT reviews_customers
    FOREIGN KEY (customers_id)
    REFERENCES customers (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: reviews_products (table: reviews)
ALTER TABLE reviews ADD CONSTRAINT reviews_products
    FOREIGN KEY (products_id)
    REFERENCES products (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: sessions_users (table: session)
ALTER TABLE session ADD CONSTRAINT sessions_users
    FOREIGN KEY ("userId")
    REFERENCES "user" (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: shopping_carts_products_customers (table: shopping_cart_products)
ALTER TABLE shopping_cart_products ADD CONSTRAINT shopping_carts_products_customers
    FOREIGN KEY (customers_id)
    REFERENCES customers (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: shopping_carts_products_products (table: shopping_cart_products)
ALTER TABLE shopping_cart_products ADD CONSTRAINT shopping_carts_products_products
    FOREIGN KEY (products_id)
    REFERENCES products (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: transactions_orders (table: transactions)
ALTER TABLE transactions ADD CONSTRAINT transactions_orders
    FOREIGN KEY (orders_id)
    REFERENCES orders (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of auto generated file.

--set indexes
--Indexes for Foreign Keys
CREATE INDEX idx_account_user_id ON account("userId");
CREATE INDEX idx_admins_user_id ON admins(user_id);
CREATE INDEX idx_companies_owner_id ON companies(owner_id);
CREATE INDEX idx_companies_approved_by ON companies(approved_by);
CREATE INDEX idx_categories_products_products_id ON categories_products(products_id);
CREATE INDEX idx_transactions_companies_id ON transactions(companies_id);
CREATE INDEX idx_transactions_customers_id ON transactions(customers_id);
CREATE INDEX idx_transactions_orders_id ON transactions(orders_id);
CREATE INDEX idx_customers_id_user_id ON customers(id);
CREATE INDEX idx_orders_customers_id ON orders(customers_id);
CREATE INDEX idx_orders_products_orders_id ON orders_products(orders_id);
CREATE INDEX idx_products_companies_id ON products(companies_id);
CREATE INDEX idx_reviews_customers_id ON reviews(customers_id);
CREATE INDEX idx_reviews_products_id ON reviews(products_id);
CREATE INDEX idx_shopping_cart_products_products_id ON shopping_cart_products(products_id);

-- customers filtering by location
CREATE INDEX idx_customers_country_city ON customers(country, city);
-- product name search (exact match)
CREATE INDEX idx_products_name ON products(name);
-- active products by company
CREATE INDEX idx_products_company_active ON products(companies_id, isActive);
-- category name lookups
CREATE UNIQUE INDEX idx_categories_name ON categories(name);
-- order status filtering
CREATE INDEX idx_orders_status ON orders(status);
-- order status filtering by customer
CREATE INDEX idx_orders_status_customers ON orders(customers_id,status);
-- order date range queries
CREATE INDEX idx_orders_order_date ON orders(order_date);
-- customer order history
CREATE INDEX idx_orders_customers_date 
ON orders(customers_id, order_date DESC);
-- transaction reporting
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_transactions_customer_date 
ON transactions(customers_id, created_at DESC);
CREATE INDEX idx_transactions_company_date 
ON transactions(companies_id, created_at DESC);
-- product reviews aggregation
CREATE INDEX idx_reviews_products_created_at 
ON reviews(products_id, created_at DESC);
-- rating filters
CREATE INDEX idx_reviews_products_stars 
ON reviews(products_id, stars);
-- fetch cart by customer
CREATE INDEX idx_shopping_cart_products_updated_at 
ON shopping_cart_products(customers_id, updated_at DESC);
--products in orders
CREATE INDEX idx_orders_products_products_id ON orders_products(products_id);
--partial products index
CREATE INDEX idx_products_active_only 
ON products(companies_id) 
WHERE isActive = true;

-- unique index so that customers cant leave two reviews on one product
CREATE UNIQUE INDEX ux_reviews_customer_product
ON reviews(customers_id, products_id);

-- checks
ALTER TABLE reviews
ADD CONSTRAINT reviews_stars_range CHECK (stars BETWEEN 1 AND 5);
ALTER TABLE orders_products
ADD CONSTRAINT quantity_positive CHECK (quantity > 0);
ALTER TABLE transactions
ADD CONSTRAINT amount_positive CHECK (amount >= 0);
ALTER TABLE orders_products
ADD CONSTRAINT unit_price_positive CHECK (unit_price >= 0);
ALTER TABLE orders
ADD CONSTRAINT status_check CHECK (status IN ('pending','paid','shipped','delivered','cancelled','refunded'));
ALTER TABLE admins
ADD CONSTRAINT role_check CHECK (role IN ('admin','editor','reviewer'));

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_shopping_cart_products_updated_at
BEFORE UPDATE ON shopping_cart_products
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_reviews_updated_at
BEFORE UPDATE ON reviews
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_customers_updated_at
BEFORE UPDATE ON customers
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_companies_updated_at
BEFORE UPDATE ON companies
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

--docker compose down -v
--docker compose up -d
--run sql script in dbeaver (after restarting that connection as well)
--npx prisma db pull
--npx prisma generate