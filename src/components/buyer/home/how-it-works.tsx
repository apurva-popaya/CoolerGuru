import {
  ArrowRight,
  ListChecks,
  Mail,
  Search,
  UserRound,
} from "lucide-react";

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
        <h2 className="mb-3 text-center font-bold text-[#17159a] text-[19px] sm:text-[20px]">
          How CoolerGuru Works
        </h2>

        <div className="rounded-[10px] border border-[#ecebfa] bg-[#f8f7ff] px-3 py-3 sm:px-4 sm:py-4">
          <div className="overflow-x-auto overscroll-x-contain">
            <div className="flex min-w-[720px] items-center justify-between gap-3 sm:min-w-[850px]">
              {steps.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.step}
                    className="flex shrink-0 items-center gap-2 sm:gap-3"
                  >
                    <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[10px] border border-[#dcd8ff] bg-white text-[#3025d0] sm:h-[48px] sm:w-[48px]">
                      <Icon size={20} className="sm:h-[22px] sm:w-[22px]" />
                    </div>

                    <div>
                      <p className="font-bold text-[8px] text-[#5a52c8] sm:text-[9px]">
                        {item.step}
                      </p>

                      <h3 className="mt-[1px] font-bold text-[#17134d] text-[13px] sm:text-[14px]">
                        {item.title}
                      </h3>

                      <p className="mt-[2px] max-w-[125px] text-[8px] leading-[1.35] text-[#6a6e86] sm:max-w-[145px] sm:text-[9px]">
                        {item.description}
                      </p>
                    </div>

                    {index < steps.length - 1 && (
                      <ArrowRight
                        size={18}
                        className="shrink-0 text-[#3c2fc9] sm:h-[20px] sm:w-[20px]"
                      />
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