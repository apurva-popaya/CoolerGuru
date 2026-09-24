import { SafeImage } from "@/components/common/safe-image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Container } from "@/components/common/container";
import { HorizontalCarousel } from "@/components/common/horizontal-carousel";
import { SectionHeader } from "@/components/common/section-header";
import {
  getNewLaunches,
  type HomepageNewLaunch,
} from "@/lib/api/homepage-api";

export async function NewLaunches() {
  const launches = await getNewLaunches();

  return (
    <section className="bg-white py-2">
      <Container>
        <SectionHeader
          title="New Launches"
          viewAllLabel="View All Launches"
          viewAllHref="/new-launches"
          className="mb-4 sm:mb-5"
        />

        <HorizontalCarousel scrollAmount={275} className="gap-3">
          {launches.map((item) => (
            <LaunchCard key={item.id} item={item} />
          ))}
        </HorizontalCarousel>
      </Container>
    </section>
  );
}

function LaunchCard({
  item,
}: {
  item: HomepageNewLaunch;
}) {
  return (
    <div className="relative flex min-h-[315px] min-w-[245px] max-w-[245px] shrink-0 flex-col overflow-hidden rounded-[10px] border border-[#e4e5ed] bg-white px-4 pt-4 pb-4">
      <span className="absolute top-4 left-4 z-10 inline-flex rounded-[4px] bg-[#159447] px-2 py-[3px] font-bold text-[8px] text-white">
        New
      </span>

      <div className="relative mx-auto h-[170px] w-[175px]">
        <SafeImage
          src={item.image}
          alt={item.name}
          fill
          sizes="175px"
          className="object-contain object-center"
        />
      </div>

      <div className="text-center">
        <h3 className="line-clamp-2 min-h-[20px] font-bold text-[#17159a] text-[13px] leading-[1.25]">
          {item.name}
        </h3>

        <p className="mt-1 font-medium text-[#555a70] text-[10px]">
          {item.category}
        </p>

        <p className="mt-1 font-medium text-[#555a70] text-[10px]">
          {item.specification}
        </p>
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