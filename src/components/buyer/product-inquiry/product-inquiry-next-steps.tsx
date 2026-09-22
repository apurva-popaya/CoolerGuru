import { Mail, Scale, Send, UsersRound } from "lucide-react";

const steps = [
  {
    icon: <Send size={17} />,
    title: "1. Inquiry Submitted",
    description: "Your inquiry is sent securely to the supplier.",
  },
  {
    icon: <UsersRound size={17} />,
    title: "2. Supplier Reviews",
    description: "The supplier reviews your requirement and prepares the best possible response.",
  },
  {
    icon: <Mail size={17} />,
    title: "3. Response by Email / Dashboard",
    description: "You'll receive a response in your email and your CoolerGuru dashboard.",
  },
  {
    icon: <Scale size={17} />,
    title: "4. Compare & Decide",
    description: "Compare quotes, details and choose the best option for your business.",
  },
];

export function ProductInquiryNextSteps() {
  return (
    <div className="rounded-[10px] border border-[#e1e2ed] bg-white p-5">
      <h2 className="font-bold text-[#171570] text-[16px]">What happens next?</h2>

      <div className="mt-4 space-y-4">
        {steps.map((step, index) => (
          <div key={step.title} className="relative flex items-start gap-4">
            {index !== steps.length - 1 ? (
              <div className="absolute top-[39px] left-[20px] h-[34px] border-[#cfcaf8] border-l border-dashed" />
            ) : null}

            <div className="relative z-10 flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#f0edff] text-[#3427d7]">
              {step.icon}
            </div>

            <div className="pt-0.5">
              <h3 className="font-bold text-[#191574] text-[10px]">{step.title}</h3>

              <p className="mt-1 max-w-[270px] text-[#62677e] text-[8px] leading-[1.45]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
