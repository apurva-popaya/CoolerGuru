import type { Category, CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest } from "@/types/category";

import { apiRequest } from "./api-client";

export function getRootCategories() {
  return apiRequest<CategoryResponse<Category[]>>("/categories", {
    method: "GET",
  });
}

export function getCategoryBySlug(slug: string) {
  return apiRequest<CategoryResponse<Category>>(`/categories/${encodeURIComponent(slug)}`, {
    method: "GET",
  });
}

export function getCategoryChildren(slug: string) {
  return apiRequest<CategoryResponse<Category[]>>(`/categories/${encodeURIComponent(slug)}/children`, {
    method: "GET",
  });
}

export function createCategory(payload: CreateCategoryRequest) {
  return apiRequest<CategoryResponse<Category>>("/categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateCategory(slug: string, payload: UpdateCategoryRequest) {
  return apiRequest<CategoryResponse<Category>>(`/categories/${encodeURIComponent(slug)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function deactivateCategory(slug: string) {
  return apiRequest<CategoryResponse>(`/categories/${encodeURIComponent(slug)}`, {
    method: "DELETE",
  });
}

export function restoreCategory(slug: string) {
  return apiRequest<CategoryResponse>(`/categories/${encodeURIComponent(slug)}/restore`, {
    method: "PATCH",
  });
}
