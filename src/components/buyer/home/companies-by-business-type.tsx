import Link from "next/link";

import {
  Boxes,
  Factory,
  Handshake,
  PackageCheck,
  Store,
  UserRound,
} from "lucide-react";

import { Container } from "@/components/common/container";

const businessTypes = [
  {
    title: "Manufacturers",
    count: "2000+ Companies",
    href: "/companies?businessType=manufacturer",
    icon: Factory,
  },
  {
    title: "Distributors",
    count: "1500+ Companies",
    href: "/companies?businessType=distributor",
    icon: PackageCheck,
  },
  {
    title: "Exporters",
    count: "300+ Companies",
    href: "/companies?businessType=exporter",
    icon: UserRound,
  },
  {
    title: "Suppliers",
    count: "3000+ Companies",
    href: "/companies?businessType=supplier",
    icon: Store,
  },
  {
    title: "OEMs",
    count: "500+ Companies",
    href: "/companies?businessType=oem",
    icon: Boxes,
  },
  {
    title: "Wholesalers",
    count: "300+ Companies",
    href: "/companies?businessType=wholesaler",
    icon: Handshake,
  },
];

export function CompaniesByBusinessType() {
  return (
    <section className="bg-white py-3 sm:py-4">
      <Container>
        <h2 className="mb-4 px-2 text-center font-bold text-[#17159a] text-[19px] leading-[1.2] sm:text-[22px]">
          Find Companies by Business Type
        </h2>

        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {businessTypes.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex min-w-0 items-center gap-2 rounded-[10px] border border-transparent px-2 py-2.5 transition hover:border-[#dedcff] hover:bg-[#faf9ff] sm:gap-3 sm:px-3 sm:py-3"
              >
                <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#f1efff] text-[#2920c1] sm:h-[40px] sm:w-[40px]">
                  <Icon size={17} className="sm:h-[19px] sm:w-[19px]" strokeWidth={2} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-bold text-[#17159a] text-[11px] sm:text-[13px]">
                    {item.title}
                  </h3>

                  <p className="mt-[2px] truncate font-medium text-[#6a6e87] text-[8px] sm:text-[10px]">
                    {item.count}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}