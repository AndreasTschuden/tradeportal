import { availableMemory } from "process";
import * as z from "zod"; //pnpm install zod

export type SignInFormData = z.infer<typeof signinUser>;
export type SignUpFormData = z.infer<typeof signupUser>;
export type SignUpCompanyFormData = z.infer<typeof signupCompany>;
export type createMinioUrlFormData = z.infer<typeof createMinioUrl>;

const forbidden =
  /^(?!.*(?:Fuck|Motherfucker|Cunt|Gash|Japs eye|Punani|Pussy hole|Cocksucker|Cum|Nonce|Prickteaser|Raped|Slut|Ching Chong|Chinky|Coon|Darky|Gippo|Golliwog|Golly|Half-caste|Jungle Bunny|Kike|Negro|Nigga|Nigger|Nig-nog|Paki|Pikey|Raghead|Sambo|Spade|Spic|Uncle Tom|Wog|Yid|Batty Boy|Butt Bandit|Chick with a Dick|Dyke|Faggot|Fudge Packer|Gender Bender|He-She|Muff Diver|Rugmuncher|Shemale|Shirt Lifter|Tranny|Kike|Yid|Cripple|Mong|Retard|Schizo|Spastic|Window Licker|Behnchod|Chooray|Chamaar|Habshi|habshan|Machod)).*/i;
// courtesy of ofcom: https://www.ofcom.org.uk/siteassets/resources/documents/research-and-data/tv-radio-and-on-demand-research/tv-research/offensive-language-quick-reference-guide.pdf?msclkid=02d6a4f0c17211ecbdb00c07c1588af4&v=326908 - is false if contains

const passwd =
  /^(?:(?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))(?!.*(.)\1{2,})[A-Za-z0-9!~<>,;:_=?*+#."&§%°()\|\[\]\-\$\^\@\/]{12,128}$/;
// 12 to 128 character password requiring at least 3 out 4 (uppercase and lowercase letters, numbers and special characters) and no more than 2 equal characters in a row
export const signupUser = z
  .object({
    email: z.email("Email is not valid"),

    firstname: z
      .string()
      .min(4, "The firstname must be at least 4 chars long")
      .max(16, "The firstname cant be longer than 16 chars")
      .regex(forbidden, "The name contains profanities"),

    lastname: z
      .string()
      .min(4, "The lastname must be at least 4 chars long")
      .max(16, "The lastname cant be longer than 16 chars")
      .regex(forbidden, "The name contains profanities"),

    password: z
      .string()
      .regex(
        passwd,
        "Password must be: 12–128 Chars & must have ≥3 out of 4: upper-/lowercase, number, special chars & max 2 of the same chars in a row.",
      ),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .max(100, "Address is too long")
      .optional(),

    phone: z
      .string()
      .min(6, "Phone number is too short")
      .max(25, "Phone number is too long")
      .regex(/^[0-9+()\-\s]+$/, "Phone number is not valid")
      .optional(),

    gender: z
      .union([z.literal("male"), z.literal("female"), z.literal("diverse")])
      .refine((val) => !!val, {
        message: "Please select a gender",
      })
      .optional(),

    city: z
      .string()
      .min(2, "City must be at least 2 characters")
      .max(50, "City is too long")
      .optional(),

    region: z
      .string()
      .min(2, "Region must be at least 2 characters")
      .max(50, "Region is too long")
      .optional(),

    postal_code: z
      .string()
      .min(3, "Postal code is too short")
      .max(12, "Postal code is too long")
      .regex(/^[A-Za-z0-9\s\-]+$/, "Postal code format is not valid")
      .optional(),

    country: z
      .string()
      .min(2, "Country must be at least 2 characters")
      .max(56, "Country is too long")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords don't match",
      });
    }
  });

export const signinUser = z.object({
  email: z.email("Email is not valid"),
  password: z.string().min(1, "Password is required"),
});

export const signupCompany = z
  .object({
    company_name: z
      .string()
      .min(4, "The Company Name must be at least 4 chars long")
      .max(16, "The Company Name cant be longer than 16 chars")
      .regex(forbidden, "The Company name contains profanities"),
    email: z.string().email("Email is not valid"),
    phone: z
      .string()
      .min(6, "Phone number is too short")
      .max(25, "Phone number is too long")
      .regex(/^[0-9+()\-\s]+$/, "Phone number is not valid"),
    password: z
      .string()
      .regex(
        passwd,
        "Password must be: 12–128 Chars & must have ≥3 out of 4: upper-/lowercase, number, special chars & max 2 of the same chars in a row.",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords don't match",
      });
    }
  });

export const attributeSchema = z.object({
  name: z.string().min(1, "Jede Option benötigt einen Namen"),
  values: z
    .array(z.string().min(1, "Jeder Wert muss mindestens 1 Zeichen haben"))
    .min(1, "Jede Option muss mindestens einen Wert haben"),
  images: z
    .record(z.string(), z.union([z.instanceof(File), z.string()]))
    .optional(),
});

