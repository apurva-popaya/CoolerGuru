"use client";

import { type ReactNode, useEffect, useState } from "react";

import Link from "next/link";

import { FileText, Loader2, Pencil, PlayCircle, Power, RotateCcw, Star } from "lucide-react";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api/get-api-error-message";
import {
  deactivateSellerProduct,
  getSellerProduct,
  restoreSellerProduct,
  type SellerProduct,
} from "@/lib/api/seller-products-api";

import {
  ApprovalBadge,
  formatProductDate,
  formatProductPrice,
  getPrimaryImage,
  ProductImage,
  ProductStatusBadge,
  StockBadge,
} from "./product-display";

export function SupplierProductDetailPage({ slug }: { slug: string }) {
  const [product, setProduct] = useState<SellerProduct | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmingDeactivate, setIsConfirmingDeactivate] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const loadProduct = async () => {
    try {
      const response = await getSellerProduct(slug);
      const loadedProduct = response.data?.product ?? null;

      setProduct(loadedProduct);
      setSelectedImageUrl((current) => current ?? (loadedProduct ? getPrimaryImage(loadedProduct)?.image_url : undefined));
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: reload only when the slug changes
  useEffect(() => {
    loadProduct();
  }, [slug]);

  const handleDeactivate = async () => {
    setIsUpdatingStatus(true);

    try {
      await deactivateSellerProduct(slug);
      toast.success("Product deactivated. It is no longer visible to buyers.");
      setIsConfirmingDeactivate(false);
      await loadProduct();
    } catch (requestError) {
      toast.error(getApiErrorMessage(requestError));
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleRestore = async () => {
    setIsUpdatingStatus(true);

    try {
      await restoreSellerProduct(slug);
      toast.success("Product restored.");
      await loadProduct();
    } catch (requestError) {
      toast.error(getApiErrorMessage(requestError));
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (isLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center gap-2 px-7 py-6 text-[#555b76] text-[12px]">
        <Loader2 size={18} className="animate-spin text-[#3125c8]" />
        Loading product...
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="px-7 py-6">
        <BackLink />

        <div className="rounded-[9px] border border-[#f0c3ca] bg-[#fff7f8] px-5 py-4">
          <p className="font-bold text-[#db3e57] text-[12px]">Could not load this product</p>
          <p className="mt-1 text-[#555b76] text-[9px]">{error ?? "Product not found."}</p>
        </div>
      </section>
    );
  }

  const specifications = [...(product.specifications ?? [])].sort((first, second) => first.sort_order - second.sort_order);

  const details: [string, string | null | undefined][] = [
    ["Category", product.category?.name],
    ["SKU", product.sku],
    ["Model Number", product.model_number],
    ["Brand", product.brand],
    ["HSN Code", product.hsn_code],
    ["Product Type", product.product_type],
    ["Application / Usage", product.application_usage],
    [
      "Cooling Capacity",
      product.cooling_capacity ? `${product.cooling_capacity} ${product.cooling_capacity_unit ?? ""}`.trim() : null,
    ],
    ["Power / Motor", product.power_motor],
    ["Voltage / Frequency", product.voltage_frequency],
    ["Material", product.material],
    ["Dimensions", product.dimensions],
    ["Weight", product.weight ? `${Number(product.weight)} ${product.weight_unit ?? ""}`.trim() : null],
    ["Color / Finish", product.color_finish],
  ];

  const filledDetails = details.filter(([, value]) => value);

  return (
    <section className="px-7 py-6">
      <BackLink />

      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-5">
        <div className="min-w-0">
          <h1 className="font-bold text-[#171570] text-[26px]">{product.name}</h1>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <ProductStatusBadge isActive={product.is_active} />
            <ApprovalBadge status={product.approval_status} />
            <StockBadge status={product.availability_status} />
          </div>

          <p className="mt-2 text-[#777b92] text-[9px]">
            Added {formatProductDate(product.created_at)} · Last updated {formatProductDate(product.updated_at)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {product.is_active ? (
            isConfirmingDeactivate ? (
              <div className="flex items-center gap-2 rounded-[6px] border border-[#f0c3ca] bg-[#fff7f8] px-3 py-1.5">
                <span className="text-[#555b76] text-[8px]">Hide this product from buyers?</span>

                <button
                  type="button"
                  onClick={handleDeactivate}
                  disabled={isUpdatingStatus}
                  className="flex h-[28px] items-center gap-1 rounded-[4px] bg-[#db3e57] px-3 font-bold text-[8px] text-white disabled:opacity-50"
                >
                  {isUpdatingStatus ? <Loader2 size={10} className="animate-spin" /> : null}
                  Deactivate
                </button>

                <button
                  type="button"
                  onClick={() => setIsConfirmingDeactivate(false)}
                  disabled={isUpdatingStatus}
                  className="h-[28px] px-2 font-semibold text-[#555b76] text-[8px]"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsConfirmingDeactivate(true)}
                className="flex h-[36px] items-center gap-2 rounded-[5px] border border-[#f0c3ca] bg-white px-4 font-semibold text-[#db3e57] text-[9px] transition hover:bg-[#fff7f8]"
              >
                <Power size={12} />
                Deactivate
              </button>
            )
          ) : (
            <button
              type="button"
              onClick={handleRestore}
              disabled={isUpdatingStatus}
              className="flex h-[36px] items-center gap-2 rounded-[5px] border border-[#bde5c9] bg-white px-4 font-semibold text-[#208b43] text-[9px] transition hover:bg-[#f4fcf7] disabled:opacity-50"
            >
              {isUpdatingStatus ? <Loader2 size={12} className="animate-spin" /> : <RotateCcw size={12} />}
              Restore
            </button>
          )}

          <Link
            href={`/supplier/dashboard/products/${product.slug}/edit`}
            className="!text-white flex h-[36px] items-center gap-2 rounded-[5px] bg-[#2619bd] px-4 font-bold text-[9px] transition hover:bg-[#3325db]"
          >
            <Pencil size={12} />
            Edit Product
          </Link>
        </div>
      </div>

      {product.approval_status === "REJECTED" && product.approval_note ? (
        <div className="mb-4 rounded-[8px] border border-[#f0c3ca] bg-[#fff7f8] px-4 py-3">
          <p className="font-bold text-[#db3e57] text-[10px]">Rejected by admin</p>
          <p className="mt-1 text-[#555b76] text-[9px]">Reason: {product.approval_note}</p>
        </div>
      ) : null}

      <div className="grid grid-cols-[1fr_1.4fr] gap-4">
        {/* Gallery */}
        <Card>
          <div className="relative h-[300px] overflow-hidden rounded-[7px] border border-[#e3e4ed] bg-[#fafafa]">
            <ProductImage src={selectedImageUrl} alt={product.name} className="object-contain p-4" />
          </div>

          {product.images.length > 1 ? (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {product.images.map((image) => (
                <button
                  key={image.product_image_id}
                  type="button"
                  onClick={() => setSelectedImageUrl(image.image_url)}
                  className={`relative h-[60px] overflow-hidden rounded-[5px] border bg-[#fafafa] ${selectedImageUrl === image.image_url ? "border-[#3024c8]" : "border-[#e3e4ed]"}`}
                >
                  <ProductImage src={image.image_url} alt={image.alt_text ?? product.name} />

                  {image.is_primary ? (
                    <Star size={9} className="absolute top-1 right-1 fill-[#3024c8] text-[#3024c8]" />
                  ) : null}
                </button>
              ))}
            </div>
          ) : null}
        </Card>

        {/* Overview */}
        <Card>
          <p className="font-bold text-[#171570] text-[20px]">{formatProductPrice(product)}</p>

          {product.price_unit ? <p className="text-[#777b92] text-[8px]">per {product.price_unit}</p> : null}

          <div className="mt-4 grid grid-cols-3 gap-3">
            <Stat label="MOQ" value={product.moq ? `${product.moq} ${product.moq_unit ?? ""}` : "-"} />
            <Stat
              label="In Stock"
              value={product.stock_quantity !== null ? `${product.stock_quantity} ${product.stock_unit ?? ""}` : "-"}
            />
            <Stat label="Category" value={product.category?.name ?? "-"} />
          </div>

          {product.short_description ? (
            <p className="mt-4 text-[#3d4260] text-[10px] leading-[1.6]">{product.short_description}</p>
          ) : null}

          {product.highlights.length > 0 ? (
            <ul className="mt-3 list-inside list-disc space-y-1 text-[#555b76] text-[9px]">
              {product.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          ) : null}

          {product.available_colors.length > 0 ? (
            <div className="mt-4">
              <p className="mb-1.5 font-bold text-[#303558] text-[9px]">Available Colors</p>
              <Chips items={product.available_colors} />
            </div>
          ) : null}

          {product.video_url || product.catalogue_url ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.video_url ? (
                <a
                  href={product.video_url}
                  target="_blank"
                  rel="noreferrer"
                  className="!text-[#3024c8] flex h-[30px] items-center gap-1.5 rounded-[5px] border border-[#d8d9e9] px-3 font-semibold text-[8px]"
                >
                  <PlayCircle size={12} />
                  Product Video
                </a>
              ) : null}

              {product.catalogue_url ? (
                <a
                  href={product.catalogue_url}
                  target="_blank"
                  rel="noreferrer"
                  className="!text-[#3024c8] flex h-[30px] items-center gap-1.5 rounded-[5px] border border-[#d8d9e9] px-3 font-semibold text-[8px]"
                >
                  <FileText size={12} />
                  Brochure / Datasheet
                </a>
              ) : null}
            </div>
          ) : null}
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <Card title="Product Details">
          {filledDetails.length > 0 ? (
            <dl className="divide-y divide-[#ededf3]">
              {filledDetails.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[140px_1fr] gap-3 py-2 text-[9px]">
                  <dt className="font-semibold text-[#6e738b]">{label}</dt>
                  <dd className="text-[#30355c]">{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <EmptyText>No details added.</EmptyText>
          )}
        </Card>

        <Card title="Specifications">
          {specifications.length > 0 ? (
            <dl className="divide-y divide-[#ededf3]">
              {specifications.map((specification) => (
                <div key={specification.key} className="grid grid-cols-[140px_1fr_auto] items-center gap-3 py-2 text-[9px]">
                  <dt className="font-semibold text-[#6e738b]">{specification.label}</dt>
                  <dd className="text-[#30355c]">
                    {specification.value} {specification.unit}
                  </dd>
                  {specification.is_highlight ? (
                    <span className="rounded-[3px] bg-[#f0eeff] px-1.5 py-0.5 font-semibold text-[#3024c8] text-[7px]">
                      Highlight
                    </span>
                  ) : (
                    <span />
                  )}
                </div>
              ))}
            </dl>
          ) : (
            <EmptyText>No specifications added.</EmptyText>
          )}
        </Card>
      </div>

      {product.description || product.tags.length > 0 ? (
        <div className="mt-4">
          <Card title="Description">
            {product.description ? (
              <p className="whitespace-pre-line text-[#3d4260] text-[10px] leading-[1.6]">{product.description}</p>
            ) : null}

            {product.tags.length > 0 ? (
              <div className={product.description ? "mt-4" : ""}>
                <p className="mb-1.5 font-bold text-[#303558] text-[9px]">Tags</p>
                <Chips items={product.tags} />
              </div>
            ) : null}
          </Card>
        </div>
      ) : null}
    </section>
  );
}

function BackLink() {
  return (
    <Link
      href="/supplier/dashboard/products"
      className="!text-[#3024c6] mb-3 inline-flex items-center gap-1 font-semibold text-[9px]"
    >
      ← Back to Manage Products
    </Link>
  );
}

function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-[9px] border border-[#e1e2ed] bg-white p-5">
      {title ? <h2 className="mb-3 font-bold text-[#171570] text-[12px]">{title}</h2> : null}
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[6px] bg-[#f8f8ff] px-3 py-2">
      <p className="text-[#777b92] text-[7px]">{label}</p>
      <p className="mt-0.5 truncate font-bold text-[#30355c] text-[10px]">{value}</p>
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span key={item} className="rounded-[4px] bg-[#f0eeff] px-2 py-1 font-semibold text-[#2d22bf] text-[8px]">
          {item}
        </span>
      ))}
    </div>
  );
}

function EmptyText({ children }: { children: ReactNode }) {
  return <p className="text-[#8c90a5] text-[9px]">{children}</p>;
}
