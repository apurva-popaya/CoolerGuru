import { Container } from "@/components/common/container";

import { BuyerOtpForm } from "./buyer-otp-form";
import { BuyerRegisterHero } from "./buyer-register-hero";

export function BuyerRegisterPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#f7f6ff] via-[#f4f2ff] to-[#eceaff] px-10 pt-7">
      {/* Background decorations */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-[80px] -left-[90px] h-[370px] w-[370px] rounded-full border border-[#d7d3ff]/50" />

        <div className="absolute bottom-[110px] -left-[55px] h-[300px] w-[300px] rounded-full border border-[#dedbff]/50" />

        <div className="absolute top-[40px] left-[44%] h-[170px] w-[170px] opacity-25 [background-image:radial-gradient(#aaa4ff_2px,transparent_2px)] [background-size:14px_14px]" />
      </div>

      <Container>
        <div className="relative z-10 grid min-h-[585px] grid-cols-[1.15fr_0.85fr] items-stretch gap-0">
          <BuyerRegisterHero />

          <div className="pb-2">
            <BuyerOtpForm mode="register" />
          </div>
        </div>
      </Container>
    </section>
  );
}
