import Link from "next/link";

import { ArrowRight, Mail, Package, Store, UserRound } from "lucide-react";

import { Container } from "@/components/common/container";

const steps = [
  {
    title: "Create Account",
    description: "Sign up using your mobile number with OTP verification. It's quick and secure.",
    icon: UserRound,
  },
  {
    title: "Add Your Business",
    description: "Add your company details, address, contact information and complete your profile.",
    icon: Store,
  },
  {
    title: "Add Products / Services",
    description: "List your products or services with images, descriptions and specifications.",
    icon: Package,
  },
  {
    title: "Get Inquiries & Grow",
    description: "Your profile goes live and buyers start finding you. Receive inquiries and grow.",
    icon: Mail,
  },
];

export default function LandingPageSteps() {
  return (
    <section className="bg-white py-2">
      <Container>
        <div className="overflow-hidden rounded-[12px] bg-gradient-to-r from-[#171570] via-[#2118ad] to-[#3528d8] px-6 py-6 text-white">
          <div className="grid grid-cols-[270px_1fr] gap-8">
            <div>
              <h2 className="font-bold text-[27px] leading-[1.15]">List Your Company on CoolerGuru</h2>

              <p className="mt-3 max-w-[230px] text-[#d9d8ff] text-[11px] leading-[1.5]">
                Join thousands of suppliers already growing their businesses on CoolerGuru.
              </p>

              <Link
                href="/supplier/register"
                className="!text-[#2118ad] mt-5 inline-flex h-[36px] items-center justify-center gap-2 rounded-[5px] bg-white px-5 font-bold text-[11px]"
              >
                Start Selling Now
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-5">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className="relative text-center">
                    <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white">
                      <Icon size={25} className="text-[#2e24d5]" />
                    </div>

                    <p className="mt-3 font-bold text-[15px] text-white">{step.title}</p>

                    <p className="mx-auto mt-1 max-w-[160px] text-[#dddfff] text-[11px] leading-[1.5]">
                      {step.description}
                    </p>

                    {index < steps.length - 1 ? (
                      <div className="absolute top-[28px] right-[-18px] hidden w-[35px] border-[#9f9aef] border-t border-dashed xl:block" />
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
