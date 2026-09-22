const steps = ["Supplier receives your inquiry", "They review your requirement", "They contact you with details"];

export function InquiryNextSteps() {
  return (
    <div className="rounded-[10px] border border-[#e1e2ed] bg-gradient-to-br from-white to-[#f5f3ff] p-5">
      <h2 className="font-bold text-[#171570] text-[16px]">What happens next?</h2>

      <div className="mt-5 space-y-5">
        {steps.map((step, index) => (
          <div key={step} className="relative flex items-center gap-4">
            {index !== steps.length - 1 && (
              <div className="absolute top-[24px] left-[11px] h-[26px] w-px bg-[#d6d2fb]" />
            )}

            <div className="relative z-10 flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-full bg-[#4b3ed1] font-bold text-[9px] text-white">
              {index + 1}
            </div>

            <p className="font-medium text-[#454a70] text-[10px]">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
