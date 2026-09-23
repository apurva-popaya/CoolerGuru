import { ArrowRight, Mail, Send, Settings, UsersRound } from "lucide-react";

const steps = [
  {
    icon: <Send size={17} />,
    title: "Send Inquiry",
    description:
      'Click "Send Inquiry" to share your requirements with the supplier.',
  },
  {
    icon: <UsersRound size={17} />,
    title: "Supplier Reviews",
    description:
      "Supplier will review your inquiry and get back to you.",
  },
  {
    icon: <Mail size={17} />,
    title: "Response by Email/Dashboard",
    description:
      "You'll receive responses via email and in your dashboard.",
  },
  {
    icon: <Settings size={17} />,
    title: "Compare & Decide",
    description:
      "Compare quotes, details and choose the best option.",
  },
];

export function ProductNextSteps() {
  return (
    <div className="mt-4 rounded-[8px] bg-gradient-to-r from-[#f5f3ff] to-[#f1efff] px-4 py-4 sm:px-5 sm:py-3">
      <h2 className="font-bold text-[#171570] text-[13px]">
        What happens next?
      </h2>

      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center lg:gap-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex items-start gap-3"
          >
            <Step
              icon={step.icon}
              title={step.title}
              description={step.description}
            />

            {index < steps.length - 1 ? (
              <ArrowRight
                size={20}
                className="hidden shrink-0 self-center text-[#3828dd] lg:block"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function Step({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[6px] border border-[#dad7fa] bg-white text-[#3126d1]">
        {icon}
      </div>

      <div>
        <p className="font-bold text-[#171570] text-[8px]">{title}</p>

        <p className="mt-0.5 max-w-[190px] text-[#5c6078] text-[7px] leading-[1.4]">
          {description}
        </p>
      </div>
    </div>
  );
}