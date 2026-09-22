import Image from "next/image";
import Link from "next/link";

import { BadgeCheck, ExternalLink, MapPin, Package, Container as TankIcon, Wind, Zap } from "lucide-react";

import type { ProductDetail } from "@/types/product-detail";

interface ProductInquirySummaryProps {
  product: ProductDetail;
}

export function ProductInquirySummary({ product }: ProductInquirySummaryProps) {
  const airflow = product.highlightSpecs.find((item) => item.label === "Airflow")?.value ?? "-";
  const tank = product.highlightSpecs.find((item) => item.label === "Tank Capacity")?.value ?? "-";
  const power = product.highlightSpecs.find((item) => item.label === "Power")?.value ?? "-";
  const moq = product.highlightSpecs.find((item) => item.label === "MOQ")?.value ?? "-";

  return (
    <div className="rounded-[10px] border border-[#e1e2ed] bg-white p-5">
      <h2 className="font-bold text-[#171570] text-[16px]">Product Summary</h2>

      <div className="mt-4 grid grid-cols-[135px_1fr] gap-4">
        <div className="relative h-[150px] w-[135px]">
          <Image src={product.images[0]} alt={product.name} fill sizes="135px" className="object-contain" />
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-[#171570] text-[17px] leading-[1.25]">{product.name}</h3>

          <div className="mt-3 flex items-center gap-2">
            <div className="relative h-[28px] w-[28px] shrink-0">
              <Image src={product.companyLogo} alt={product.companyName} fill sizes="28px" className="object-contain" />
            </div>

            <span className="font-bold text-[#252174] text-[9px]">{product.companyName}</span>

            {product.isVerifiedSupplier ? <BadgeCheck size={12} className="fill-[#159447] text-white" /> : null}
          </div>

          <div className="mt-2 flex items-center gap-1.5">
            <MapPin size={11} className="text-[#3025cf]" />

            <span className="text-[#656a82] text-[8px]">{product.companyLocation}</span>
          </div>

          <div className="mt-4 space-y-2 border-[#e6e7ef] border-t pt-3">
            <SummarySpec icon={<Wind size={12} />} label="Airflow" value={airflow} />

            <SummarySpec icon={<TankIcon size={12} />} label="Tank Capacity" value={tank} />

            <SummarySpec icon={<Zap size={12} />} label="Power" value={power} />

            <SummarySpec icon={<Package size={12} />} label="MOQ" value={moq} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Link
          href={`/products/${product.id}`}
          className="!text-[#251bb4] flex h-[34px] min-w-[200px] items-center justify-center gap-2 rounded-[4px] border border-[#3929dc] bg-white font-bold text-[9px] transition hover:bg-[#f6f5ff]"
        >
          View Product Page
          <ExternalLink size={11} />
        </Link>
      </div>
    </div>
  );
}

function SummarySpec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="grid grid-cols-[18px_105px_1fr] items-center gap-2">
      <span className="text-[#3025cf]">{icon}</span>

      <span className="text-[#5d627b] text-[8px]">{label}</span>

      <span className="font-semibold text-[#34395b] text-[8px]">{value}</span>
    </div>
  );
}
