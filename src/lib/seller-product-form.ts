import type {
  CreateSellerProductPayload,
  ProductAvailabilityStatus,
  SellerProduct,
  UpdateSellerProductPayload,
} from "@/lib/api/seller-products-api";

/* =========================================
   TYPES
========================================= */

export interface ProductSpecificationRow {
  id: string;
  key: string;
  label: string;
  value: string;
  unit: string;
  is_highlight: boolean;
}

export interface ProductImageItem {
  id: string;
  url: string;
  name: string;
  // From /uploads; missing for images that were not uploaded through it.
  fileId?: string;
  isPrimary: boolean;
}

/* Numbers are kept as strings while editing so inputs can be empty. */
export interface ProductFormState {
  name: string;
  category_id: number | null;
  short_description: string;
  description: string;
  sku: string;
  model_number: string;
  brand: string;
  hsn_code: string;

  product_type: string;
  application_usage: string;
  cooling_capacity: string;
  cooling_capacity_unit: string;
  power_motor: string;
  voltage_frequency: string;
  material: string;
  dimensions: string;
  weight: string;
  weight_unit: string;
  color_finish: string;

  price: string;
  min_price: string;
  max_price: string;
  currency: string;
  price_unit: string;
  moq: string;
  moq_unit: string;
  stock_quantity: string;
  stock_unit: string;
  availability_status: ProductAvailabilityStatus;

  specifications: ProductSpecificationRow[];
  // One highlight per line.
  highlights: string;
  // Comma separated.
  available_colors: string;
  // Comma separated.
  tags: string;

  video_url: string;
  catalogue_url: string;
}

export type ProductFieldChangeHandler = <K extends keyof ProductFormState>(
  field: K,
  value: ProductFormState[K],
) => void;

type TextField = {
  [K in keyof ProductFormState]: ProductFormState[K] extends string ? K : never;
}[keyof ProductFormState];

/* Fields edited through a plain text input. */
export type ProductTextField = Exclude<TextField, "availability_status">;

/* =========================================
   CONSTANTS
========================================= */

export const MAX_PRODUCT_IMAGES = 10;

export const initialProductForm: ProductFormState = {
  name: "",
  category_id: null,
  short_description: "",
  description: "",
  sku: "",
  model_number: "",
  brand: "",
  hsn_code: "",

  product_type: "",
  application_usage: "",
  cooling_capacity: "",
  cooling_capacity_unit: "CMH",
  power_motor: "",
  voltage_frequency: "",
  material: "",
  dimensions: "",
  weight: "",
  weight_unit: "Kg",
  color_finish: "",

  price: "",
  min_price: "",
  max_price: "",
  currency: "INR",
  price_unit: "Unit",
  moq: "",
  moq_unit: "Unit",
  stock_quantity: "",
  stock_unit: "Unit",
  availability_status: "IN_STOCK",

  specifications: [],
  highlights: "",
  available_colors: "",
  tags: "",

  video_url: "",
  catalogue_url: "",
};

/* Optional text fields: omitted on create, sent as null on update when blank. */
const OPTIONAL_TEXT_FIELDS = [
  "short_description",
  "description",
  "sku",
  "model_number",
  "brand",
  "hsn_code",
  "product_type",
  "application_usage",
  "cooling_capacity",
  "power_motor",
  "voltage_frequency",
  "material",
  "dimensions",
  "color_finish",
  "video_url",
  "catalogue_url",
] as const satisfies readonly TextField[];

/* Short text fields limited to 255 chars by the backend. */
const SHORT_TEXT_FIELDS = [
  ["sku", "SKU"],
  ["model_number", "Model number"],
  ["brand", "Brand"],
  ["hsn_code", "HSN code"],
  ["product_type", "Product type"],
  ["application_usage", "Application / usage"],
  ["cooling_capacity", "Cooling capacity"],
  ["power_motor", "Power / motor"],
  ["voltage_frequency", "Voltage / frequency"],
  ["material", "Material"],
  ["dimensions", "Dimensions"],
  ["color_finish", "Color / finish"],
] as const satisfies ReadonlyArray<readonly [TextField, string]>;

/* =========================================
   HELPERS
========================================= */

