import { BarChart3, Headphones, ShieldCheck, UsersRound } from "lucide-react";

import { Container } from "@/components/common/container";

const items = [
  {
    title: "Verified Suppliers",
    description: "Build trust with verified business profile",
    icon: ShieldCheck,
  },
  {
    title: "Quality Inquiries",
    description: "Receive genuine inquiries from buyers",
    icon: UsersRound,
  },
  {
    title: "Grow Business",
    description: "Increase visibility & grow your sales",
    icon: BarChart3,
  },
  {
    title: "Dedicated Support",
    description: "Get help from our support team",
    icon: Headphones,
  },
];

export default function SupplierRegistrationBenefits() {
  return (
    <section className="border-[#ececf3] border-t bg-white py-6">
      <Container>
        <div className="grid grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-center gap-4 px-6 ${index !== items.length - 1 ? "border-[#e3e4ee] border-r" : ""}`}
              >
                <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[#f1efff]">
                  <Icon size={21} className="text-[#3024cc]" />
                </div>

                <div>
                  <h3 className="font-bold text-[#2018ad] text-[9px]">{item.title}</h3>

                  <p className="mt-1 max-w-[150px] text-[#666b83] text-[7.5px] leading-[1.45]">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
