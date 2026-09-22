"use client";

import * as React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft, ImageIcon, Info, Lightbulb } from "lucide-react";

import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createCategory, getCategoryBySlug, updateCategory } from "@/lib/api/categories-api";
import { getApiErrorMessage } from "@/lib/api/get-api-error-message";
import { sanitizeText } from "@/lib/utils/sanitize";
import type { Category } from "@/types/category";

export type CategoryFormMode = "MAIN_CATEGORY" | "CATEGORY" | "SUBCATEGORY";

export type CategoryFormOperation = "ADD" | "EDIT";

interface CategoryFormProps {
  mode: CategoryFormMode;

  operation?: CategoryFormOperation;

  mainCategorySlug?: string;

  categorySlug?: string;

  editSlug?: string;
}

interface FormLabels {
  pageTitle: string;
  pageDescription: string;
  fieldLabel: string;
  fieldPlaceholder: string;
  imageLabel: string;
  submitLabel: string;
  previewLabel: string;
}

function getLabels(mode: CategoryFormMode, operation: CategoryFormOperation): FormLabels {
  const editing = operation === "EDIT";

  if (mode === "MAIN_CATEGORY") {
    return {
      pageTitle: editing ? "Edit Main Category" : "Add Main Category",

      pageDescription: editing
        ? "Update the selected main category."
        : "Create a new main category (e.g. Air Cooler, Air Conditioners, Fans).",

      fieldLabel: "Category Name",

      fieldPlaceholder: "Enter category name (e.g. Air Cooler)",

      imageLabel: "Category Image / Icon",

      submitLabel: editing ? "Update Category" : "Create Category",

      previewLabel: "Category Name",
    };
  }

  if (mode === "CATEGORY") {
    return {
      pageTitle: editing ? "Edit Category" : "Add Category",

      pageDescription: editing
        ? "Update the selected category."
        : "Create a category under the selected main category.",

      fieldLabel: "Category Name",

      fieldPlaceholder: "Enter category name (e.g. Air Cooler Manufacturers)",

      imageLabel: "Category Image / Icon",

      submitLabel: editing ? "Update Category" : "Create Category",

      previewLabel: "Category Name",
    };
  }

  return {
    pageTitle: editing ? "Edit Subcategory" : "Add Subcategory",

    pageDescription: editing ? "Update the selected subcategory." : "Create a subcategory under the selected category.",

    fieldLabel: "Subcategory Name",

    fieldPlaceholder: "Enter subcategory name (e.g. Domestic Air Coolers)",

    imageLabel: "Subcategory Image / Icon",

    submitLabel: editing ? "Update Subcategory" : "Create Subcategory",

    previewLabel: "Subcategory Name",
  };
}

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function CategoryForm({ mode, operation = "ADD", mainCategorySlug, categorySlug, editSlug }: CategoryFormProps) {
  const router = useRouter();

  const labels = getLabels(mode, operation);

  const [name, setName] = React.useState("");

  const [slug, setSlug] = React.useState("");

  const [description, setDescription] = React.useState("");

  const [displayOrder, setDisplayOrder] = React.useState("0");

  const [status, setStatus] = React.useState<"Active" | "Inactive">("Active");

  const [mainCategory, setMainCategory] = React.useState<Category | undefined>();

  const [category, setCategory] = React.useState<Category | undefined>();

  const [loading, setLoading] = React.useState(operation === "EDIT" || Boolean(mainCategorySlug || categorySlug));

  const [submitting, setSubmitting] = React.useState(false);

  const [error, setError] = React.useState("");

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError("");

      try {
        if (mainCategorySlug) {
          const response = await getCategoryBySlug(mainCategorySlug);

          if (response.data) {
            setMainCategory(response.data);
          }
        }

        if (categorySlug) {
          const response = await getCategoryBySlug(categorySlug);

          if (response.data) {
            setCategory(response.data);
          }
        }

        if (operation === "EDIT" && editSlug) {
          const response = await getCategoryBySlug(editSlug);

          const item = response.data;

          if (!item) {
            throw new Error("Category not found.");
          }

          setName(item.name);

          setSlug(item.slug);

          setDescription(item.description ?? "");

          setDisplayOrder(String(item.sort_order ?? 0));

          setStatus(item.is_active === false ? "Inactive" : "Active");
        }
      } catch (error) {
        setError(getApiErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [operation, editSlug, mainCategorySlug, categorySlug]);

  function handleNameChange(value: string) {
    setName(value);

    if (operation === "ADD") {
      setSlug(createSlug(value));
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (submitting || !name.trim() || !slug.trim()) {
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      if (operation === "EDIT") {
        if (!editSlug) {
          throw new Error("Category slug is missing.");
        }

        await updateCategory(editSlug, {
          name: sanitizeText(name),

          slug: slug.trim(),

          description: sanitizeText(description) || null,

          sort_order: Number(displayOrder),

          is_active: status === "Active",

          can_have_children: mode !== "SUBCATEGORY",
        });
      } else {
        let parentId: number | null = null;

        if (mode === "CATEGORY") {
          if (!mainCategory) {
            throw new Error("Main category could not be loaded.");
          }

          parentId = mainCategory.category_id;
        }

        if (mode === "SUBCATEGORY") {
          if (!category) {
            throw new Error("Parent category could not be loaded.");
          }

          parentId = category.category_id;
        }

        await createCategory({
          name: sanitizeText(name),

          slug: slug.trim(),

          description: sanitizeText(description) || undefined,

          parent_id: parentId,

          can_have_children: mode !== "SUBCATEGORY",

          sort_order: Number(displayOrder),

          is_featured: false,
        });

        /*
         * CreateCategoryRequest does not
         * expose is_active.
         *
         * Newly created categories should
         * therefore start active.
         */
      }

      router.push("/admin/categories");

      router.refresh();
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-[10px] border border-border bg-white px-6 py-10 text-center text-[#5d6280] text-[13px]">
        Loading category...
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[12px]">
            <Link href="/admin/categories" className="font-medium text-[#2720a8]">
              Categories
            </Link>

            {mainCategory && (
              <>
                <span className="text-muted-foreground">/</span>

                <span className="text-[#5d6280]">{mainCategory.name}</span>
              </>
            )}

            {category && (
              <>
                <span className="text-muted-foreground">/</span>

                <span className="text-[#5d6280]">{category.name}</span>
              </>
            )}

            <span className="text-muted-foreground">/</span>

            <span className="font-semibold text-[#15136f]">{labels.pageTitle}</span>
          </div>

          <h1 className="font-bold text-[#15136f] text-[28px]">{labels.pageTitle}</h1>

          <p className="mt-1 text-[#5d6280] text-[13px]">{labels.pageDescription}</p>
        </div>

        <Button asChild variant="outline" className="gap-2">
          <Link href="/admin/categories">
            <ArrowLeft className="size-4" />
            Back to Categories
          </Link>
        </Button>
      </div>

      {error && (
        <div className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 font-medium text-[12px] text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.8fr_0.9fr]">
        <form onSubmit={handleSubmit} className="rounded-[10px] border border-border bg-white p-6">
          <div>
            <h2 className="font-bold text-[#15136f] text-[19px]">Category Information</h2>

            <p className="mt-1 text-[#5d6280] text-[13px]">
              {operation === "EDIT" ? "Update the details below." : "Enter the basic details for the new item."}
            </p>
          </div>

          <div className="mt-6 space-y-5">
            {mode !== "MAIN_CATEGORY" && mainCategory && (
              <ReadOnlyField label="Main Category" value={mainCategory.name} />
            )}

            {mode === "SUBCATEGORY" && category && <ReadOnlyField label="Category" value={category.name} />}

            <div>
              <label htmlFor="category-name" className="font-semibold text-[#15136f] text-[13px]">
                {labels.fieldLabel} <span className="text-red-500">*</span>
              </label>

              <Input
                id="category-name"
                value={name}
                onChange={(event) => handleNameChange(event.target.value)}
                placeholder={labels.fieldPlaceholder}
                className="mt-2 h-11"
                required
              />
            </div>

            <div>
              <label htmlFor="category-slug" className="font-semibold text-[#15136f] text-[13px]">
                Slug <span className="text-red-500">*</span>
              </label>

              <Input
                id="category-slug"
                value={slug}
                onChange={(event) => setSlug(createSlug(event.target.value))}
                placeholder="Enter URL slug"
                className="mt-2 h-11"
                required
              />

              <p className="mt-1 text-[11px] text-muted-foreground">Use lowercase letters, numbers and hyphens only.</p>
            </div>

            <div>
              <label htmlFor="category-description" className="font-semibold text-[#15136f] text-[13px]">
                Description
              </label>

              <Textarea
                id="category-description"
                value={description}
                onChange={(event) => setDescription(event.target.value.slice(0, 500))}
                placeholder="Enter a short description about this category..."
                className="mt-2 min-h-[125px]"
              />

              <div className="mt-1 text-right text-[11px] text-muted-foreground">{description.length}/500</div>
            </div>

            <div>
              <label className="font-semibold text-[#15136f] text-[13px]">{labels.imageLabel}</label>

              <div className="mt-2 grid gap-4 md:grid-cols-2">
                <label className="flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-[9px] border border-[#cfd2e3] border-dashed bg-[#fcfcff] px-5 text-center">
                  <ImageIcon className="size-8 text-[#5d6280]" />

                  <p className="mt-3 font-semibold text-[#15136f] text-[13px]">
                    {operation === "EDIT" ? "Replace category image" : "Upload category image"}
                  </p>

                  <p className="mt-1 text-[11px] text-muted-foreground">PNG, JPG or SVG (Max 2MB)</p>

                  <span className="mt-4 rounded-[6px] border border-border bg-white px-4 py-2 font-medium text-[#15136f] text-[12px]">
                    Choose File
                  </span>

                  <input type="file" accept=".png,.jpg,.jpeg,.svg" className="hidden" disabled />
                </label>

                <div className="rounded-[9px] border border-[#cfe0ff] bg-[#f5f9ff] p-4">
                  <div className="flex items-center gap-2 text-[#2563eb]">
                    <Info className="size-5" />

                    <h3 className="font-bold text-[13px]">Image Guidelines</h3>
                  </div>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-[#5d6280] text-[11px] leading-5">
                    <li>Image upload API integration is pending.</li>
                    <li>Recommended size: 512 × 512 px</li>
                    <li>Supported formats: JPG, PNG, SVG</li>
                    <li>Maximum file size: 2MB</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="display-order" className="font-semibold text-[#15136f] text-[13px]">
                  Display Order
                </label>

                <Input
                  id="display-order"
                  type="number"
                  min="0"
                  value={displayOrder}
                  onChange={(event) => setDisplayOrder(event.target.value)}
                  className="mt-2 h-11"
                />

                <p className="mt-1 text-[11px] text-muted-foreground">Lower numbers will appear first.</p>
              </div>

              <div>
                <label className="font-semibold text-[#15136f] text-[13px]">Status</label>

                {operation === "EDIT" ? (
                  <Select value={status} onValueChange={(value) => setStatus(value as "Active" | "Inactive")}>
                    <SelectTrigger className="mt-2 h-11 w-full">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>

                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="mt-2 flex h-11 items-center rounded-[7px] border border-border bg-[#f7f7fb] px-3 font-medium text-[#15136f] text-[13px]">
                    Active
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-border border-t pt-5">
              <Button asChild type="button" variant="outline">
                <Link href="/admin/categories">Cancel</Link>
              </Button>

              <Button type="submit" disabled={submitting} className="bg-[#2720a8] px-6 text-white hover:bg-[#15136f]">
                {submitting ? "Saving..." : labels.submitLabel}
              </Button>
            </div>
          </div>
        </form>

        <div className="space-y-5">
          <div className="rounded-[10px] border border-border bg-white p-5">
            <h2 className="font-bold text-[#15136f] text-[18px]">Preview</h2>

            <p className="mt-1 text-[12px] text-muted-foreground">
              This is how the category will appear in the system.
            </p>

            <div className="mt-5 rounded-[9px] border border-border p-5">
              <div className="flex size-[95px] items-center justify-center rounded-[8px] bg-[#edf3ff]">
                <ImageIcon className="size-8 text-[#5d6280]" />
              </div>

              <h3 className="mt-4 font-bold text-[#15136f] text-[18px]">{name || labels.previewLabel}</h3>

              {mainCategory && (
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Under:{" "}
                  <span className="font-semibold text-[#15136f]">
                    {mode === "SUBCATEGORY" ? category?.name : mainCategory.name}
                  </span>
                </p>
              )}

              <p className="mt-2 text-[#5d6280] text-[12px]">0 Products</p>

              <div className="mt-3">
                <StatusBadge variant={status === "Active" ? "success" : "neutral"}>{status}</StatusBadge>
              </div>
            </div>
          </div>

          <div className="rounded-[10px] border border-border bg-white p-5">
            <div className="flex items-center gap-2">
              <Lightbulb className="size-5 text-[#2720a8]" />

              <h2 className="font-bold text-[#15136f] text-[16px]">Quick Tips</h2>
            </div>

            <ul className="mt-4 list-disc space-y-3 pl-5 text-[#5d6280] text-[12px] leading-5">
              <li>Use a clear and relevant name.</li>
              <li>The slug will be used in the URL.</li>
              <li>Lower display-order numbers appear first.</li>
              <li>You can change the status later.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="font-semibold text-[#15136f] text-[13px]">{label}</label>

      <div className="mt-2 flex h-11 items-center rounded-[7px] border border-border bg-[#f7f7fb] px-3 font-medium text-[#15136f] text-[13px]">
        {value}
      </div>

      <p className="mt-1 text-[11px] text-muted-foreground">This parent is fixed for this item.</p>
    </div>
  );
}
