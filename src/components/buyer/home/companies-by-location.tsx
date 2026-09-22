import Image from "next/image";
import Link from "next/link";

import { MoreHorizontal } from "lucide-react";

import { Container } from "@/components/common/container";

const locations = [
  {
    city: "Ahmedabad",
    count: "1000+ Companies",
    image: "/images/home/locations/ahmedabad.png",
  },
  {
    city: "Delhi",
    count: "1500+ Companies",
    image: "/images/home/locations/delhi.png",
  },
  {
    city: "Mumbai",
    count: "1600+ Companies",
    image: "/images/home/locations/mumbai.png",
  },
  {
    city: "Pune",
    count: "800+ Companies",
    image: "/images/home/locations/pune.png",
  },
  {
    city: "Surat",
    count: "800+ Companies",
    image: "/images/home/locations/surat.png",
  },
  {
    city: "Coimbatore",
    count: "500+ Companies",
    image: "/images/home/locations/coimbatore.png",
  },
];

export function CompaniesByLocation() {
  return (
    <section className="bg-white py-4">
      <Container>
        <h2 className="mb-4 text-center font-bold text-[#17159a] text-[22px]">Find Companies by Location</h2>

        <div className="grid grid-cols-4 gap-4 md:grid-cols-7">
          {locations.map((location) => (
            <Link
              key={location.city}
              href={`/companies?location=${encodeURIComponent(location.city)}`}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="relative h-[58px] w-[58px]">
                <Image src={location.image} alt={location.city} fill sizes="60px" className="object-contain" />
              </div>

              <h3 className="mt-2 font-bold text-[#17159a] text-[13px]">{location.city}</h3>

              <p className="mt-[2px] font-medium text-[#6a6e87] text-[10px]">{location.count}</p>
            </Link>
          ))}

          <Link href="/companies" className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#dedcff] bg-white text-[#2b20c1]">
              <MoreHorizontal size={24} />
            </div>

            <div>
              <h3 className="font-bold text-[#17159a] text-[10px]">More</h3>

              <p className="font-medium text-[#6a6e87] text-[8px]">Cities</p>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
