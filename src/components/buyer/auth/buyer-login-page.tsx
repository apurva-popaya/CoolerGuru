import { Container } from "@/components/common/container";

import { BuyerLoginBenefits } from "./buyer-login-benefits";
import { BuyerOtpForm } from "./buyer-otp-form";

export function BuyerLoginPage() {
  return (
    <section className="bg-gradient-to-r from-[#fafaff] via-[#f7f6ff] to-[#f0efff] py-5">
      <Container>
        <div className="mt-3">
          <h1 className="font-bold text-[#171570] text-[28px]">Welcome Back!</h1>

          <p className="mt-1 text-[#5a6078] text-[11px]">Login to your CoolerGuru account to continue</p>
        </div>

        <div className="mx-auto mt-5 grid max-w-[980px] grid-cols-[1.05fr_0.95fr] gap-8 rounded-[12px] border border-[#e3e4ee] bg-white p-6 shadow-[0_8px_28px_rgba(25,20,110,0.06)]">
          <BuyerOtpForm mode="login" />

          <BuyerLoginBenefits />
        </div>
      </Container>
    </section>
  );
}
