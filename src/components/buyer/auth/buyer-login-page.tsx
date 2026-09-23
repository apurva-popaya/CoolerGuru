import { Container } from "@/components/common/container";

import { BuyerLoginBenefits } from "./buyer-login-benefits";
import { BuyerOtpForm } from "./buyer-otp-form";

export function BuyerLoginPage() {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-gradient-to-r from-[#fafaff] via-[#f7f6ff] to-[#f0efff] px-3 py-6 sm:px-5 sm:py-8 lg:px-0">
      <Container>
        <div className="pt-1 sm:pt-3">
          <h1 className="font-bold text-[#171570] text-[24px] sm:text-[28px]">
            Welcome Back!
          </h1>

          <p className="mt-1 text-[#5a6078] text-[10px] sm:text-[11px]">
            Login to your CoolerGuru account to continue
          </p>
        </div>

        <div className="mx-auto mt-5 grid w-full max-w-[980px] grid-cols-1 gap-5 rounded-[12px] border border-[#e3e4ee] bg-white p-3 shadow-[0_8px_28px_rgba(25,20,110,0.06)] sm:mt-6 sm:gap-6 sm:p-5 md:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Login Form */}
          <div className="min-w-0">
            <BuyerOtpForm mode="login" />
          </div>

          {/* Benefits */}
          <BuyerLoginBenefits />
        </div>
      </Container>
    </section>
  );
}