import { ArrowRight, Building2, Info, Mail, UserRound } from "lucide-react";

export function BuyerInquiryNextSteps() {
  return (
    <div className="mt-4 grid grid-cols-[1fr_1.25fr] items-center gap-5 rounded-[8px] border border-[#dddaf9] bg-[#f7f5ff] px-5 py-3">
      <div className="flex items-start gap-3">
        <Info size={16} className="mt-[1px] shrink-0 text-[#3326d8]" />

        <div>
          <p className="font-bold text-[#2118ad] text-[8px]">What happens next?</p>

          <p className="mt-1 max-w-[340px] text-[#62677e] text-[7px] leading-[1.45]">
            The supplier has received your inquiry and will review your requirement. They may contact you directly
            through the phone number or email you provided.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3">
        <Step icon={<Mail size={15} />} label="Inquiry Sent" />

        <ArrowRight size={15} className="text-[#4b3cdb]" />

        <Step icon={<UserRound size={15} />} label="Supplier Reviews" />

        <ArrowRight size={15} className="text-[#4b3cdb]" />

        <Step icon={<Building2 size={15} />} label="Response to Buyer" />
      </div>
    </div>
  );
}

function Step({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[5px] bg-white text-[#3326d8]">
        {icon}
      </div>

      <p className="mt-1 font-semibold text-[#424765] text-[6.5px]">{label}</p>
    </div>
  );
}
