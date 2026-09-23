import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  description?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  viewAllLabel,
  viewAllHref,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`relative mb-4 ${className}`}>
      <div className="text-center">
        <h2 className="font-bold text-[#17159a] text-[20px] leading-[1.2] sm:text-[22px]">
          {title}
        </h2>

        {description ? (
          <p className="mt-1 px-2 font-medium text-[#686d84] text-[10px] leading-[1.4] sm:text-[11px]">
            {description}
          </p>
        ) : null}
      </div>

      {viewAllLabel && viewAllHref ? (
        <Link
          href={viewAllHref}
          className="
            mt-2 block text-center
            font-bold text-[#2118ad] text-[10px]
            lg:absolute lg:top-1/2 lg:right-0
            lg:mt-0 lg:block
            lg:-translate-y-1/2
          "
        >
          {viewAllLabel} →
        </Link>
      ) : null}
    </div>
  );
}