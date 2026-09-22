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

        <div className="rounded-[10px] border border-[#ecebfa] bg-[#f8f7ff] px-5 py-4">
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-3">
            {steps.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.step} className="contents">
                  <div className="flex items-center gap-3">
                    <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[10px] border border-[#dcd8ff] bg-white text-[#3025d0]">
                      <Icon size={22} />
                    </div>

                    <div>
                      <p className="font-bold text-[#5a52c8] text-[9px]">{item.step}</p>

                      <h3 className="mt-[1px] font-bold text-[#17134d] text-[14px]">{item.title}</h3>

                      <p className="mt-[2px] max-w-[145px] text-[#6a6e86] text-[9px] leading-[1.35]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {index < steps.length - 1 ? <ArrowRight size={20} className="text-[#3c2fc9]" /> : null}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
