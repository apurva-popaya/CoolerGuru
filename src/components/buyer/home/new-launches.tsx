import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Container } from "@/components/common/container";
import { HorizontalCarousel } from "@/components/common/horizontal-carousel";
import { SectionHeader } from "@/components/common/section-header";
import type { HomepageNewLaunch } from "@/lib/api/homepage-api";

const launches = [
  {
    id: "1",
    name: "HAVAI 8X Flo Pro",
    category: "Plastic Body Duct Air Cooler",
    specification: "100L Tank • 8500 m³/hr",
    image: "/images/home/new-launches/havai-8x-flo-pro.png",
    href: "/products/1",
  },
  {
    id: "2",
    name: "HAVAI Thunder-75",
    category: "Tower Air Cooler",
    specification: '70L Tank • 12" Blade',
    image: "/images/home/new-launches/havai-thunder-75.png",
    href: "/products/2",
  },
  {
    id: "3",
    name: "HAVAI Arizona 9 Mini",
    category: "Personal Air Cooler",
    specification: "12L Tank • 2600 RPM",
    image: "/images/home/new-launches/havai-arizona-9-mini.png",
    href: "/products/3",
  },
  {
    id: "4",
    name: "HAVAI Mighty 12",
    category: "Personal Air Cooler",
    specification: "50L Tank • 15 ft Air Throw",
    image: "/images/home/new-launches/havai-mighty-12.png",
    href: "/products/4",
  },
  {
    id: "5",
    name: "HAVAI Premium Glass Top GT 12",
    category: "Air Cooler",
    specification: "40L Tank • 160W Power",
    image: "/images/home/new-launches/havai-premium-glass-top-gt12.png",
    href: "/products/5",
  },
];

interface NewLaunchesProps {
  launches?: HomepageNewLaunch[];
  newLaunchBadgeDays?: number;
}

export function NewLaunches({ launches: _launches, newLaunchBadgeDays: _newLaunchBadgeDays }: NewLaunchesProps) {
  return (
    <section className="bg-white py-2">
      <Container>
        <SectionHeader
          title="New Launches"
          viewAllLabel="View All Launches"
          viewAllHref="/new-launches"
          className="mb-5"
        />

        <HorizontalCarousel scrollAmount={275}>
          {launches.map((item) => (
            <LaunchCard key={item.id} item={item} />
          ))}
        </HorizontalCarousel>
      </Container>
    </section>
  );
}

function LaunchCard({ item }: { item: (typeof launches)[number] }) {
  return (
    <div className="relative flex min-h-[315px] min-w-[245px] max-w-[245px] shrink-0 flex-col overflow-hidden rounded-[10px] border border-[#e4e5ed] bg-white px-4 pt-4 pb-4">
      <span className="absolute top-4 left-4 z-10 inline-flex rounded-[4px] bg-[#159447] px-2 py-[3px] font-bold text-[8px] text-white">
        New
      </span>

      <div className="relative mx-auto h-[170px] w-[175px]">
        <Image src={item.image} alt={item.name} fill sizes="175px" className="object-contain object-center" />
      </div>

      <div className="text-center">
        <h3 className="line-clamp-2 min-h-[20px] font-bold text-[#17159a] text-[13px] leading-[1.25]">{item.name}</h3>

        <p className="mt-1 font-medium text-[#555a70] text-[10px]">{item.category}</p>

        <p className="mt-1 font-medium text-[#555a70] text-[10px]">{item.specification}</p>
      </div>

      <Link
        href={item.href}
        className="mt-auto flex h-[36px] w-full items-center justify-center gap-3 rounded-[5px] bg-gradient-to-r from-[#1e35c7] to-[#243fe0] font-bold text-[10px] text-white transition hover:opacity-90"
      >
        Explore More
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
