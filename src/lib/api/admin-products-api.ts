import { type ApiResponse, apiRequest } from "@/lib/api/api-client";

export type AdminProductStatus = "ALL" | "ACTIVE" | "INACTIVE";

export type AdminProductStockStatus = "ALL" | "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

export type AdminProductApprovalStatus = "ALL" | "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";

export interface AdminProductsQuery {
  search?: string;
  category_id?: number;
  company_id?: number;
  status?: AdminProductStatus;
  stock_status?: AdminProductStockStatus;
  approval_status?: AdminProductApprovalStatus;
  page?: number;
  limit?: number;
}

export interface AdminProductListItem {
  product_id: number;
  name: string;
  slug: string;
  short_description: string | null;
  sku: string | null;
  model_number: string | null;
  price: string | null;
  currency: string;
  stock_quantity: number | null;
  stock_unit: string;

  availability_status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

  is_active: boolean;

  approval_status: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";

  approval_note: string | null;
  created_at: string;
  updated_at: string;

  category: {
    category_id: number;
    name: string;
    slug: string;
  };

  company: {
    company_id: number;
    name: string;
    slug: string;
  } | null;

  images: {
    image_url: string;
    alt_text: string | null;
    is_primary: boolean;
  }[];

  _count: {
    inquiries: number;
    saved_by: number;
  };
}

export interface AdminProductsSummary {
  total: number;
  active: number;
  inactive: number;
  approved: number;
  pending_approval: number;
  out_of_stock: number;
}

export interface AdminProductsPagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AdminProductsData {
  summary: AdminProductsSummary;
  products: AdminProductListItem[];
  pagination: AdminProductsPagination;
}

export type AdminProductsResponse = ApiResponse<AdminProductsData>;

export async function getAdminProducts(query: AdminProductsQuery = {}) {
  const params = new URLSearchParams();

  if (query.search?.trim()) {
    params.set("search", query.search.trim());
  }

  if (query.category_id) {
    params.set("category_id", String(query.category_id));
  }

  if (query.company_id) {
    params.set("company_id", String(query.company_id));
  }

  if (query.status && query.status !== "ALL") {
    params.set("status", query.status);
  }

  if (query.stock_status && query.stock_status !== "ALL") {
    params.set("stock_status", query.stock_status);
  }

  if (query.approval_status && query.approval_status !== "ALL") {
    params.set("approval_status", query.approval_status);
  }

  params.set("page", String(query.page ?? 1));

  params.set("limit", String(query.limit ?? 10));

  return apiRequest<AdminProductsResponse>(`/admin/products?${params.toString()}`, {
    method: "GET",
  });
}

export interface AdminProductDetailCategory {
  category_id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  banner_image: string | null;
  icon: string | null;
  parent_id: number | null;
  can_have_children: boolean;
  sort_order: number;
  is_featured: boolean;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminProductDetailCompany {
  company_id: number;
  name: string;
  slug: string;
}

export interface AdminProductDetailImage {
  product_image_id: number;
  product_id: number;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface AdminProductDetailItem {
  product_id: number;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;

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

  availability_status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

  highlights: string[];
  available_colors: string[];
  tags: string[];

  specifications: {
    label?: string;
    value?: string;
    [key: string]: unknown;
  }[];

  video_url: string | null;
  catalogue_url: string | null;
  launched_at: string | null;

  is_featured: boolean;

  approval_status: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";

  approval_note: string | null;
  approval_reviewed_at: string | null;

  category_id: number;

  is_active: boolean;
  deleted_at: string | null;

  created_at: string;
  updated_at: string;

  company_id: number | null;

  category: AdminProductDetailCategory;

  company: AdminProductDetailCompany | null;

  images: AdminProductDetailImage[];

  _count: {
    inquiries: number;
    saved_by: number;
  };
}

export interface AdminProductDetailData {
  product: AdminProductDetailItem;
}

export type AdminProductDetailResponse = ApiResponse<AdminProductDetailData>;

export async function getAdminProductBySlug(slug: string) {
  return apiRequest<AdminProductDetailResponse>(`/admin/products/${encodeURIComponent(slug)}`, {
    method: "GET",
  });
}

export type ProductApprovalDecision = "APPROVED" | "REJECTED";

export interface ReviewProductApprovalPayload {
  status: ProductApprovalDecision;
  note: string;
  is_active: boolean;
}

export type ReviewProductApprovalResponse = ApiResponse<Record<string, unknown>>;

export async function reviewProductApproval(slug: string, payload: ReviewProductApprovalPayload) {
  return apiRequest<ReviewProductApprovalResponse>(`/admin/products/${encodeURIComponent(slug)}/approval`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}
