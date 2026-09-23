import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Fan, Snowflake } from "lucide-react";

import { Container } from "@/components/common/container";

const otherCategories = [
  {
    title: "Air Conditioners",
    description: "Explore cooling systems for homes and businesses.",
    image: "/images/home/categories/air-conditioner.png",
    href: "/categories/air-conditioners",
    icon: "ac",
  },
  {
    title: "Fan Coolers",
    description: "Browse fast-moving cooling and ventilation options.",
    image: "/images/home/categories/fan-image.png",
    href: "/categories/fan-coolers",
    icon: "fan",
  },
];

export function OtherCategories() {
  return (
    <section className="bg-white pb-4 sm:pb-5">
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {otherCategories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CategoryCard({
  category,
}: {
  category: (typeof otherCategories)[number];
}) {
  return (
    <div className="relative min-h-[155px] overflow-hidden rounded-[12px] border border-[#dddaf8] bg-[#fbfaff] px-4 sm:px-5">
      <div className="pointer-events-none absolute right-[-20px] bottom-[-70px] h-[180px] w-[380px] rounded-[50%] bg-[#e5e0ff]/70" />

      <div className="pointer-events-none absolute right-[40px] bottom-[-110px] h-[180px] w-[360px] rounded-[50%] border border-[#d4cdff]/60" />

      <div className="pointer-events-none absolute right-[90px] bottom-[-125px] h-[185px] w-[330px] rounded-[50%] border border-[#ded8ff]/70" />

      <div className="absolute top-1/2 left-4 z-10 -translate-y-1/2 sm:left-5">
        <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-gradient-to-br from-[#8d78ff] to-[#4a36df] text-white shadow-[0_0_0_7px_rgba(226,221,255,0.75)] sm:h-[62px] sm:w-[62px] sm:shadow-[0_0_0_9px_rgba(226,221,255,0.75)]">
          {category.icon === "ac" ? (
            <Snowflake size={24} className="sm:h-[29px] sm:w-[29px]" />
          ) : (
            <Fan size={24} className="sm:h-[29px] sm:w-[29px]" />
          )}
        </div>
      </div>

      <div className="absolute top-1/2 left-[88px] z-10 w-[calc(100%-175px)] -translate-y-1/2 sm:left-[115px] sm:w-[245px]">
        <h3 className="font-bold text-[#17134d] text-[15px] sm:text-[18px]">
          {category.title}
        </h3>

        <p className="mt-1 text-[#676a86] text-[10px] leading-[1.35] sm:text-[12px]">
          {category.description}
        </p>

        <Link
          href={category.href}
          className="mt-2 inline-flex items-center gap-2 font-bold text-[#2d20c6] text-[10px] sm:gap-3 sm:text-[12px]"
        >
          Explore
          <ArrowRight size={13} className="sm:h-[15px] sm:w-[15px]" />
        </Link>
      </div>

      <div className="pointer-events-none absolute top-1/2 right-[-25px] z-10 hidden -translate-y-1/2 lg:right-[18px] lg:block">
        <Image
          src={category.image}
          alt={category.title}
          width={280}
          height={190}
          className="h-[125px] w-auto max-w-none object-contain sm:h-[145px]"
        />
      </div>
    </div>
  );
}