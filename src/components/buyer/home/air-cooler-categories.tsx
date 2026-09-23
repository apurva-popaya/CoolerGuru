import Image from "next/image";
import Link from "next/link";

import { ArrowRight, ChevronRight, Cog, Factory, Power } from "lucide-react";

import { Container } from "@/components/common/container";
import { airCoolerCategoryGroups, type CategoryGroup } from "@/data/buyer/categories";

export function AirCoolerCategories() {
  return (
    <section className="bg-white py-4 sm:py-5">
      <Container>
        <h2 className="mb-4 px-2 text-center font-bold text-[#16179c] text-[20px] leading-[1.2] sm:text-[24px]">
          Explore the Air Cooler Industry
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
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
    <div className="min-w-0 rounded-[10px] border border-[#e3e4ef] bg-white px-3 py-4 sm:px-5">
      <div className="grid grid-cols-[82px_minmax(0,1fr)] gap-3 sm:grid-cols-[100px_minmax(0,1fr)] sm:gap-4 md:grid-cols-[110px_minmax(0,1fr)]">
        <div className="flex flex-col items-center justify-start gap-2 pt-5 sm:gap-3 sm:pt-8">
          {group.images.map((image) => (
            <CategoryImage
              key={image}
              src={image}
              alt={group.title}
              count={group.images.length}
            />
          ))}
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="mb-3 flex min-w-0 items-start gap-2">
            <CategoryIcon type={group.icon} />

            <h3 className="min-w-0 font-bold text-[#2018ad] text-[13px] leading-tight sm:text-[14px]">
              {group.title}
            </h3>
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
                  className="flex min-w-0 items-start gap-1.5 font-medium text-[#2420c2] text-[10px] leading-[1.35] transition hover:text-[#171176] sm:gap-2 sm:text-[11px]"
                >
                  <ChevronRight
                    size={12}
                    strokeWidth={2.5}
                    className="mt-px shrink-0"
                  />

                  <span className="min-w-0">{item}</span>
                </Link>
              );
            })}
          </div>

          <Link
            href={group.href}
            className="mt-3 inline-flex items-center gap-1.5 font-bold text-[#2218ad] text-[10px] transition hover:text-[#3a2dd7] sm:gap-2 sm:text-[11px]"
          >
            Explore All
            <ArrowRight size={13} className="sm:h-[14px] sm:w-[14px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function CategoryImage({
  src,
  alt,
  count,
}: {
  src: string;
  alt: string;
  count: number;
}) {
  const sizeClass =
    count === 1
      ? "h-[150px] w-[72px] sm:h-[190px] sm:w-[95px] md:h-[210px] md:w-[110px]"
      : count === 2
        ? "h-[78px] w-[75px] sm:h-[95px] sm:w-[95px] md:h-[105px] md:w-[105px]"
        : "h-[65px] w-[72px] sm:h-[78px] sm:w-[90px] md:h-[85px] md:w-[100px]";

  return (
    <div className={`relative ${sizeClass}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="120px"
        className="object-contain"
      />
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