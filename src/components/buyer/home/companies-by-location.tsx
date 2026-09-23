import Image from "next/image";
import Link from "next/link";

import { MoreHorizontal } from "lucide-react";

import { Container } from "@/components/common/container";

const locations = [
  {
    city: "Ahmedabad",
    // count: "1000+ Companies",
    image: "/images/home/locations/ahmedabad.png",
  },
  {
    city: "Delhi",
    // count: "1500+ Companies",
    image: "/images/home/locations/delhi.png",
  },
  {
    city: "Mumbai",
    // count: "1600+ Companies",
    image: "/images/home/locations/mumbai.png",
  },
  {
    city: "Pune",
    // count: "800+ Companies",
    image: "/images/home/locations/pune.png",
  },
  {
    city: "Surat",
    // count: "800+ Companies",
    image: "/images/home/locations/surat.png",
  },
  {
    city: "Coimbatore",
    // count: "500+ Companies",
    image: "/images/home/locations/coimbatore.png",
  },
];

export function CompaniesByLocation() {
  return (
    <section className="bg-white py-3 sm:py-4">
      <Container>
        <h2 className="mb-4 px-2 text-center font-bold text-[#17159a] text-[19px] leading-[1.2] sm:text-[22px]">
          Find Companies by Location
        </h2>

        <div className="grid grid-cols-2 gap-y-5 gap-x-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-7">
          {locations.map((location) => (
            <Link
              key={location.city}
              href={`/companies?city=${encodeURIComponent(location.city)}`}
              className="flex min-w-0 flex-col items-center justify-center text-center"
            >
              <div className="relative h-[52px] w-[52px] sm:h-[58px] sm:w-[58px]">
                <Image
                  src={location.image}
                  alt={location.city}
                  fill
                  sizes="60px"
                  className="object-contain"
                />
              </div>

              <h3 className="mt-2 font-bold text-[#17159a] text-[12px] sm:text-[13px]">
                {location.city}
              </h3>

              {/* <p className="mt-[2px] font-medium text-[#6a6e87] text-[9px] sm:text-[10px]">
                {location.count}
              </p> */}
            </Link>
          ))}

          <Link
            href="/companies"
            className="flex flex-col items-center justify-center gap-2 text-center"
          >
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#dedcff] bg-white text-[#2b20c1] sm:h-[58px] sm:w-[58px]">
              <MoreHorizontal size={22} className="sm:h-[24px] sm:w-[24px]" />
            </div>

            <div>
              <h3 className="font-bold text-[#17159a] text-[10px]">More</h3>

              <p className="font-medium text-[#6a6e87] text-[8px]">
                Cities
              </p>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}