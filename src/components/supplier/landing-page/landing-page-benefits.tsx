import { MessageCircle, Package, TrendingUp, UsersRound } from "lucide-react";

import { Container } from "@/components/common/container";

const benefits = [
  {
    title: "Reach Verified Buyers",
    description: "Connect with thousands of verified buyers actively looking for cooling solutions.",
    icon: UsersRound,
  },
  {
    title: "Grow Your Business",
    description: "Increase visibility, build trust and generate more business opportunities.",
    icon: TrendingUp,
  },
  {
    title: "Showcase Products",
    description: "Display your products and services with images, details and specifications.",
    icon: Package,
  },
  {
    title: "Get Quality Inquiries",
    description: "Receive genuine inquiries from serious buyers across India.",
    icon: MessageCircle,
  },
];

export default function LandingPageBenefits() {
  return (
    <section className="bg-white py-6">
      <Container>
        <div className="grid grid-cols-4 gap-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="flex min-h-[120px] items-center gap-3 rounded-[8px] border border-[#e2e3ee] bg-white p-4"
              >
                <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#f0efff]">
                  <Icon size={20} className="text-[#3024cf]" />
                </div>

                <div>
                  <h3 className="font-bold text-[#171570] text-[18px]">{benefit.title}</h3>

                  <p className="mt-1 text-[#666b83] text-[11px] leading-[1.55]">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