export const variantsSchema = z
  .object({
    available: z.boolean(),
    priceModifier: z.coerce
      .number()
      .min(0, "Der Preis Modifizierer muss => 0 sein")
      .max(10, "Der Preis Modifizierer muss => 10 sein"),
  })
  .catchall(z.string());

export const publishProductSchema = z.object({
  title: z.string().min(5, "Titel muss mind 5 zeichen haben"),
  basePrice: z.coerce.number().min(0, "Basispreis muss =< 0 sein"),
  currency: z.enum(["EUR", "USD"], { error: "Ungültige Währung (EUR, USD)." }),
  shortDescription: z
    .string()
    .min(100, "short Description must be atleast 100 chars long"),
  longDescription: z
    .string()
    .min(200, "long Description must be atleast 200 chars long"),
  category: z.coerce.number(),
  attributes: z
    .array(attributeSchema)
    .min(1, "Mindestend 1 Option erforderlich"),
  variants: z.array(variantsSchema).min(1, "Generate all variants"),
});

export const fixedProductSchema = z.object({
  title: z.string().min(5, "Titel muss mind 5 zeichen haben"),
  basePrice: z.number().min(0, "Basispreis muss =< 0 sein"),
  currency: z.enum(["EUR", "USD"], { error: "Ungültige Währung (EUR, USD)." }),
  category: z.coerce.number(),
  shortDescription: z
    .string()
    .min(100, "short Description must be atleast 100 chars long"),
  longDescription: z
    .string()
    .min(200, "long Description must be atleast 200 chars long"),
});

export const createMinioUrl = z
  .array(
    z.object({
      name: z
        .string()
        .min(1, "The picture must have a name")
        .regex(forbidden, "Picture name contains profanities")
        .refine((str) => !str.includes("/"), {
          error: "Picture name must not include a /",
        }),
      folder: z.enum(
        ["products", "profile"],
        "The folder must match: products | profile",
      ),
    }),
  )
  .min(1, "There must be at least one picture to upload");

export const companySchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().optional(),
  head: z.string().optional(),
  employees: z.string().optional(),
  founded: z.string().optional(),
});

export type CompanyForm = z.infer<typeof companySchema>;

const optionalUrl = z.preprocess(
  (val) => (val === "" ? undefined : val),
  z
    .url()
    .optional()
    .refine((val) => !val || val.startsWith("https://"), {
      message: "Muss mit https:// beginnen",
    }),
);

export const additionalInfoSchema = z.object({
  website: optionalUrl,
  linked_in: optionalUrl,
});

export type additionalInfoType = z.infer<typeof additionalInfoSchema>;

export const changePasswordSchema = z
  .object({
    current_password: z
      .string()
      .regex(
        passwd,
        "Password must be: 12–128 Chars & must have ≥3 out of 4: upper-/lowercase, number, special chars & max 2 of the same chars in a row.",
      ),
    new_password: z
      .string()
      .regex(
        passwd,
        "Password must be: 12–128 Chars & must have ≥3 out of 4: upper-/lowercase, number, special chars & max 2 of the same chars in a row.",
      ),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .superRefine((data, ctx) => {
    if (data.new_password !== data.confirm_password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirm_password"],
        message: "Passwords don't match",
      });
    }
  });

export type changePasswordType = z.infer<typeof changePasswordSchema>;

export const personalInformationSchema = z.object({
  firstname: z
    .string()
    .min(4, "The firstname must be at least 4 chars long")
    .max(16, "The firstname cant be longer than 16 chars")
    .regex(forbidden, "The name contains profanities"),

  lastname: z
    .string()
    .min(4, "The lastname must be at least 4 chars long")
    .max(16, "The lastname cant be longer than 16 chars")
    .regex(forbidden, "The name contains profanities"),
  email: z.email(),
  phone: z
    .string()
    .min(6, "Phone number is too short")
    .max(25, "Phone number is too long")
    .regex(/^[0-9+()\-\s]+$/, "Phone number is not valid")
    .optional(),
  gender: z.string().regex(forbidden, "The name contains profanities").min(1, "Required"),
});

export type personalInformationType = z.infer<typeof personalInformationSchema>

export const billingAddressSchema = z.object({
  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .optional()
    .or(z.literal("")),

  postal_code: z
    .string()
    .trim()
    .min(1, "Postal code is required")
    .optional()
    .or(z.literal("")),

  region: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  country: z
    .string()
    .trim()
    .min(1, "Country is required")
    .optional()
    .or(z.literal("")),
});

export type billingAddressType = z.infer<typeof billingAddressSchema>


export const variantOptionSchema = z.object({
  options: z
    .array(
      z.object({
        value: z.string().min(1, "Bitte auswählen")
      })
    )
    .min(1, "Mindestens ein Select erforderlich")
});

export type variantOptionType = z.infer<typeof variantOptionSchema>;