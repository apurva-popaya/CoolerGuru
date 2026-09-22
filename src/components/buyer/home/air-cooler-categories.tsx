import Image from "next/image";
import Link from "next/link";

import { ArrowRight, ChevronRight, Cog, Factory, Power } from "lucide-react";

import { Container } from "@/components/common/container";
import { airCoolerCategoryGroups, type CategoryGroup } from "@/data/buyer/categories";

export function AirCoolerCategories() {
  return (
    <section className="bg-white py-5">
      <Container>
        <h2 className="mb-4 text-center font-bold text-[#16179c] text-[24px]">Explore the Air Cooler Industry</h2>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {airCoolerCategoryGroups.map((group) => (
            <CategoryCard key={group.id} group={group} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CategoryCard({ group }: { group: CategoryGroup }) {
  return (
    <div className="min-w-0 rounded-[10px] border border-[#e3e4ef] bg-white px-5 py-4">
      <div className="grid grid-cols-[120px_1fr] gap-4">
        <div className="flex flex-col items-center justify-start gap-3 pt-8">
          {group.images.map((image) => (
            <CategoryImage key={image} src={image} alt={group.title} count={group.images.length} />
          ))}
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="mb-3 flex items-start gap-2">
            <CategoryIcon type={group.icon} />

            <h3 className="font-bold text-[#2018ad] text-[14px] leading-tight">{group.title}</h3>
          </div>

          <div className="flex flex-col gap-2">
            {group.items.map((item) => {
              const subcategorySlug = item
                .toLowerCase()
                .trim()
                .replace(/&/g, "and")
                .replace(/\//g, "-")
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")
                .replace(/-+/g, "-");

              return (
                <Link
                  key={item}
                  href={`/category/${group.slug}/${subcategorySlug}`}
                  className="flex min-w-0 items-start gap-2 font-medium text-[#2420c2] text-[11px] leading-[1.35] transition hover:text-[#171176]"
                >
                  <ChevronRight size={12} strokeWidth={2.5} className="mt-px shrink-0" />

                  <span>{item}</span>
                </Link>
              );
            })}
          </div>

          <Link
            href={group.href}
            className="mt-3 inline-flex items-center gap-2 font-bold text-[#2218ad] text-[11px] transition hover:text-[#3a2dd7]"
          >
            Explore All
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function CategoryImage({ src, alt, count }: { src: string; alt: string; count: number }) {
  const sizeClass = count === 1 ? "h-[210px] w-[110px]" : count === 2 ? "h-[105px] w-[105px]" : "h-[85px] w-[100px]";

  return (
    <div className={`relative ${sizeClass}`}>
      <Image src={src} alt={alt} fill sizes="120px" className="object-contain" />
    </div>
  );
}

function CategoryIcon({ type }: { type: CategoryGroup["icon"] }) {
  const className = "mt-px shrink-0 text-[#2420c2]";

  if (type === "cooler") {
    return <Factory size={18} className={className} />;
  }

  if (type === "electrical") {
    return <Power size={18} className={className} />;
  }

  return <Cog size={18} className={className} />;
}
