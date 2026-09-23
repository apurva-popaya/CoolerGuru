import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Container } from "@/components/common/container";
import { HorizontalCarousel } from "@/components/common/horizontal-carousel";
import { SectionHeader } from "@/components/common/section-header";
import type { HomepageFeaturedProduct } from "@/lib/api/homepage-api";

const products = [
  {
    id: "1",
    name: "Tower Air Cooler",
    specs: [
      { label: "Tank", value: "70 L" },
      { label: "Blade", value: '12"' },
      { label: "Power", value: "130W" },
      { label: "Air Throw", value: "10 ft" },
      { label: "RPM", value: "1350" },
    ],
    bottomLabel: "Warranty",
    bottomValue: "1-Year Motor",
    image: "/images/home/products/tower-air-cooler-1.png",
    href: "/companies?category=tower-air-coolers",
  },
  {
    id: "2",
    name: "Tower Air Cooler",
    specs: [
      { label: "Tank", value: "70 L" },
      { label: "Blade", value: '12"' },
      { label: "Power", value: "130W" },
      { label: "Air Throw", value: "10 ft" },
      { label: "RPM", value: "1350" },
    ],
    bottomLabel: "Warranty",
    bottomValue: "1-Year Motor",
    image: "/images/home/products/tower-air-cooler-2.png",
    href: "/companies?category=tower-air-coolers",
  },
  {
    id: "3",
    name: "Personal Air Cooler",
    specs: [
      { label: "Coverage", value: "200 sq ft" },
      { label: "Tank", value: "50 L" },
      { label: "Power", value: "120W" },
      { label: "Air Throw", value: "15 ft" },
      { label: "Blade", value: "12 inch" },
    ],
    bottomLabel: "Color",
    bottomValue: "Grey",
    image: "/images/home/products/personal-air-cooler.png",
    href: "/companies?category=personal-air-coolers",
  },
  {
    id: "4",
    name: "Glass Top Air Cooler",
    specs: [
      { label: "Tank", value: "40 L" },
      { label: "Blade", value: '12"' },
      { label: "Power", value: "160W" },
      { label: "Air Throw", value: "15 ft" },
      { label: "Cooling", value: "3-Side Honeycomb" },
    ],
    bottomLabel: "Color",
    bottomValue: "Blue",
    image: "/images/home/products/glass-top-air-cooler-blue.png",
    href: "/companies?category=glass-top-air-coolers",
  },
  {
    id: "5",
    name: "Glass Top Air Cooler",
    specs: [
      { label: "Tank", value: "40 L" },
      { label: "Blade", value: '12"' },
      { label: "Power", value: "160W" },
      { label: "Air Throw", value: "15 ft" },
      { label: "Cooling", value: "3-Side Honeycomb" },
    ],
    bottomLabel: "Color",
    bottomValue: "Pink",
    image: "/images/home/products/glass-top-air-cooler-pink.png",
    href: "/companies?category=glass-top-air-coolers",
  },
];

interface ProductsByCategoryProps {
  products?: HomepageFeaturedProduct[];
}

export function ProductsByCategory({
  products: _products,
}: ProductsByCategoryProps) {
  return (
    <section className="bg-white py-4 sm:py-5">
      <Container>
        <SectionHeader
          title="Popular Products & Suppliers"
          viewAllLabel="View All Products"
          viewAllHref="/products"
          className="mb-4 sm:mb-5"
        />

        <HorizontalCarousel scrollAmount={290} className="gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </HorizontalCarousel>
      </Container>
    </section>
  );
}

function ProductCard({
  product,
}: {
  product: (typeof products)[number];
}) {
  return (
    <div className="flex min-h-[330px] min-w-[255px] max-w-[255px] shrink-0 flex-col rounded-[10px] border border-[#e5e6ef] bg-white px-4 pt-4 pb-4">
      <h3 className="font-bold text-[#17159a] text-[15px] leading-[1.25]">
        {product.name}
      </h3>

      <div className="mt-3 grid grid-cols-[1fr_115px] gap-2">
        <div className="space-y-[9px] pt-2">
          {product.specs.map((spec) => (
            <p
              key={spec.label}
              className="text-[#292e4d] text-[10px] leading-[1.3]"
            >
              <span className="font-bold">{spec.label}:</span>{" "}
              <span className="font-semibold">{spec.value}</span>
            </p>
          ))}
        </div>

        <div className="relative h-[190px] w-[115px] self-start">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="115px"
            className="object-contain object-center"
          />
        </div>
      </div>

      <p className="mt-2 font-bold text-[#2720bf] text-[10px]">
        {product.bottomLabel}: {product.bottomValue}
      </p>

      <Link
        href={product.href}
        className="mt-auto flex h-[38px] w-full items-center justify-center gap-4 rounded-[5px] border border-[#4938ee] bg-white font-bold text-[#251bb4] text-[11px] transition hover:bg-[#f6f5ff]"
      >
        View Suppliers
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}