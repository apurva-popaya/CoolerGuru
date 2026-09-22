import { ClipboardList, ShieldCheck, ShoppingBag, UsersRound } from "lucide-react";

export function BuyerLoginBenefits() {
  return (
    <div className="relative overflow-hidden rounded-[10px] bg-gradient-to-br from-[#f8f6ff] to-[#f0edff] px-7 py-6">
      {/* Illustration */}

      <div className="mx-auto flex h-[180px] max-w-[300px] items-center justify-center">
        <div className="relative">
          <div className="flex h-[110px] w-[160px] items-center justify-center rounded-[8px] border-[#7565da] border-[5px] bg-white shadow-sm">
            <div className="flex h-[58px] w-[75px] flex-col items-center justify-center rounded-[6px] bg-[#f0edff]">
              <UsersRound size={24} className="text-[#3b2ecb]" />

              <div className="mt-2 h-[5px] w-[38px] rounded bg-[#c8c1fb]" />

              <div className="mt-1 h-[5px] w-[28px] rounded bg-[#ddd9ff]" />
            </div>
          </div>

          <div className="absolute -top-5 left-1/2 flex h-[28px] w-[28px] -translate-x-1/2 items-center justify-center rounded-full bg-[#7765df] text-white">
            <ShieldCheck size={16} />
          </div>

          <div className="absolute -right-7 -bottom-3 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#5d47c9] text-white">
            <ShieldCheck size={28} />
          </div>
        </div>
      </div>

      <h2 className="mt-2 font-bold text-[#171570] text-[18px]">Why Login to CoolerGuru?</h2>

      <div className="mt-5 space-y-5">
        <LoginBenefit
          icon={<ShoppingBag size={18} />}
          title="Explore Thousands of Products"
          description="Find the best cooling solutions from verified manufacturers."
        />

        <LoginBenefit
          icon={<UsersRound size={18} />}
          title="Connect with Trusted Suppliers"
          description="Send inquiries and get the best quotes."
        />

        <LoginBenefit
          icon={<ClipboardList size={18} />}
          title="Save & Track Inquiries"
          description="Manage your inquiries and get updates in one place."
        />
      </div>
    </div>
  );
}

interface LoginBenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function LoginBenefit({ icon, title, description }: LoginBenefitProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#e8e3ff] text-[#3a2cd1]">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-[#1c196c] text-[10px]">{title}</h3>

        <p className="mt-1 max-w-[260px] text-[#61667d] text-[8px] leading-[1.5]">{description}</p>
      </div>
    </div>
  );
}
