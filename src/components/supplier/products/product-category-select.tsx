"use client";

import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";

import { getApiErrorMessage } from "@/lib/api/get-api-error-message";
import { type CategoryNode, findCategoryPath, getCategoryTree } from "@/lib/api/seller-products-api";

import { ProductFormField, ProductSelectWrapper, productSelectClass } from "./product-form-section";

const LEVEL_LABELS = ["Category", "Subcategory", "Product Category"];

interface ProductCategorySelectProps {
  value: number | null;
  onChange: (categoryId: number | null) => void;
}

/*
 * Categories are nested (e.g. Air Coolers › Air Cooler Manufacturers › Desert Air Coolers)
 * and products can only be assigned to a final category, so one select is shown per level.
 */
export function ProductCategorySelect({ value, onChange }: ProductCategorySelectProps) {
  const [tree, setTree] = useState<CategoryNode[]>([]);
  const [selectedPath, setSelectedPath] = useState<CategoryNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategoryTree()
      .then(setTree)
      .catch((requestError) => setError(getApiErrorMessage(requestError)))
      .finally(() => setIsLoading(false));
  }, []);

  // Rebuild the selected path when an existing value arrives (edit mode).
  useEffect(() => {
    if (tree.length === 0 || value === null) return;

    setSelectedPath((currentPath) =>
      currentPath.at(-1)?.category_id === value ? currentPath : findCategoryPath(tree, value),
    );
  }, [tree, value]);

  const selectAtLevel = (level: number, categoryId: string) => {
    const options = level === 0 ? tree : selectedPath[level - 1]?.children ?? [];
    const selected = options.find((category) => String(category.category_id) === categoryId);

    const nextPath = selected ? [...selectedPath.slice(0, level), selected] : selectedPath.slice(0, level);

    setSelectedPath(nextPath);

    const lastSelected = nextPath.at(-1);
    const isFinal = lastSelected && lastSelected.children.length === 0 && !lastSelected.can_have_children;

    onChange(isFinal ? lastSelected.category_id : null);
  };

  if (isLoading) {
    return (
      <ProductFormField label="Category" required>
        <div className="flex h-[38px] items-center gap-2 text-[#777c94] text-[8px]">
          <Loader2 size={12} className="animate-spin" />
          Loading categories...
        </div>
      </ProductFormField>
    );
  }

  if (error) {
    return (
      <ProductFormField label="Category" required>
        <p className="flex h-[38px] items-center text-[#db3e57] text-[8px]">{error}</p>
      </ProductFormField>
    );
  }

  // Always show the next level while the current selection still has children.
  const levels: CategoryNode[][] = [tree];

  for (const category of selectedPath) {
    if (category.children.length > 0) {
      levels.push(category.children);
    }
  }

  return (
    <>
      {levels.map((options, level) => (
        <ProductFormField key={LEVEL_LABELS[level] ?? level} label={LEVEL_LABELS[level] ?? "Category"} required>
          <ProductSelectWrapper>
            <select
              value={selectedPath[level]?.category_id ?? ""}
              onChange={(event) => selectAtLevel(level, event.target.value)}
              className={productSelectClass}
            >
              <option value="">Select {(LEVEL_LABELS[level] ?? "category").toLowerCase()}</option>

              {options.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
          </ProductSelectWrapper>
        </ProductFormField>
      ))}
    </>
  );
}
