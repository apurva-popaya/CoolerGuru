import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { Container } from "@/components/common/container";
import type { CategoryDetail } from "@/types/category-detail";

import { CategoryHero } from "./category-hero";
import { CategorySidebar } from "./category-sidebar";
import { SubcategoryCard } from "./subcategory-card";

interface CategoryDetailPageProps {
  category: CategoryDetail;
}

export function CategoryDetailPage({ category }: CategoryDetailPageProps) {
  return (
    <section className="bg-white py-4 sm:py-5">
      <Container>
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[220px_1fr] lg:gap-8">
          {/* Desktop sidebar / Mobile category selector */}
          <CategorySidebar activeSlug={category.slug} />

          <div className="min-w-0">
            {/* Breadcrumb */}
            <div className="mb-2 flex min-w-0 items-center gap-1.5 overflow-hidden font-medium text-[#555a76] text-[10px]">
              <Link
                href="/"
                className="shrink-0 transition hover:text-[#2118ad]"
              >
                Home
              </Link>

              <ChevronRight
                size={12}
                className="shrink-0 text-[#777b92]"
              />

              <span className="truncate font-semibold text-[#2118ad]">
                {category.title}
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-bold text-[#171570] text-[25px] leading-tight sm:text-[28px] md:text-[32px]">
              {category.title}
            </h1>

            <p className="mt-1 text-[#4d526e] text-[11px] leading-relaxed sm:text-[12px]">
              {category.description}
            </p>

            {/* Hero */}
            <CategoryHero
              title={category.title}
              image={category.heroImage}
              description={category.heroDescription}
              count={category.subcategoryCount}
            />

            {/* Subcategories */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-4">
              {category.subcategories.map((subcategory) => (
                <SubcategoryCard
                  key={subcategory.id}
                  subcategory={subcategory}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}