let idCounter = 0;

export function createId(prefix: string) {
  idCounter += 1;

  return `${prefix}-${Date.now()}-${idCounter}`;
}

export function toSpecificationKey(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function createSpecificationRow(values: Partial<ProductSpecificationRow> = {}): ProductSpecificationRow {
  return {
    id: createId("spec"),
    key: toSpecificationKey(values.label ?? ""),
    label: "",
    value: "",
    unit: "",
    is_highlight: false,
    ...values,
  };
}

function splitList(value: string, separator: RegExp) {
  return Array.from(
    new Set(
      value
        .split(separator)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

function getHighlights(form: ProductFormState) {
  return splitList(form.highlights, /\r?\n/);
}

function getColors(form: ProductFormState) {
  return splitList(form.available_colors, /,/);
}

function getTags(form: ProductFormState) {
  return splitList(form.tags, /,/);
}

function getFilledSpecifications(form: ProductFormState) {
  return form.specifications.filter((row) => row.label.trim() || row.value.trim() || row.unit.trim());
}

function toNumber(value: string) {
  return value.trim() === "" ? undefined : Number(value);
}

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function fromProduct(product: SellerProduct): ProductFormState {
  const text = (value: string | number | null | undefined, fallback = "") =>
    value === null || value === undefined ? fallback : String(value);

  return {
    name: product.name,
    category_id: product.category_id,
    short_description: text(product.short_description),
    description: text(product.description),
    sku: text(product.sku),
    model_number: text(product.model_number),
    brand: text(product.brand),
    hsn_code: text(product.hsn_code),

    product_type: text(product.product_type),
    application_usage: text(product.application_usage),
    cooling_capacity: text(product.cooling_capacity),
    cooling_capacity_unit: text(product.cooling_capacity_unit, "CMH"),
    power_motor: text(product.power_motor),
    voltage_frequency: text(product.voltage_frequency),
    material: text(product.material),
    dimensions: text(product.dimensions),
    weight: text(product.weight),
    weight_unit: text(product.weight_unit, "Kg"),
    color_finish: text(product.color_finish),

    price: text(product.price),
    min_price: text(product.min_price),
    max_price: text(product.max_price),
    currency: product.currency || "INR",
    price_unit: text(product.price_unit, "Unit"),
    moq: text(product.moq),
    moq_unit: text(product.moq_unit, "Unit"),
    stock_quantity: text(product.stock_quantity),
    stock_unit: text(product.stock_unit, "Unit"),
    availability_status: (product.availability_status as ProductAvailabilityStatus | null) ?? "IN_STOCK",

    specifications: [...(product.specifications ?? [])]
      .sort((first, second) => first.sort_order - second.sort_order)
      .map((specification) =>
        createSpecificationRow({
          key: specification.key,
          label: specification.label,
          value: specification.value,
          unit: specification.unit ?? "",
          is_highlight: specification.is_highlight,
        }),
      ),
    highlights: product.highlights.join("\n"),
    available_colors: product.available_colors.join(", "),
    tags: product.tags.join(", "),

    video_url: text(product.video_url),
    catalogue_url: text(product.catalogue_url),
  };
}

export function validateProductForm(form: ProductFormState, images: ProductImageItem[], isEdit: boolean): string | null {
  const value = (field: TextField) => form[field].trim();

  if (!value("name")) {
    return "Product name is required.";
  }

  if (value("name").length > 180) {
    return "Product name must be 180 characters or less.";
  }

  if (!form.category_id) {
    return "Select a final category for the product.";
  }

  if (!isEdit && images.length === 0) {
    return "Add at least one product image.";
  }

  if (!value("short_description")) {
    return "Short description is required.";
  }

  if (value("short_description").length > 250) {
    return "Short description must be 250 characters or less.";
  }

  if (value("description").length > 2000) {
    return "Description must be 2000 characters or less.";
  }

  for (const [field, label] of SHORT_TEXT_FIELDS) {
    if (value(field).length > 255) {
      return `${label} must be 255 characters or less.`;
    }
  }

  for (const [field, label] of [
    ["price", "Price"],
    ["min_price", "Minimum price"],
    ["max_price", "Maximum price"],
    ["weight", "Weight"],
  ] as const) {
    const amount = toNumber(form[field]);

    if (amount !== undefined && !(amount > 0)) {
      return `${label} must be greater than 0.`;
    }
  }

  const minPrice = toNumber(form.min_price);
  const maxPrice = toNumber(form.max_price);

  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    return "Minimum price cannot be more than maximum price.";
  }

  const moq = toNumber(form.moq);

  if (moq === undefined || !Number.isInteger(moq) || moq < 1) {
    return "MOQ must be a whole number of at least 1.";
  }

  const stockQuantity = toNumber(form.stock_quantity);

  if (stockQuantity === undefined || !Number.isInteger(stockQuantity) || stockQuantity < 0) {
    return "Stock quantity must be a whole number (0 or more).";
  }

  if (value("video_url") && !isValidUrl(value("video_url"))) {
    return "Product video URL must be a valid URL (starting with https://).";
  }

  const specifications = getFilledSpecifications(form);

  if (specifications.length > 50) {
    return "You can add up to 50 specifications.";
  }

  const specificationKeys = new Set<string>();

  for (const specification of specifications) {
    if (!specification.label.trim() || !specification.value.trim()) {
      return "Each specification needs both a name and a value.";
    }

    if (!specification.key) {
      return `Specification "${specification.label}" must contain letters or numbers.`;
    }

    if (specificationKeys.has(specification.key)) {
      return `Specification "${specification.label}" is added more than once.`;
    }

    specificationKeys.add(specification.key);
  }

  const listItems = [...getHighlights(form), ...getColors(form), ...getTags(form)];

  if (listItems.some((item) => item.length > 100)) {
    return "Each highlight, color and tag must be 100 characters or less.";
  }

  return null;
}

export function toProductPayload(form: ProductFormState, images: ProductImageItem[]): CreateSellerProductPayload {
  const name = form.name.trim();

  const payload: CreateSellerProductPayload = {
    name,
    category_id: form.category_id as number,
    currency: form.currency,
    price_unit: form.price_unit,
    moq_unit: form.moq_unit,
    stock_unit: form.stock_unit,
    availability_status: form.availability_status,
    price: toNumber(form.price),
    min_price: toNumber(form.min_price),
    max_price: toNumber(form.max_price),
    moq: toNumber(form.moq),
    stock_quantity: toNumber(form.stock_quantity),
    weight: toNumber(form.weight),
    specifications: getFilledSpecifications(form).map((row, index) => ({
      key: row.key,
      label: row.label.trim(),
      value: row.value.trim(),
      unit: row.unit.trim() || null,
      is_highlight: row.is_highlight,
      sort_order: index,
    })),
    highlights: getHighlights(form),
    available_colors: getColors(form),
    tags: getTags(form),
    images: images.map((image, index) => ({
      image_url: image.url,
      alt_text: (index === 0 ? name : `${name} - image ${index + 1}`).slice(0, 180),
      sort_order: index,
      is_primary: image.isPrimary,
    })),
  };

  for (const field of OPTIONAL_TEXT_FIELDS) {
    const trimmed = form[field].trim();

    if (trimmed) {
      payload[field] = trimmed;
    }
  }

  // Units only make sense together with their value.
  if (payload.cooling_capacity) {
    payload.cooling_capacity_unit = form.cooling_capacity_unit;
  }

  if (payload.weight !== undefined) {
    payload.weight_unit = form.weight_unit;
  }

  return JSON.parse(JSON.stringify(payload)) as CreateSellerProductPayload;
}

/*
 * PATCH: same fields as create (minus images),
 * but blank optional values are sent as null so they get cleared.
 */
export function toUpdatePayload(form: ProductFormState): UpdateSellerProductPayload {
  const { images: _images, ...payload } = toProductPayload(form, []);

  const update: UpdateSellerProductPayload = { ...payload };

  for (const field of OPTIONAL_TEXT_FIELDS) {
    update[field] ??= null;
  }

  for (const field of ["price", "min_price", "max_price", "weight"] as const) {
    update[field] ??= null;
  }

  update.cooling_capacity_unit ??= null;
  update.weight_unit ??= null;

  return update;
}
