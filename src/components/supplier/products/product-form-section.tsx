import type { ReactNode } from "react";

import { ChevronDown } from "lucide-react";

export function ProductFormSection({
  title,
  children,
  last = false,
}: {
  title: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div className={`py-4 ${last ? "" : "border-[#ececf3] border-b"}`}>
      <h2 className="mb-4 font-bold text-[#171570] text-[12px]">{title}</h2>

      {children}
    </div>
  );
}

export function ProductFormField({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-bold text-[#303558] text-[10px]">
        {label}

        {required ? <span className="ml-0.5 text-red-500">*</span> : null}
      </label>

      {children}
    </div>
  );
}

export function ProductSelectWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}

      <ChevronDown size={11} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#3024c8]" />
    </div>
  );
}

export const productInputClass =
  "h-[38px] w-full rounded-[5px] border border-[#dfe0eb] bg-white px-3 text-[8px] text-[#3d4260] outline-none transition placeholder:text-[#999daf] focus:border-[#3024ca]";

export const productSelectClass =
  "h-[38px] w-full appearance-none rounded-[5px] border border-[#dfe0eb] bg-white px-3 pr-8 text-[8px] text-[#3d4260] outline-none focus:border-[#3024ca]";

export const productTextareaClass =
  "min-h-[70px] w-full resize-none rounded-[5px] border border-[#dfe0eb] px-3 py-2 text-[8px] text-[#3d4260] outline-none placeholder:text-[#999daf] focus:border-[#3124ca]";
