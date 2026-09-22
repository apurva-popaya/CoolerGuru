import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  description?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  className?: string;
}

export function SectionHeader({ title, description, viewAllLabel, viewAllHref, className = "" }: SectionHeaderProps) {
  return (
    <div className={`relative mb-4 ${className}`}>
      <div className="text-center">
        <h2 className="font-bold text-[#17159a] text-[22px]">{title}</h2>

        {description ? <p className="mt-1 font-medium text-[#686d84] text-[11px]">{description}</p> : null}
      </div>

      {viewAllLabel && viewAllHref ? (
        <Link
          href={viewAllHref}
          className="absolute top-1/2 right-0 -translate-y-1/2 font-bold text-[#2118ad] text-[10px]"
        >
          {viewAllLabel} →
        </Link>
      ) : null}
    </div>
  );
}
