"use client";

import * as React from "react";

import Link from "next/link";

import { Box, ChevronDown, Edit3, Folder, Layers3, MoreVertical, Plus, RotateCcw, UserX } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deactivateCategory, getCategoryChildren, getRootCategories, restoreCategory } from "@/lib/api/categories-api";
import { getApiErrorMessage } from "@/lib/api/get-api-error-message";
import type { Category } from "@/types/category";

import type { CategoryItem, MainCategoryItem, SubcategoryItem } from "./categories-data";

function getApiItems<T>(response: { data?: T }): T | undefined {
  return response.data;
}

function categoryStatus(category: Category) {
  return category.is_active === false ? "Inactive" : "Active";
}

function productCount(category: Category) {
  return category.product_count ?? 0;
}

export function AdminCategories() {
  const [categories, setCategories] = React.useState<MainCategoryItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [actionSlug, setActionSlug] = React.useState<string | null>(null);
  const [error, setError] = React.useState("");

  const loadCategories = React.useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const rootResponse = await getRootCategories();

      const roots = getApiItems(rootResponse) ?? [];

      const mainCategoryItems = await Promise.all(
        roots.map(async (root): Promise<MainCategoryItem> => {
          const categoryResponse = await getCategoryChildren(root.slug);

          const children = getApiItems(categoryResponse) ?? [];

          const categoryItems = await Promise.all(
            children.map(async (child): Promise<CategoryItem> => {
              const subcategoryResponse = await getCategoryChildren(child.slug);

              const subcategories = getApiItems(subcategoryResponse) ?? [];

              return {
                id: child.slug,
                categoryId: child.category_id,
                name: child.name,
                slug: child.slug,
                status: categoryStatus(child),
                productsCount: productCount(child),

                subcategories: subcategories.map(
                  (subcategory): SubcategoryItem => ({
                    id: subcategory.slug,
                    categoryId: subcategory.category_id,
                    name: subcategory.name,
                    slug: subcategory.slug,
                    status: categoryStatus(subcategory),
                    productsCount: productCount(subcategory),
                  }),
                ),
              };
            }),
          );

          return {
            id: root.slug,
            categoryId: root.category_id,
            name: root.name,
            slug: root.slug,
            status: categoryStatus(root),
            productsCount: productCount(root),
            categories: categoryItems,
          };
        }),
      );

      setCategories(mainCategoryItems);
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const totalCategories = categories.reduce((total, mainCategory) => total + mainCategory.categories.length, 0);

  const totalSubcategories = categories.reduce(
    (total, mainCategory) =>
      total +
      mainCategory.categories.reduce((categoryTotal, category) => categoryTotal + category.subcategories.length, 0),
    0,
  );

  async function handleDeactivate(slug: string, label: string) {
    const confirmed = window.confirm(`Deactivate "${label}"?`);

    if (!confirmed) {
      return;
    }

    setActionSlug(slug);
    setError("");

    try {
      await deactivateCategory(slug);

      /*
       * Keep it visible locally as
       * inactive so Restore is available
       * during this session.
       *
       * Note: current backend public GET
       * APIs only return active categories.
       */
      setCategories((current) => updateCategoryStatusInTree(current, slug, "Inactive"));
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setActionSlug(null);
    }
  }

  async function handleRestore(slug: string) {
    setActionSlug(slug);
    setError("");

    try {
      await restoreCategory(slug);

      setCategories((current) => updateCategoryStatusInTree(current, slug, "Active"));
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setActionSlug(null);
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Manage Categories"
        description="Manage main categories, categories and subcategories on CoolerGuru."
        action={
          <Button asChild className="gap-2 bg-[#2720a8] hover:bg-[#15136f]">
            <Link href="/admin/categories/add-main">
              <Plus className="size-4" />
              Add Main Category
            </Link>
          </Button>
        }
      />

      {error && (
        <div className="rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 font-medium text-[12px] text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Main Categories" value={categories.length} icon={Box} subtitle="Root categories" />

        <StatCard title="Categories" value={totalCategories} icon={Folder} subtitle="Under all main categories" />

        <StatCard title="Subcategories" value={totalSubcategories} icon={Layers3} subtitle="Under all categories" />
      </div>

      <div className="overflow-hidden rounded-[10px] border border-border bg-white">
        <div className="grid grid-cols-[1fr_175px_140px_115px_310px] border-border border-b bg-[#fafafe] px-4 py-3 font-semibold text-[#5d6280] text-[12px]">
          <div>Category Name</div>

          <div>Type</div>

          <div>Status</div>

          <div>Products</div>

          <div>Action</div>
        </div>

        {loading ? (
          <div className="px-6 py-10 text-center text-[#5d6280] text-[13px]">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="px-6 py-10 text-center text-[#5d6280] text-[13px]">No categories found.</div>
        ) : (
          categories.map((mainCategory) => (
            <MainCategoryRow
              key={mainCategory.id}
              mainCategory={mainCategory}
              actionSlug={actionSlug}
              onDeactivate={handleDeactivate}
              onRestore={handleRestore}
            />
          ))
        )}
      </div>
    </div>
  );
}

function MainCategoryRow({
  mainCategory,
  actionSlug,
  onDeactivate,
  onRestore,
}: {
  mainCategory: MainCategoryItem;
  actionSlug: string | null;
  onDeactivate: (slug: string, label: string) => void;
  onRestore: (slug: string) => void;
}) {
  return (
    <div>
      <div className="grid min-h-[58px] grid-cols-[1fr_175px_140px_115px_310px] items-center border-border border-b px-4">
        <div className="flex items-center gap-3">
          <ChevronDown className="size-4" />

          <Box className="size-5 text-[#2720a8]" />

          <span className="font-bold text-[#15136f]">{mainCategory.name}</span>
        </div>

        <div>
          <StatusBadge variant="info">Main Category</StatusBadge>
        </div>

        <div>
          <CategoryStatusBadge status={mainCategory.status} />
        </div>

        <div className="text-[#5d6280] text-[12px]">{mainCategory.productsCount}</div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="gap-2 text-[#2720a8]">
            <Link href={`/admin/categories/${mainCategory.slug}/add-category`}>
              <Plus className="size-4" />
              Add Category
            </Link>
          </Button>

          <Button asChild variant="outline" size="icon-sm">
            <Link href={`/admin/categories/${mainCategory.slug}/edit`} aria-label={`Edit ${mainCategory.name}`}>
              <Edit3 className="size-4" />
            </Link>
          </Button>

          <CategoryActions
            label={mainCategory.name}
            slug={mainCategory.slug}
            status={mainCategory.status}
            loading={actionSlug === mainCategory.slug}
            onDeactivate={onDeactivate}
            onRestore={onRestore}
          />
        </div>
      </div>

      {mainCategory.categories.length > 0 ? (
        mainCategory.categories.map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            mainCategory={mainCategory}
            actionSlug={actionSlug}
            onDeactivate={onDeactivate}
            onRestore={onRestore}
          />
        ))
      ) : (
        <div className="border-border border-b bg-[#fbfcff] px-6 py-4 text-[#5d6280] text-[12px]">
          No categories added yet. Click “Add Category” to create categories under {mainCategory.name}.
        </div>
      )}
    </div>
  );
}

function CategoryRow({
  category,
  mainCategory,
  actionSlug,
  onDeactivate,
  onRestore,
}: {
  category: CategoryItem;
  mainCategory: MainCategoryItem;
  actionSlug: string | null;
  onDeactivate: (slug: string, label: string) => void;
  onRestore: (slug: string) => void;
}) {
  return (
    <>
      <div className="grid min-h-[58px] grid-cols-[1fr_175px_140px_115px_310px] items-center border-border border-b bg-[#fdfdff] px-4">
        <div className="flex items-center gap-3 pl-8">
          <ChevronDown className="size-4" />

          <Folder className="size-5 text-[#2563eb]" />

          <span className="font-medium text-[#15136f]">{category.name}</span>
        </div>

        <div>
          <StatusBadge variant="info">Category</StatusBadge>
        </div>

        <div>
          <CategoryStatusBadge status={category.status} />
        </div>

        <div className="text-[#5d6280] text-[12px]">{category.productsCount}</div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="gap-2 text-[#2720a8]">
            <Link href={`/admin/categories/${mainCategory.slug}/${category.slug}/add-subcategory`}>
              <Plus className="size-4" />
              Add Subcategory
            </Link>
          </Button>

          <Button asChild variant="outline" size="icon-sm">
            <Link
              href={`/admin/categories/${mainCategory.slug}/${category.slug}/edit`}
              aria-label={`Edit ${category.name}`}
            >
              <Edit3 className="size-4" />
            </Link>
          </Button>

          <CategoryActions
            label={category.name}
            slug={category.slug}
            status={category.status}
            loading={actionSlug === category.slug}
            onDeactivate={onDeactivate}
            onRestore={onRestore}
          />
        </div>
      </div>

      {category.subcategories.map((subcategory) => (
        <SubcategoryRow
          key={subcategory.id}
          subcategory={subcategory}
          mainCategory={mainCategory}
          category={category}
          actionSlug={actionSlug}
          onDeactivate={onDeactivate}
          onRestore={onRestore}
        />
      ))}
    </>
  );
}

function SubcategoryRow({
  subcategory,
  mainCategory,
  category,
  actionSlug,
  onDeactivate,
  onRestore,
}: {
  subcategory: SubcategoryItem;
  mainCategory: MainCategoryItem;
  category: CategoryItem;
  actionSlug: string | null;
  onDeactivate: (slug: string, label: string) => void;
  onRestore: (slug: string) => void;
}) {
  return (
    <div className="grid min-h-[56px] grid-cols-[1fr_175px_140px_115px_310px] items-center border-border border-b px-4">
      <div className="flex items-center gap-3 pl-[76px]">
        <span className="w-4 border-[#bfc3d5] border-t border-dashed" />

        <Layers3 className="size-4 text-[#5d6280]" />

        <span className="text-[#15136f] text-[13px]">{subcategory.name}</span>
      </div>

      <div>
        <StatusBadge variant="neutral">Subcategory</StatusBadge>
      </div>

      <div>
        <CategoryStatusBadge status={subcategory.status} />
      </div>

      <div className="text-[#5d6280] text-[12px]">{subcategory.productsCount}</div>

      <div className="flex items-center gap-2">
        <Button asChild variant="outline" size="icon-sm">
          <Link
            href={`/admin/categories/${mainCategory.slug}/${category.slug}/${subcategory.slug}/edit`}
            aria-label={`Edit ${subcategory.name}`}
          >
            <Edit3 className="size-4" />
          </Link>
        </Button>

        <CategoryActions
          label={subcategory.name}
          slug={subcategory.slug}
          status={subcategory.status}
          loading={actionSlug === subcategory.slug}
          onDeactivate={onDeactivate}
          onRestore={onRestore}
        />
      </div>
    </div>
  );
}

function CategoryStatusBadge({ status }: { status: "Active" | "Inactive" }) {
  return <StatusBadge variant={status === "Active" ? "success" : "neutral"}>{status}</StatusBadge>;
}

function CategoryActions({
  label,
  slug,
  status,
  loading,
  onDeactivate,
  onRestore,
}: {
  label: string;
  slug: string;
  status: "Active" | "Inactive";
  loading: boolean;
  onDeactivate: (slug: string, label: string) => void;
  onRestore: (slug: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-sm" disabled={loading} aria-label={`Actions for ${label}`}>
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[165px]">
        {status === "Active" ? (
          <DropdownMenuItem variant="destructive" onSelect={() => onDeactivate(slug, label)}>
            <UserX className="size-4" />
            Deactivate
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onSelect={() => onRestore(slug)}>
            <RotateCcw className="size-4" />
            Restore
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function updateCategoryStatusInTree(
  categories: MainCategoryItem[],
  slug: string,
  status: "Active" | "Inactive",
): MainCategoryItem[] {
  return categories.map((mainCategory) => {
    if (mainCategory.slug === slug) {
      return {
        ...mainCategory,
        status,
      };
    }

    return {
      ...mainCategory,

      categories: mainCategory.categories.map((category) => {
        if (category.slug === slug) {
          return {
            ...category,
            status,
          };
        }

        return {
          ...category,

          subcategories: category.subcategories.map((subcategory) =>
            subcategory.slug === slug
              ? {
                  ...subcategory,
                  status,
                }
              : subcategory,
          ),
        };
      }),
    };
  });
}
