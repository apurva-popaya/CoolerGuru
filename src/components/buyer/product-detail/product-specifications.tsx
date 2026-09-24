import type {
  ProductDetail,
  ProductDetailSpecification,
} from "@/types/product-detail";

interface ProductSpecificationsProps {
  product: ProductDetail;
}

export function ProductSpecifications({
  product,
}: ProductSpecificationsProps) {
  const hasSpecifications =
    product.specificationsLeft.length > 0 ||
    product.specificationsRight.length > 0;

  return (
    <div className="rounded-[8px] border border-[#e2e3ee] bg-white p-3 sm:p-4">
      <h2 className="font-bold text-[#171570] text-[11px]">
        Specifications
      </h2>

      {hasSpecifications ? (
        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          <SpecColumn specs={product.specificationsLeft} />

          <SpecColumn specs={product.specificationsRight} />
        </div>
      ) : (
        <p className="mt-3 text-[#777b90] text-[9px]">
          No specifications available.
        </p>
      )}
    </div>
  );
}

function SpecColumn({
  specs,
}: {
  specs: ProductDetailSpecification[];
}) {
  return (
    <div className="space-y-2">
      {specs.map((spec, index) => (
        <div
          key={`${spec.label}-${index}`}
          className="grid grid-cols-[90px_1fr] gap-2 border-[#f0f0f5] border-b pb-1.5"
        >
          <span className="font-semibold text-[#565b75] text-[8px]">
            {spec.label}
          </span>

          <span className="font-medium text-[#353a5a] text-[8px]">
            {spec.value}
          </span>
        </div>
      ))}
    </div>
  );
}