import Image from "next/image";

import { Bell, Package, ShieldCheck } from "lucide-react";

export function BuyerRegisterHero() {
  return (
    <div className="relative min-h-[585px]">
      <div className="relative z-20 max-w-[480px]">
        <h1 className="font-bold text-[#15145f] text-[38px] leading-[1.12]">
          Join India&apos;s
          <br />
          <span className="text-[#2d20bc]">
            Leading Air Cooler
            <br />
            Industry Network
          </span>
        </h1>

        <p className="mt-4 max-w-[420px] text-[#4d526e] text-[12px] leading-[1.65]">
          Create your buyer account to explore trusted companies, discover quality products, and stay updated with the
          latest launches.
        </p>

        <div className="mt-7 space-y-5">
          <RegisterBenefit
            icon={<ShieldCheck size={23} />}
            title="Trusted Companies"
            description="Connect with verified manufacturers & suppliers"
          />

          <RegisterBenefit
            icon={<Package size={23} />}
            title="Wide Product Range"
            description="Explore thousands of products across all categories"
          />

          <RegisterBenefit
            icon={<Bell size={23} />}
            title="Latest Updates"
            description="Get notified about new products & industry trends"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute right-[5px] bottom-0 z-10 h-[300px] w-[425px]">
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

function RegisterBenefit({ icon, title, description }: RegisterBenefitProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[8px] border border-[#ccc7ff] bg-white/55 text-[#3326d7]">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-[#2119a8] text-[11px]">{title}</h3>

        <p className="mt-1 max-w-[220px] text-[#4f546f] text-[9px] leading-[1.45]">{description}</p>
      </div>
    </div>
  );
}
