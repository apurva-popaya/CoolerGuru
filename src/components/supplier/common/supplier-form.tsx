import type { ReactNode } from "react";

interface FormCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function SupplierFormCard({ title, description, children, className = "" }: FormCardProps) {
  return (
    <section className={`rounded-[9px] border border-[#e1e2ed] bg-white p-5 ${className}`}>
      <div className="mb-4">
        <h2 className="font-bold text-[#171570] text-[13px]">{title}</h2>

        {description ? <p className="mt-1 text-[#777b92] text-[9px] leading-[1.45]">{description}</p> : null}
      </div>

      {children}
    </section>
  );
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  description?: string;
  children: ReactNode;
}

export function SupplierFormField({ label, required = false, description, children }: FormFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block font-bold text-[#292e55] text-[10px]">
        {label}

        {required ? <span className="ml-0.5 text-red-500">*</span> : null}
      </label>

      {children}

      {description ? <p className="mt-1 text-[#85899f] text-[7.5px] leading-[1.45]">{description}</p> : null}
    </div>
  );
}

export const supplierInputClass =
  "h-[40px] w-full rounded-[5px] border border-[#dfe0eb] bg-white px-3 text-[9px] text-[#3d4260] outline-none transition placeholder:text-[#9a9daf] focus:border-[#3829d6]";

export const supplierTextareaClass =
  "min-h-[105px] w-full resize-none rounded-[5px] border border-[#dfe0eb] bg-white px-3 py-3 text-[9px] leading-[1.5] text-[#3d4260] outline-none transition placeholder:text-[#9a9daf] focus:border-[#3829d6]";

export function SupplierSectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="border-[#ececf3] border-b pb-2">
      <h3 className="font-bold text-[#2118ad] text-[9px]">{children}</h3>
    </div>
  );
}
