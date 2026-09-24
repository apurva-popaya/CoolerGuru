"use client";

import { useId } from "react";

import Link from "next/link";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Info,
  Loader2,
  Plus,
  RefreshCw,
  Star,
  Trash2,
  X,
} from "lucide-react";

import { FileUploadField } from "@/components/common/file-upload-field";
import { useProductForm } from "@/hooks/use-product-form";
import { getUploadAccept, getUploadHint } from "@/lib/api/file-upload-api";
import {
  createSpecificationRow,
  MAX_PRODUCT_IMAGES,
  type ProductFormState,
  type ProductImageItem,
  type ProductSpecificationRow,
  type ProductTextField,
  toSpecificationKey,
} from "@/lib/seller-product-form";

import { ProductCategorySelect } from "./product-category-select";
import { ProductImage } from "./product-display";
import {
  ProductFormField,
  ProductFormSection,
  ProductSelectWrapper,
  productInputClass,
  productSelectClass,
  productTextareaClass,
} from "./product-form-section";

interface SupplierProductFormPageProps {
  mode: "add" | "edit";
  slug?: string;
}

const SPECIFICATION_PRESETS = [
  { label: "Airflow", unit: "m³/h" },
  { label: "Tank Capacity", unit: "L" },
  { label: "Power", unit: "kW" },
  { label: "Coverage Area", unit: "sq ft" },
];

const QUANTITY_UNITS = ["Unit", "Piece", "Set", "Box"];

