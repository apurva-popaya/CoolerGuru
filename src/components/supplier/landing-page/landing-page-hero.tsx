import Image from "next/image";
import Link from "next/link";

import { ArrowRight, CheckCircle2 } from "lucide-react";

import { WideContainer } from "@/components/common/wide-container";

export default function LandingPageHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#eef2ff] via-[#f8f9ff] to-[#e7ecff]">
      <WideContainer>
        <div className="grid grid-cols-[0.95fr_1.05fr] items-center gap-3">
          <div className="max-w-[680px] pl-10">
            <h1 className="font-bold text-[#171570] text-[50px] leading-[1.08]">
              Grow Your Business
              <br />
              with <span className="text-[#2e25dd]">CoolerGuru</span>
            </h1>

            <h2 className="mt-3 font-bold text-[#3125d7] text-[22px]">Reach Verified Buyers Across India</h2>

            <p className="mt-3 max-w-[560px] text-[#4f5572] text-[13px] leading-[1.55]">
              List your company, showcase your products, complete your profile and receive quality inquiries from
              serious buyers.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <Link
                href="/supplier/register"
                className="!text-white flex h-[42px] min-w-[160px] items-center justify-center gap-2 rounded-[6px] bg-[#2116a5] px-5 font-bold text-[12px] transition hover:bg-[#3122d0]"
              >
                Register / Login
                <ArrowRight size={13} />
              </Link>

              <Link
                href="/supplier/login"
                className="!text-[#2118ad] flex h-[42px] min-w-[170px] items-center justify-center gap-2 rounded-[6px] border border-[#bfc2e8] bg-white px-5 font-bold text-[12px] transition hover:bg-[#f7f6ff]"
              >
                Login to Your Account
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-[#3125d7]" />

              <span className="font-semibold text-[#555a76] text-[10px]">100% Free Registration</span>
            </div>
          </div>

          <div className="relative flex min-h-[300px] items-center justify-center">
            <div className="relative h-[350px] w-[600px]">
              <Image
                src="/images/supplier/landing/supplier-hero-products.png"
                alt="Cooling industry products"
                fill
                priority
                sizes="620px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </WideContainer>
    </section>
  );
}
