import { ArrowRight, ListChecks, Mail, Search, UserRound } from "lucide-react";

import { Container } from "@/components/common/container";

const steps = [
  {
    step: "Step 1",
    title: "Search",
    description: "Search for products, companies or suppliers",
    icon: Search,
  },
  {
    step: "Step 2",
    title: "View Listings",
    description: "Explore verified listings and compare options",
    icon: ListChecks,
  },
  {
    step: "Step 3",
    title: "Send Inquiry",
    description: "Send inquiry to shortlisted suppliers or sellers",
    icon: Mail,
  },
  {
    step: "Step 4",
    title: "Connect",
    description: "Connect with suppliers and grow your business",
    icon: UserRound,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-4">
      <Container>
        <h2 className="mb-3 text-center font-bold text-[#17159a] text-[20px]">How CoolerGuru Works</h2>

        <div className="rounded-[10px] border border-[#ecebfa] bg-[#f8f7ff] px-4 py-4">
          <div className="overflow-x-auto">
            <div className="flex min-w-[850px] items-center justify-between gap-3">
              {steps.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={item.step} className="flex shrink-0 items-center gap-3">
                    <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[10px] border border-[#dcd8ff] bg-white text-[#3025d0]">
                      <Icon size={22} />
                    </div>

                    <div>
                      <p className="font-bold text-[9px] text-[#5a52c8]">
                        {item.step}
                      </p>

                      <h3 className="mt-[1px] font-bold text-[14px] text-[#17134d]">
                        {item.title}
                      </h3>

                      <p className="mt-[2px] max-w-[145px] text-[9px] leading-[1.35] text-[#6a6e86]">
                        {item.description}
                      </p>
                    </div>

                    {index < steps.length - 1 && (
                      <ArrowRight size={20} className="shrink-0 text-[#3c2fc9]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
