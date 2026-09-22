interface InquiryRequirementDetailsProps {
  details: {
    label: string;
    value: string;
  }[];
}

export function InquiryRequirementDetails({ details }: InquiryRequirementDetailsProps) {
  return (
    <div className="rounded-[9px] border border-[#e1e2ed] bg-white p-4">
      <h2 className="font-bold text-[#171570] text-[13px]">Requirement Details</h2>

      <div className="mt-3">
        {details.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[180px_1fr] gap-4 border-[#ececf3] border-b py-2 last:border-b-0"
          >
            <span className="font-semibold text-[#3d4260] text-[9px]">{item.label}</span>

            <span className="text-[#555b76] text-[9px]">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
