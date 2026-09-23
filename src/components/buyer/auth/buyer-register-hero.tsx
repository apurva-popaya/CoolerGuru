import Image from "next/image";

import { Bell, Package, ShieldCheck } from "lucide-react";

export function BuyerRegisterHero() {
  return (
    <div className="relative min-h-0 overflow-hidden px-1 py-4 sm:px-2 sm:py-6 lg:min-h-[585px] lg:py-0">
      <div className="relative z-20 max-w-[480px]">
        <h1 className="font-bold text-[#15145f] text-[30px] leading-[1.12] sm:text-[34px] lg:text-[38px]">
          Join India&apos;s
          <br />

          <span className="text-[#2d20bc]">
            Leading Air Cooler
            <br />
            Industry Network
          </span>
        </h1>

        <p className="mt-4 max-w-[420px] text-[#4d526e] text-[10px] leading-[1.65] sm:text-[11px] lg:text-[12px]">
          Create your buyer account to explore trusted companies, discover
          quality products, and stay updated with the latest launches.
        </p>

        <div className="mt-6 space-y-4 sm:mt-7 sm:space-y-5">
          <RegisterBenefit
            icon={<ShieldCheck size={22} />}
            title="Trusted Companies"
            description="Connect with verified manufacturers & suppliers"
          />

          <RegisterBenefit
            icon={<Package size={22} />}
            title="Wide Product Range"
            description="Explore thousands of products across all categories"
          />

          <RegisterBenefit
            icon={<Bell size={22} />}
            title="Latest Updates"
            description="Get notified about new products & industry trends"
          />
        </div>
      </div>

      {/* Desktop illustration */}
      <div className="pointer-events-none absolute right-0 bottom-0 z-10 hidden h-[300px] w-[425px] lg:block">
        <Image
          src="/images/home/hero/hero-coolers-registration.png"
          alt="Air coolers"
          fill
          priority
          sizes="425px"
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}

interface RegisterBenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function RegisterBenefit({
  icon,
  title,
  description,
}: RegisterBenefitProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[8px] border border-[#ccc7ff] bg-white/55 text-[#3326d7] sm:h-[48px] sm:w-[48px]">
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="font-bold text-[#2119a8] text-[10px] sm:text-[11px]">
          {title}
        </h3>

        <p className="mt-1 max-w-[260px] text-[#4f546f] text-[8px] leading-[1.45] sm:text-[9px]">
          {description}
        </p>
      </div>
    </div>
  );
}