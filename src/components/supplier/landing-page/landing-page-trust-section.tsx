import { BadgeCheck, MapPinned, Shield, ShieldCheck } from "lucide-react";

import { Container } from "@/components/common/container";

const trustItems = [
  {
    title: "Trusted by Businesses",
    description: "Thousands of suppliers trust CoolerGuru to grow their business every day.",
    icon: ShieldCheck,
  },
  {
    title: "High Quality Inquiries",
    description: "Get inquiries from verified buyers who are genuinely interested in your products.",
    icon: BadgeCheck,
  },
  {
    title: "Pan India Visibility",
    description: "Get visibility across India and expand your reach to new markets and customers.",
    icon: MapPinned,
  },
  {
    title: "Verified & Reliable Platform",
    description: "CoolerGuru is a trusted and verified platform for the cooling industry in India.",
    icon: Shield,
  },
];

export default function LandingPageTrustSection() {
  return (
    <section className="bg-white py-6">
      <Container>
        <div className="grid grid-cols-4 gap-4">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex min-h-[115px] items-center gap-3 rounded-[8px] border border-[#e2e3ee] bg-white p-4"
              >
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#f1efff]">
                  <Icon size={20} className="text-[#3024d0]" />
                </div>

                <div>
                  <h3 className="font-bold text-[#171570] text-[15px]">{item.title}</h3>

                  <p className="mt-1 text-[#666b83] text-[11px] leading-[1.55]">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
