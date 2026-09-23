import { type ApiResponse, apiRequest } from "@/lib/api/api-client";
import { uploadFileToStorage } from "@/lib/api/file-upload-api";
import type { Category } from "@/types/category";

/* =========================================
   TYPES
========================================= */

export const PRODUCT_AVAILABILITY_STATUSES = ["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"] as const;

export type ProductAvailabilityStatus = (typeof PRODUCT_AVAILABILITY_STATUSES)[number];

export type ProductApprovalStatus = "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";

export interface ProductSpecification {
  key: string;
  label: string;
  value: string;
  unit: string | null;
  is_highlight: boolean;
  sort_order: number;
}

export interface SellerProductImage {
  product_image_id: number;
  product_id: number;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface SellerProduct {
  product_id: number;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  // Prisma Decimal columns are serialized as strings.
  price: string | null;
  min_price: string | null;
  max_price: string | null;
  currency: string;
  price_unit: string | null;
  sku: string | null;
  model_number: string | null;
  brand: string | null;
  hsn_code: string | null;
  product_type: string | null;
  application_usage: string | null;
  airflow: string | null;
  tank_capacity: string | null;
  power: string | null;
  coverage_area: string | null;
  cooling_capacity: string | null;
  cooling_capacity_unit: string | null;
  power_motor: string | null;
  voltage_frequency: string | null;
  material: string | null;
  dimensions: string | null;
  weight: string | null;
  weight_unit: string | null;
  color_finish: string | null;
  moq: number | null;
  moq_unit: string | null;
  stock_quantity: number | null;
  stock_unit: string | null;
  availability_status: string | null;
  highlights: string[];
  available_colors: string[];
  tags: string[];
  specifications: ProductSpecification[] | null;
  video_url: string | null;
  catalogue_url: string | null;
  launched_at: string | null;
  is_featured: boolean;
  approval_status: ProductApprovalStatus;
  approval_note: string | null;
  approval_reviewed_at: string | null;
  category_id: number;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  company_id: number | null;
  category: Category;
  images: SellerProductImage[];
}

export interface SellerProductsSummary {
  total: number;
  active: number;
  inactive: number;
  out_of_stock: number;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export type SellerProductsResponse = ApiResponse<{
  summary: SellerProductsSummary;
  products: SellerProduct[];
  pagination: Pagination;
}>;

export type SellerProductResponse = ApiResponse<{
  product: SellerProduct;
}>;

export interface GetSellerProductsParams {
  search?: string;
  category_id?: number;
  status?: "ALL" | "ACTIVE" | "INACTIVE";
  stock_status?: "ALL" | ProductAvailabilityStatus;
  page?: number;
  limit?: number;
}

export interface ProductImagePayload {
  image_url: string;
  alt_text?: string;
  sort_order: number;
  is_primary: boolean;
}

export type ProductSpecificationPayload = ProductSpecification;

/*
 * Mirrors `createSellerProductSchema` in the backend (product.validator.ts).
 * Optional text fields must be omitted when blank - the backend rejects "".
 */
export interface CreateSellerProductPayload {
  name: string;
  category_id: number;
  short_description?: string;
  description?: string;
  sku?: string;
  model_number?: string;
  brand?: string;
  hsn_code?: string;
  price?: number;
  min_price?: number;
  max_price?: number;
  currency?: string;
  price_unit?: string;
  moq?: number;
  moq_unit?: string;
  stock_quantity?: number;
  stock_unit?: string;
  availability_status?: ProductAvailabilityStatus;
  product_type?: string;
  application_usage?: string;
  cooling_capacity?: string;
  cooling_capacity_unit?: string;
  power_motor?: string;
  voltage_frequency?: string;
  material?: string;
  dimensions?: string;
  weight?: number;
  weight_unit?: string;
  color_finish?: string;
  specifications: ProductSpecificationPayload[];
  highlights: string[];
  available_colors: string[];
  tags: string[];
  video_url?: string;
  catalogue_url?: string;
  images: ProductImagePayload[];
}

/*
 * PATCH accepts `null` to clear a field, but does not accept `images`.
 */
export type UpdateSellerProductPayload = {
  [K in keyof Omit<CreateSellerProductPayload, "images">]?: CreateSellerProductPayload[K] | null;
};

/* =========================================
   SELLER PRODUCTS
========================================= */

export function getSellerProducts(params: GetSellerProductsParams = {}) {
  const searchParams = new URLSearchParams();

  if (params.search?.trim()) {
    searchParams.set("search", params.search.trim());
  }

  if (params.category_id) {
    searchParams.set("category_id", String(params.category_id));
  }

  if (params.status && params.status !== "ALL") {
    searchParams.set("status", params.status);
  }

  if (params.stock_status && params.stock_status !== "ALL") {
    searchParams.set("stock_status", params.stock_status);
  }

  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("limit", String(params.limit ?? 10));

  return apiRequest<SellerProductsResponse>(`/seller/products?${searchParams.toString()}`);
}

export function getSellerProduct(slug: string) {
  return apiRequest<SellerProductResponse>(`/seller/products/${encodeURIComponent(slug)}`);
}

export function createSellerProduct(payload: CreateSellerProductPayload) {
  return apiRequest<SellerProductResponse>("/seller/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateSellerProduct(slug: string, payload: UpdateSellerProductPayload) {
  return apiRequest<SellerProductResponse>(`/seller/products/${encodeURIComponent(slug)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

/* Soft delete: the product becomes inactive and can be restored. */
export function deactivateSellerProduct(slug: string) {
  return apiRequest<ApiResponse>(`/seller/products/${encodeURIComponent(slug)}`, {
    method: "DELETE",
  });
}

export function restoreSellerProduct(slug: string) {
  return apiRequest<SellerProductResponse>(`/seller/products/${encodeURIComponent(slug)}/restore`, {
    method: "PATCH",
  });
}

export function uploadProductFile(file: File, folder: "images" | "catalogues"): Promise<string> {
  return uploadFileToStorage(file, `products/${folder}`);
}

/* =========================================
   CATEGORIES
========================================= */

export interface CategoryNode extends Category {
  children: CategoryNode[];
}

type CategoriesResponse = ApiResponse<{
  categories: Category[];
}>;

async function loadCategoryNodes(categories: Category[]): Promise<CategoryNode[]> {
  return Promise.all(
    categories.map(async (category) => {
      if (!category.can_have_children) {
        return { ...category, children: [] };
      }

      const response = await apiRequest<CategoriesResponse>(
        `/categories/${encodeURIComponent(category.slug)}/children`,
      );

      return {
        ...category,
        children: await loadCategoryNodes(response.data?.categories ?? []),
      };
    }),
  );
}

let categoryTreePromise: Promise<CategoryNode[]> | null = null;

/*
 * The public API only exposes roots + direct children,
 * so the full tree is built once and cached for the session.
 */
export function getCategoryTree(): Promise<CategoryNode[]> {
  categoryTreePromise ??= apiRequest<CategoriesResponse>("/categories")
    .then((response) => loadCategoryNodes(response.data?.categories ?? []))
    .catch((error) => {
      categoryTreePromise = null;
      throw error;
    });

  return categoryTreePromise;
}

/* Returns the chain of categories from a root down to `categoryId`. */
export function findCategoryPath(tree: CategoryNode[], categoryId: number): CategoryNode[] {
  for (const node of tree) {
    if (node.category_id === categoryId) {
      return [node];
    }

    const childPath = findCategoryPath(node.children, categoryId);

    if (childPath.length > 0) {
      return [node, ...childPath];
    }
  }

  return [];
}

/* Final (leaf) categories - the only ones products can be assigned to. */
export function getLeafCategories(tree: CategoryNode[], parentNames: string[] = []): { id: number; label: string }[] {
  return tree.flatMap((node) =>
    node.children.length === 0 && !node.can_have_children
      ? [{ id: node.category_id, label: [...parentNames, node.name].join(" › ") }]
      : getLeafCategories(node.children, [...parentNames, node.name]),
  );
}
