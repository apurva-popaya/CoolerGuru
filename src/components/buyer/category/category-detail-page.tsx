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
    <section className="bg-white py-5">
      <Container>
        <div className="grid grid-cols-[220px_1fr] items-start gap-8">
          <CategorySidebar activeSlug={category.slug} />

          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-1.5 font-medium text-[#555a76] text-[10px]">
              <Link href="/" className="transition hover:text-[#2118ad]">
                Home
              </Link>

              <ChevronRight size={12} className="text-[#777b92]" />

              <span className="font-semibold text-[#2118ad]">{category.title}</span>
            </div>

            <h1 className="font-bold text-[#171570] text-[32px] leading-tight">{category.title}</h1>

            <p className="mt-1 text-[#4d526e] text-[12px]">{category.description}</p>

            <CategoryHero
              title={category.title}
              image={category.heroImage}
              description={category.heroDescription}
              count={category.subcategoryCount}
            />

            <div className="mt-4 grid grid-cols-5 gap-4">
              {category.subcategories.map((subcategory) => (
                <SubcategoryCard key={subcategory.id} subcategory={subcategory} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
