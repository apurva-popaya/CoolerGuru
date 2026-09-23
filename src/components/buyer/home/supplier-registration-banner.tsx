import Link from "next/link";

import {
  ArrowRight,
  PackagePlus,
  Store,
  UserRound,
} from "lucide-react";

import { Container } from "@/components/common/container";

const steps = [
  {
    title: "Create Account",
    description: "Sign up with your basic details in just 2 minutes",
    icon: UserRound,
  },
  {
    title: "Add Business",
    description: "Add your company details and business information",
    icon: Store,
  },
  {
    title: "Add Products / Services",
    description: "List your products & services and get discovered",
    icon: PackagePlus,
  },
];

export function SupplierRegistrationBanner() {
  return (
    <section className="bg-white pt-2 pb-4 sm:pb-5">
      <Container>
        <div className="relative overflow-hidden rounded-[10px] bg-gradient-to-r from-[#10136f] via-[#2420b8] to-[#111477] px-4 py-5 text-white sm:px-6">
          <div className="relative z-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-[250px_1fr] lg:gap-7">
            <div>
              <h2 className="font-bold text-[20px] leading-[1.05] sm:text-[22px]">
                Register for Free in
                <br />
                3 Simple Steps
              </h2>

              <p className="mt-2 max-w-[280px] text-[10px] text-white/80 leading-[1.4]">
                Join thousands of businesses already growing their presence on
                CoolerGuru.
              </p>

              <Link
                href="/supplier"
                className="mt-3 inline-flex items-center gap-2 rounded-[4px] bg-white px-4 py-[7px] font-bold text-[#201798] text-[11px] sm:px-5 sm:text-[12px]"
              >
                Start Selling Now
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center lg:gap-5">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className="contents">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-[#3126c9] shadow-[0_0_0_6px_rgba(255,255,255,0.08)] sm:h-[54px] sm:w-[54px]">
                        <Icon size={21} className="sm:h-[23px] sm:w-[23px]" />
                      </div>

                      <h3 className="mt-2 font-bold text-[13px] sm:text-[14px]">
                        {step.title}
                      </h3>

                      <p className="mt-[2px] max-w-[190px] text-[9px] text-white/75 leading-[1.35] sm:max-w-[145px]">
                        {step.description}
                      </p>
                    </div>

                    {index < steps.length - 1 ? (
                      <div className="hidden items-center lg:flex">
                        <div className="w-[65px] border-white/40 border-t border-dashed" />
                        <ArrowRight
                          size={13}
                          className="-ml-1 text-white/70"
                        />
                      </div>
                    ) : null}
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