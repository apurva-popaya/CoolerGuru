import Link from "next/link";

import { Boxes, Factory, Handshake, PackageCheck, Store, UserRound } from "lucide-react";

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
    <section className="bg-white py-4">
      <Container>
        <h2 className="mb-4 text-center font-bold text-[#17159a] text-[22px]">Find Companies by Business Type</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-6 xl:grid-cols-6">
          {businessTypes.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 rounded-[10px] border border-transparent px-3 py-3 transition hover:border-[#dedcff] hover:bg-[#faf9ff]"
              >
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#f1efff] text-[#2920c1]">
                  <Icon size={19} strokeWidth={2} />
                </div>

                <div>
                  <h3 className="font-bold text-[#17159a] text-[13px]">{item.title}</h3>

                  <p className="mt-[2px] font-medium text-[#6a6e87] text-[10px]">{item.count}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
