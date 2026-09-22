import Link from "next/link";

import { StatusBadge, type StatusVariant } from "@/components/common/status-badge";

export interface MiniTableColumn<T> {
  key: keyof T;
  label: string;
  className?: string;
}

interface OverviewMiniTableProps<T extends Record<string, string>> {
  title: string;
  columns: MiniTableColumn<T>[];
  data: T[];
  viewAllHref: string;
}

function getStatusVariant(status: string): StatusVariant {
  switch (status) {
    case "Pending":
      return "warning";

    case "Under Review":
    case "New":
      return "info";

    case "Replied":
      return "success";

    case "In Discussion":
      return "purple";

    case "Closed":
      return "neutral";

    case "Rejected":
      return "danger";

    default:
      return "neutral";
  }
}

export function OverviewMiniTable<T extends Record<string, string>>({
  title,
  columns,
  data,
  viewAllHref,
}: OverviewMiniTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[#e3e6f3] bg-white">
      <div className="flex h-[46px] items-center justify-between px-4">
        <h2 className="font-bold text-[#15136f] text-[14px]">{title}</h2>

        <Link href={viewAllHref} className="font-semibold text-[#2720a8] text-[11px]">
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#fafafe]">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`h-[34px] whitespace-nowrap px-3 text-left font-semibold text-[#15136f] text-[10px] ${column.className ?? ""}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-[#f0f1f6] border-t">
                {columns.map((column) => {
                  const value = row[column.key];

                  const isStatus = column.key === "status";

                  return (
                    <td
                      key={String(column.key)}
                      className={`h-[38px] whitespace-nowrap px-3 text-[#5d6280] text-[10px] ${column.className ?? ""}`}
                    >
                      {isStatus ? <StatusBadge variant={getStatusVariant(value)}>{value}</StatusBadge> : value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