export function SupplierProductFormPage({ mode, slug }: SupplierProductFormPageProps) {
  const {
    isEdit,
    form,
    product,
    images,
    catalogueFileName,
    isLoading,
    loadError,
    isUploading,
    isUploadingImages,
    busyImageIds,
    isUploadingCatalogue,
    isSaving,
    updateField,
    addImages,
    replaceImage,
    removeImage,
    setPrimaryImage,
    moveImage,
    uploadCatalogue,
    removeCatalogue,
    saveProduct,
  } = useProductForm(mode === "edit" ? slug : undefined);

  const backHref = isEdit && slug ? `/supplier/dashboard/products/${slug}` : "/supplier/dashboard/products";

  const textInput = (field: ProductTextField, placeholder: string, maxLength = 255) => (
    <input
      value={form[field]}
      onChange={(event) => updateField(field, event.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className={productInputClass}
    />
  );

  const unitSelect = (field: "price_unit" | "moq_unit" | "stock_unit") => (
    <select
      value={form[field]}
      onChange={(event) => updateField(field, event.target.value)}
      className="h-[38px] w-[70px] shrink-0 rounded-r-[5px] border border-[#dfe0eb] border-l-0 bg-white px-2 text-[#4e5472] text-[7px] outline-none"
    >
      {QUANTITY_UNITS.map((unit) => (
        <option key={unit} value={unit}>
          {unit}
        </option>
      ))}
    </select>
  );

  const updateSpecification = (id: string, changes: Partial<ProductSpecificationRow>) => {
    updateField(
      "specifications",
      form.specifications.map((row) =>
        row.id === id
          ? {
              ...row,
              ...changes,
              ...(changes.label !== undefined ? { key: toSpecificationKey(changes.label) } : {}),
            }
          : row,
      ),
    );
  };

  const addSpecification = (values?: Partial<ProductSpecificationRow>) => {
    updateField("specifications", [...form.specifications, createSpecificationRow(values)]);
  };

  if (isLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center gap-2 px-7 py-6 text-[#555b76] text-[12px]">
        <Loader2 size={18} className="animate-spin text-[#3125c8]" />
        Loading product...
      </section>
    );
  }

  if (loadError) {
    return (
      <section className="px-7 py-6">
        <Link
          href="/supplier/dashboard/products"
          className="!text-[#3024c6] mb-3 inline-flex items-center gap-1 font-semibold text-[9px]"
        >
          ← Back to Manage Products
        </Link>

        <div className="rounded-[9px] border border-[#f0c3ca] bg-[#fff7f8] px-5 py-4">
          <p className="font-bold text-[#db3e57] text-[12px]">Could not load this product</p>
          <p className="mt-1 text-[#555b76] text-[9px]">{loadError}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-7 py-6">
      <Link href={backHref} className="!text-[#3024c6] mb-3 inline-flex items-center gap-1 font-semibold text-[9px]">
        ← {isEdit ? "Back to Product" : "Back to Manage Products"}
      </Link>

      <div>
        <h1 className="font-bold text-[#171570] text-[28px]">{isEdit ? "Edit Product" : "Add New Product"}</h1>

        <p className="mt-1 text-[#555b76] text-[10px]">
          {isEdit
            ? "Update the product details below and save your changes."
            : "Fill in the details below to add a new product to your catalog."}
        </p>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-[6px] border border-[#dedff0] bg-[#f8f8ff] px-3 py-2.5">
        <Info size={12} className="mt-[1px] shrink-0 text-[#3125c8]" />

        <p className="text-[#656a83] text-[8px] leading-[1.45]">
          {isEdit
            ? "Saving changes sends this product for admin approval again."
            : "New products are reviewed by our team before they are visible to buyers."}
        </p>
      </div>

      <div className="mt-4 rounded-[9px] border border-[#e0e1ed] bg-white p-5">
        {/* 1. Basic Information */}
        <ProductFormSection title="1. Basic Information">
          <div className="grid grid-cols-3 gap-4">
            <ProductFormField label="Product Name" required>
              {textInput("name", "Enter product name", 180)}
            </ProductFormField>

            <ProductCategorySelect value={form.category_id} onChange={(categoryId) => updateField("category_id", categoryId)} />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-4">
            <ProductFormField label="SKU">{textInput("sku", "Enter SKU")}</ProductFormField>

            <ProductFormField label="Model Number">{textInput("model_number", "Enter model number")}</ProductFormField>

            <ProductFormField label="HSN Code">{textInput("hsn_code", "Enter HSN code")}</ProductFormField>

            <ProductFormField label="Brand">{textInput("brand", "Enter brand name")}</ProductFormField>
          </div>

          <div className="mt-4">
            <ProductFormField label="Short Description" required>
              <textarea
                value={form.short_description}
                onChange={(event) => updateField("short_description", event.target.value)}
                maxLength={250}
                placeholder="Enter short description about the product"
                className={productTextareaClass}
              />
            </ProductFormField>

            <p className="mt-1 text-right text-[#878ba0] text-[6px]">{form.short_description.length} / 250</p>
          </div>

          <div className="mt-2">
            <ProductFormField label="Detailed Description">
              <textarea
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                maxLength={2000}
                placeholder="Describe features, use cases and what makes this product stand out"
                className={`${productTextareaClass} min-h-[110px]`}
              />
            </ProductFormField>

            <p className="mt-1 text-right text-[#878ba0] text-[6px]">{form.description.length} / 2000</p>
          </div>
        </ProductFormSection>

        {/* 2. Product Images */}
        <ProductFormSection title="2. Product Images">
          <p className="mb-2 text-[#777c94] text-[7px]">
            {isEdit
              ? "Changes to images are saved right away and send the product back for admin review. A product needs at least one image, so replace the last image instead of removing it."
              : `Upload high quality images of your product (Maximum ${MAX_PRODUCT_IMAGES} images, ${getUploadHint("product_image")} each). The starred image is shown first to buyers. Use the arrows to change the order.`}
          </p>

          {images.length === 0 ? (
            <label className="flex h-[65px] cursor-pointer items-center justify-center gap-3 rounded-[6px] border border-[#bdbceb] border-dashed bg-[#fbfaff] focus-within:ring-2 focus-within:ring-[#3024c8]/40">
              {isUploadingImages ? (
                <Loader2 size={18} className="animate-spin text-[#3024c8]" />
              ) : (
                <ImagePlus size={18} className="text-[#3024c8]" />
              )}

              <div>
                <p className="font-bold text-[#3024c8] text-[8px]">
                  {isUploadingImages ? "Uploading..." : "Click to upload"}
                  {isUploadingImages ? null : <span className="font-normal text-[#606580]"> product images</span>}
                </p>

                <p className="mt-1 text-[#8c90a5] text-[6px]">
                  {getUploadHint("product_image")}. Recommended 1200 × 1200px.
                </p>
              </div>

              <ImagesInput disabled={isUploadingImages} onSelect={addImages} />
            </label>
          ) : (
            <div className="grid grid-cols-5 gap-3">
              {images.map((image, index) => (
                <ImageTile
                  key={image.id}
                  image={image}
                  busy={busyImageIds.includes(image.id)}
                  // Images saved before the upload API have no fileId and can't be changed here.
                  onReplace={image.fileId ? (file) => replaceImage(image.id, file) : undefined}
                  onRemove={!isEdit || image.fileId ? () => removeImage(image.id) : undefined}
                  onSetPrimary={isEdit ? undefined : () => setPrimaryImage(image.id)}
                  onMoveLeft={!isEdit && index > 0 ? () => moveImage(image.id, -1) : undefined}
                  onMoveRight={!isEdit && index < images.length - 1 ? () => moveImage(image.id, 1) : undefined}
                />
              ))}

              {images.length < MAX_PRODUCT_IMAGES ? (
                <label className="flex h-[110px] cursor-pointer flex-col items-center justify-center rounded-[7px] border border-[#c4c4ec] border-dashed bg-[#fbfaff] focus-within:ring-2 focus-within:ring-[#3024c8]/40">
                  {isUploadingImages ? (
                    <Loader2 size={18} className="animate-spin text-[#3024c8]" />
                  ) : (
                    <Plus size={18} className="text-[#3024c8]" />
                  )}

                  <span className="mt-1 font-bold text-[#3024c8] text-[7px]">
                    {isUploadingImages ? "Uploading..." : "Add More"}
                  </span>

                  <ImagesInput disabled={isUploadingImages} onSelect={addImages} />
                </label>
              ) : null}
            </div>
          )}
        </ProductFormSection>

        {/* 3. Product Details */}
        <ProductFormSection title="3. Product Details">
          <div className="grid grid-cols-3 gap-4">
            <ProductFormField label="Product Type">
              <input
                value={form.product_type}
                onChange={(event) => updateField("product_type", event.target.value)}
                list="product-type-options"
                placeholder="e.g. Industrial Air Cooler"
                maxLength={255}
                className={productInputClass}
              />

              <datalist id="product-type-options">
                <option value="Industrial Air Cooler" />
                <option value="Desert Air Cooler" />
                <option value="Tower Air Cooler" />
                <option value="Personal Air Cooler" />
                <option value="Component" />
                <option value="Electrical Component" />
              </datalist>
            </ProductFormField>

            <ProductFormField label="Application / Usage">
              <input
                value={form.application_usage}
                onChange={(event) => updateField("application_usage", event.target.value)}
                list="application-options"
                placeholder="e.g. Factories and warehouses"
                maxLength={255}
                className={productInputClass}
              />

              <datalist id="application-options">
                <option value="Industrial" />
                <option value="Commercial" />
                <option value="Domestic" />
                <option value="Factories and warehouses" />
              </datalist>
            </ProductFormField>

            <ProductFormField label="Cooling Capacity">
              <div className="flex">
                <input
                  value={form.cooling_capacity}
                  onChange={(event) => updateField("cooling_capacity", event.target.value)}
                  placeholder="Enter capacity"
                  maxLength={255}
                  className={`${productInputClass} rounded-r-none`}
                />

                <div className="flex h-[38px] w-[65px] shrink-0 items-center justify-center rounded-r-[5px] border border-[#dfe0eb] border-l-0 text-[#4e5472] text-[7px]">
                  {form.cooling_capacity_unit}
                </div>
              </div>
            </ProductFormField>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <ProductFormField label="Power / Motor">{textInput("power_motor", "Enter power or motor details")}</ProductFormField>

            <ProductFormField label="Voltage / Frequency">
              {textInput("voltage_frequency", "e.g. 230V / 50Hz")}
            </ProductFormField>

            <ProductFormField label="Material">{textInput("material", "Enter material")}</ProductFormField>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <ProductFormField label="Dimensions (L × W × H)">
              {textInput("dimensions", "e.g. 120 × 80 × 150 cm")}
            </ProductFormField>

            <ProductFormField label="Weight">
              <div className="flex">
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={form.weight}
                  onChange={(event) => updateField("weight", event.target.value)}
                  placeholder="Enter weight"
                  className={`${productInputClass} rounded-r-none`}
                />

                <div className="flex h-[38px] w-[55px] shrink-0 items-center justify-center rounded-r-[5px] border border-[#dfe0eb] border-l-0 text-[7px]">
                  {form.weight_unit}
                </div>
              </div>
            </ProductFormField>

            <ProductFormField label="Color / Finish">{textInput("color_finish", "Enter color / finish")}</ProductFormField>
          </div>
        </ProductFormSection>

        {/* 4. Specifications */}
        <ProductFormSection title="4. Specifications">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-[#777c94] text-[7px]">Quick add:</span>

            {SPECIFICATION_PRESETS.map((preset) => {
              const isAdded = form.specifications.some((row) => row.key === toSpecificationKey(preset.label));

              return (
                <button
                  key={preset.label}
                  type="button"
                  disabled={isAdded}
                  onClick={() => addSpecification({ label: preset.label, unit: preset.unit, is_highlight: true })}
                  className="rounded-[4px] border border-[#c4c4ec] border-dashed px-2 py-1 font-semibold text-[#3024c8] text-[7px] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  + {preset.label}
                </button>
              );
            })}
          </div>

          {form.specifications.length > 0 ? (
            <div className="rounded-[6px] border border-[#e6e7f0]">
              <div className="grid grid-cols-[1.4fr_1.4fr_0.8fr_0.7fr_30px] gap-3 bg-[#fafaff] px-3 py-2 font-bold text-[#303558] text-[8px]">
                <span>Name</span>
                <span>Value</span>
                <span>Unit</span>
                <span>Highlight</span>
                <span />
              </div>

              {form.specifications.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[1.4fr_1.4fr_0.8fr_0.7fr_30px] items-center gap-3 border-[#ededf3] border-t px-3 py-2"
                >
                  <input
                    value={row.label}
                    onChange={(event) => updateSpecification(row.id, { label: event.target.value })}
                    placeholder="e.g. Airflow"
                    maxLength={100}
                    className={productInputClass}
                  />

                  <input
                    value={row.value}
                    onChange={(event) => updateSpecification(row.id, { value: event.target.value })}
                    placeholder="e.g. 15000"
                    maxLength={255}
                    className={productInputClass}
                  />

                  <input
                    value={row.unit}
                    onChange={(event) => updateSpecification(row.id, { unit: event.target.value })}
                    placeholder="e.g. m³/h"
                    maxLength={40}
                    className={productInputClass}
                  />

                  <label className="flex cursor-pointer items-center gap-1.5 text-[#555a76] text-[8px]">
                    <input
                      type="checkbox"
                      checked={row.is_highlight}
                      onChange={(event) => updateSpecification(row.id, { is_highlight: event.target.checked })}
                    />
                    Show on card
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        "specifications",
                        form.specifications.filter((item) => item.id !== row.id),
                      )
                    }
                    aria-label={`Remove ${row.label || "specification"}`}
                    className="flex h-[26px] w-[26px] items-center justify-center rounded-[4px] text-[#db3e57] hover:bg-[#fff0f2]"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#8c90a5] text-[8px]">No specifications added yet.</p>
          )}

          <button
            type="button"
            onClick={() => addSpecification()}
            className="mt-3 flex items-center gap-1 font-bold text-[#3024c8] text-[8px]"
          >
            <Plus size={12} />
            Add Specification
          </button>
        </ProductFormSection>

        {/* 5. Pricing & Availability */}
        <ProductFormSection title="5. Pricing & Availability">
          <div className="grid grid-cols-3 gap-4">
            <ProductFormField label={`Price (${form.currency})`}>
              <div className="flex">
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={form.price}
                  onChange={(event) => updateField("price", event.target.value)}
                  placeholder="Enter price"
                  className={`${productInputClass} rounded-r-none`}
                />

                {unitSelect("price_unit")}
              </div>
            </ProductFormField>

            <ProductFormField label="Minimum Price">
              <input
                type="number"
                min={0}
                step="any"
                value={form.min_price}
                onChange={(event) => updateField("min_price", event.target.value)}
                placeholder="Lowest price (optional)"
                className={productInputClass}
              />
            </ProductFormField>

            <ProductFormField label="Maximum Price">
              <input
                type="number"
                min={0}
                step="any"
                value={form.max_price}
                onChange={(event) => updateField("max_price", event.target.value)}
                placeholder="Highest price (optional)"
                className={productInputClass}
              />
            </ProductFormField>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <ProductFormField label="Minimum Order Quantity (MOQ)" required>
              <div className="flex">
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={form.moq}
                  onChange={(event) => updateField("moq", event.target.value)}
                  placeholder="Enter MOQ"
                  className={`${productInputClass} rounded-r-none`}
                />

                {unitSelect("moq_unit")}
              </div>
            </ProductFormField>

            <ProductFormField label="Stock Quantity" required>
              <div className="flex">
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={form.stock_quantity}
                  onChange={(event) => updateField("stock_quantity", event.target.value)}
                  placeholder="Enter stock quantity"
                  className={`${productInputClass} rounded-r-none`}
                />

                {unitSelect("stock_unit")}
              </div>
            </ProductFormField>

            <ProductFormField label="Availability Status" required>
              <ProductSelectWrapper>
                <select
                  value={form.availability_status}
                  onChange={(event) =>
                    updateField("availability_status", event.target.value as ProductFormState["availability_status"])
                  }
                  className={productSelectClass}
                >
                  <option value="IN_STOCK">In Stock</option>
                  <option value="LOW_STOCK">Low Stock</option>
                  <option value="OUT_OF_STOCK">Out of Stock</option>
                </select>
              </ProductSelectWrapper>
            </ProductFormField>
          </div>
        </ProductFormSection>

        {/* 6. Additional Information */}
        <ProductFormSection title="6. Additional Information" last>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <ProductFormField label="Key Highlights">
                <textarea
                  value={form.highlights}
                  onChange={(event) => updateField("highlights", event.target.value)}
                  placeholder={"One highlight per line, e.g.\nHigh airflow\nSuitable for large spaces"}
                  className={productTextareaClass}
                />
              </ProductFormField>
            </div>

            <div className="flex flex-col gap-4">
              <ProductFormField label="Available Colors">
                {textInput("available_colors", "Enter colors separated by commas, e.g. White, Grey", 2000)}
              </ProductFormField>

              <ProductFormField label="Tags / Keywords">
                {textInput("tags", "Enter tags separated by commas", 2000)}
              </ProductFormField>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-5">
            <ProductFormField label="Product Video URL">
              {textInput("video_url", "https://youtube.com/watch?v=...", 2000)}
            </ProductFormField>

            <ProductFormField label="Product Brochure / Datasheet">
              <FileUploadField
                category="product_brochure"
                label="Click to upload PDF"
                items={
                  form.catalogue_url ? [{ key: "catalogue", url: form.catalogue_url, name: catalogueFileName }] : []
                }
                isUploading={isUploadingCatalogue && !form.catalogue_url}
                busyKeys={isUploadingCatalogue ? ["catalogue"] : []}
                onSelect={([file]) => uploadCatalogue(file)}
                onReplace={(_item, file) => uploadCatalogue(file)}
                onRemove={removeCatalogue}
              />
            </ProductFormField>
          </div>
        </ProductFormSection>
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <Link
          href={backHref}
          className="!text-[#3024c8] flex h-[38px] min-w-[90px] items-center justify-center rounded-[5px] border border-[#bdb9ea] font-bold text-[9px]"
        >
          Cancel
        </Link>

        <button
          type="button"
          onClick={saveProduct}
          disabled={isSaving || isUploading || (isEdit && !product)}
          className="flex h-[38px] min-w-[125px] items-center justify-center gap-2 rounded-[5px] bg-[#2819bd] px-5 font-bold text-[9px] text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}

          {isSaving ? "Saving..." : isEdit ? "Update Product" : "Save Product"}
        </button>
      </div>
    </section>
  );
}

function ImagesInput({ disabled, onSelect }: { disabled: boolean; onSelect: (files: File[]) => void }) {
  return (
    <input
      type="file"
      accept={getUploadAccept("product_image")}
      multiple
      disabled={disabled}
      aria-label="Upload product images"
      className="sr-only"
      onChange={(event) => {
        const files = Array.from(event.target.files ?? []);

        // Allow re-selecting the same files later.
        event.target.value = "";

        if (files.length > 0) {
          onSelect(files);
        }
      }}
    />
  );
}

const tileButtonClass =
  "flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3024c8]/50";

function ImageTile({
  image,
  busy,
  onReplace,
  onRemove,
  onSetPrimary,
  onMoveLeft,
  onMoveRight,
}: {
  image: ProductImageItem;
  busy: boolean;
  onReplace?: (file: File) => void;
  onRemove?: () => void;
  onSetPrimary?: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
}) {
  const replaceInputId = useId();

  return (
    <div
      className={`relative h-[110px] overflow-hidden rounded-[7px] border bg-[#fafafa] ${image.isPrimary ? "border-[#3024c8]" : "border-[#e0e1ed]"}`}
    >
      <ProductImage src={image.url} alt={image.name} className="object-contain p-2" />

      {busy && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70">
          <Loader2 size={16} className="animate-spin text-[#3024c8]" />
        </div>
      )}

      {!busy && (
        <>
          {image.isPrimary ? (
            <span className="absolute bottom-1.5 left-1.5 rounded-[3px] bg-[#3024c8] px-1.5 py-0.5 font-bold text-[6px] text-white">
              Primary
            </span>
          ) : onSetPrimary ? (
            <button
              type="button"
              onClick={onSetPrimary}
              aria-label="Set as primary image"
              title="Set as primary image"
              className={`absolute bottom-1.5 left-1.5 ${tileButtonClass}`}
            >
              <Star size={10} className="text-[#3024c8]" />
            </button>
          ) : null}

          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                aria-label="Remove image"
                title="Remove image"
                className={tileButtonClass}
              >
                <X size={10} className="text-[#3024c8]" />
              </button>
            )}

            {onReplace && (
              <label htmlFor={replaceInputId} title="Replace image" className={`cursor-pointer ${tileButtonClass}`}>
                <RefreshCw size={9} className="text-[#3024c8]" />
                <span className="sr-only">Replace image</span>

                <input
                  id={replaceInputId}
                  type="file"
                  accept={getUploadAccept("product_image")}
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0];

                    event.target.value = "";

                    if (file) {
                      onReplace(file);
                    }
                  }}
                />
              </label>
            )}
          </div>

          {(onMoveLeft || onMoveRight) && (
            <div className="absolute right-2 bottom-1.5 flex gap-1">
              {onMoveLeft && (
                <button
                  type="button"
                  onClick={onMoveLeft}
                  aria-label="Move image left"
                  title="Move left"
                  className={tileButtonClass}
                >
                  <ChevronLeft size={11} className="text-[#3024c8]" />
                </button>
              )}

              {onMoveRight && (
                <button
                  type="button"
                  onClick={onMoveRight}
                  aria-label="Move image right"
                  title="Move right"
                  className={tileButtonClass}
                >
                  <ChevronRight size={11} className="text-[#3024c8]" />
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
