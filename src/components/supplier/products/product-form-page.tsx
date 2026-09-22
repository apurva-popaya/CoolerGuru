"use client";

import { useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Check, FileText, ImagePlus, Plus, X } from "lucide-react";

import type { SupplierProduct } from "@/types/supplier-product";

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
  product?: SupplierProduct;
}

interface ProductFormData {
  name: string;
  category: string;
  subCategory: string;
  modelNumber: string;
  hsnCode: string;
  brand: string;
  shortDescription: string;
  productType: string;
  application: string;
  coolingCapacity: string;
  power: string;
  voltage: string;
  material: string;
  dimensions: string;
  weight: string;
  color: string;
  price: string;
  moq: string;
  stockQuantity: string;
  availabilityStatus: string;
  videoUrl: string;
  tags: string;
}

export function SupplierProductFormPage({ mode, product }: SupplierProductFormPageProps) {
  const router = useRouter();

  const isEdit = mode === "edit";

  const initialData = useMemo<ProductFormData>(
    () => ({
      name: product?.name ?? "",
      category: product?.category ?? "",
      subCategory: product?.subCategory ?? "",
      modelNumber: product?.modelNumber ?? "",
      hsnCode: "",
      brand: "",
      shortDescription: product?.description ?? "",
      productType: "",
      application: "",
      coolingCapacity: "",
      power: "",
      voltage: "",
      material: "",
      dimensions: "",
      weight: "",
      color: "",
      price: product ? String(product.price) : "",
      moq: "",
      stockQuantity: "",
      availabilityStatus:
        product?.stockStatus === "OUT_OF_STOCK"
          ? "out-of-stock"
          : product?.stockStatus === "LOW_STOCK"
            ? "low-stock"
            : "in-stock",
      videoUrl: "",
      tags: "",
    }),
    [product],
  );

  const [form, setForm] = useState<ProductFormData>(initialData);

  const [images, setImages] = useState<string[]>(product ? [product.image] : []);

  const updateField = (field: keyof ProductFormData, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (isEdit) {
      console.log("UPDATE PRODUCT", product?.id, form);
    } else {
      console.log("CREATE PRODUCT", form);
    }

    router.push("/supplier/dashboard/products");
  };

  return (
    <section className="px-7 py-6">
      <Link
        href="/supplier/dashboard/products"
        className="!text-[#3024c6] mb-3 inline-flex items-center gap-1 font-semibold text-[9px]"
      >
        ← Back to Manage Products
      </Link>

      <div>
        <h1 className="font-bold text-[#171570] text-[28px]">{isEdit ? "Edit Product" : "Add New Product"}</h1>

        <p className="mt-1 text-[#555b76] text-[10px]">
          {isEdit
            ? "Update the product details below and save your changes."
            : "Fill in the details below to add a new product to your catalog."}
        </p>
      </div>

      <div className="mt-5 rounded-[9px] border border-[#e0e1ed] bg-white p-5">
        <ProductFormSection title="1. Basic Information">
          <div className="grid grid-cols-3 gap-4">
            <ProductFormField label="Product Name" required>
              <input
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Enter product name"
                className={productInputClass}
              />
            </ProductFormField>

            <ProductFormField label="Category" required>
              <ProductSelectWrapper>
                <select
                  value={form.category}
                  onChange={(event) => updateField("category", event.target.value)}
                  className={productSelectClass}
                >
                  <option value="">Select category</option>
                  <option>Industrial Air Coolers</option>
                  <option>Desert Air Coolers</option>
                  <option>Tower Air Coolers</option>
                  <option>Air Cooler Components</option>
                  <option>Electrical Components</option>
                </select>
              </ProductSelectWrapper>
            </ProductFormField>

            <ProductFormField label="Subcategory">
              <ProductSelectWrapper>
                <select
                  value={form.subCategory}
                  onChange={(event) => updateField("subCategory", event.target.value)}
                  className={productSelectClass}
                >
                  <option value="">Select subcategory</option>
                  <option>Industrial Air Coolers</option>
                  <option>Desert Air Coolers</option>
                  <option>Tower Air Coolers</option>
                  <option>Motors</option>
                  <option>Pumps</option>
                  <option>Fan Blades</option>
                </select>
              </ProductSelectWrapper>
            </ProductFormField>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <ProductFormField label="SKU / Model Number" required>
              <input
                value={form.modelNumber}
                onChange={(event) => updateField("modelNumber", event.target.value)}
                placeholder="Enter SKU or model number"
                className={productInputClass}
              />
            </ProductFormField>

            <ProductFormField label="HSN Code">
              <input
                value={form.hsnCode}
                onChange={(event) => updateField("hsnCode", event.target.value)}
                placeholder="Enter HSN code"
                className={productInputClass}
              />
            </ProductFormField>

            <ProductFormField label="Brand">
              <input
                value={form.brand}
                onChange={(event) => updateField("brand", event.target.value)}
                placeholder="Enter brand name"
                className={productInputClass}
              />
            </ProductFormField>
          </div>

          <div className="mt-4">
            <ProductFormField label="Short Description" required>
              <textarea
                value={form.shortDescription}
                onChange={(event) => updateField("shortDescription", event.target.value)}
                maxLength={200}
                placeholder="Enter short description about the product"
                className={productTextareaClass}
              />
            </ProductFormField>

            <p className="mt-1 text-right text-[#878ba0] text-[6px]">{form.shortDescription.length} / 200</p>
          </div>
        </ProductFormSection>

        <ProductFormSection title="2. Product Images">
          <p className="mb-2 text-[#777c94] text-[7px]">
            Upload high quality images of your product (Maximum 10 images)
          </p>

          <label className="flex h-[65px] cursor-pointer items-center justify-center gap-3 rounded-[6px] border border-[#bdbceb] border-dashed bg-[#fbfaff]">
            <ImagePlus size={18} className="text-[#3024c8]" />

            <div>
              <p className="font-bold text-[#3024c8] text-[8px]">
                Click to upload <span className="font-normal text-[#606580]">or drag and drop</span>
              </p>

              <p className="mt-1 text-[#8c90a5] text-[6px]">PNG, JPG or JPEG. Recommended 1200 × 1200px.</p>
            </div>

            <input type="file" accept="image/*" multiple className="hidden" />
          </label>

          <div className="mt-3 grid grid-cols-5 gap-3">
            {images.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="relative h-[110px] rounded-[7px] border border-[#e0e1ed] bg-[#fafafa]"
              >
                <Image src={image} alt="Product" fill className="object-contain p-2" />

                <button
                  type="button"
                  onClick={() => setImages((previous) => previous.filter((_, imageIndex) => imageIndex !== index))}
                  className="absolute top-2 right-2 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white shadow"
                >
                  <X size={10} className="text-[#3024c8]" />
                </button>
              </div>
            ))}

            {images.length < 10 ? (
              <label className="flex h-[110px] cursor-pointer flex-col items-center justify-center rounded-[7px] border border-[#c4c4ec] border-dashed bg-[#fbfaff]">
                <Plus size={18} className="text-[#3024c8]" />

                <span className="mt-1 font-bold text-[#3024c8] text-[7px]">Add More</span>

                <input type="file" accept="image/*" multiple className="hidden" />
              </label>
            ) : null}
          </div>
        </ProductFormSection>

        <ProductFormSection title="3. Product Details">
          <div className="grid grid-cols-3 gap-4">
            <ProductFormField label="Product Type" required>
              <ProductSelectWrapper>
                <select
                  value={form.productType}
                  onChange={(event) => updateField("productType", event.target.value)}
                  className={productSelectClass}
                >
                  <option value="">Select product type</option>
                  <option>Air Cooler</option>
                  <option>Component</option>
                  <option>Electrical Component</option>
                </select>
              </ProductSelectWrapper>
            </ProductFormField>

            <ProductFormField label="Application / Usage" required>
              <ProductSelectWrapper>
                <select
                  value={form.application}
                  onChange={(event) => updateField("application", event.target.value)}
                  className={productSelectClass}
                >
                  <option value="">Select application</option>
                  <option>Industrial</option>
                  <option>Commercial</option>
                  <option>Domestic</option>
                </select>
              </ProductSelectWrapper>
            </ProductFormField>

            <ProductFormField label="Cooling Capacity">
              <div className="flex">
                <input
                  value={form.coolingCapacity}
                  onChange={(event) => updateField("coolingCapacity", event.target.value)}
                  placeholder="Enter capacity"
                  className={`${productInputClass} rounded-r-none`}
                />

                <div className="flex h-[38px] w-[65px] items-center justify-center rounded-r-[5px] border border-[#dfe0eb] border-l-0 text-[#4e5472] text-[7px]">
                  CMH
                </div>
              </div>
            </ProductFormField>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <ProductFormField label="Power / Motor">
              <input
                value={form.power}
                onChange={(event) => updateField("power", event.target.value)}
                placeholder="Enter power or motor details"
                className={productInputClass}
              />
            </ProductFormField>

            <ProductFormField label="Voltage / Frequency">
              <input
                value={form.voltage}
                onChange={(event) => updateField("voltage", event.target.value)}
                placeholder="Enter voltage / frequency"
                className={productInputClass}
              />
            </ProductFormField>

            <ProductFormField label="Material">
              <input
                value={form.material}
                onChange={(event) => updateField("material", event.target.value)}
                placeholder="Enter material"
                className={productInputClass}
              />
            </ProductFormField>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <ProductFormField label="Dimensions (L × W × H)">
              <input
                value={form.dimensions}
                onChange={(event) => updateField("dimensions", event.target.value)}
                placeholder="Enter dimensions"
                className={productInputClass}
              />
            </ProductFormField>

            <ProductFormField label="Weight">
              <div className="flex">
                <input
                  value={form.weight}
                  onChange={(event) => updateField("weight", event.target.value)}
                  placeholder="Enter weight"
                  className={`${productInputClass} rounded-r-none`}
                />

                <div className="flex h-[38px] w-[55px] items-center justify-center rounded-r-[5px] border border-[#dfe0eb] border-l-0 text-[7px]">
                  Kg
                </div>
              </div>
            </ProductFormField>

            <ProductFormField label="Color / Finish">
              <input
                value={form.color}
                onChange={(event) => updateField("color", event.target.value)}
                placeholder="Enter color / finish"
                className={productInputClass}
              />
            </ProductFormField>
          </div>
        </ProductFormSection>

        <ProductFormSection title="4. Pricing & Availability">
          <div className="grid grid-cols-3 gap-4">
            <ProductFormField label="Price (₹)">
              <input
                type="number"
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                placeholder="Enter price"
                className={productInputClass}
              />
            </ProductFormField>

            <ProductFormField label="Minimum Order Quantity (MOQ)" required>
              <input
                type="number"
                value={form.moq}
                onChange={(event) => updateField("moq", event.target.value)}
                placeholder="Enter MOQ"
                className={productInputClass}
              />
            </ProductFormField>

            <ProductFormField label="Stock Quantity" required>
              <input
                type="number"
                value={form.stockQuantity}
                onChange={(event) => updateField("stockQuantity", event.target.value)}
                placeholder="Enter stock quantity"
                className={productInputClass}
              />
            </ProductFormField>
          </div>

          <div className="mt-4 max-w-[32%]">
            <ProductFormField label="Availability Status" required>
              <ProductSelectWrapper>
                <select
                  value={form.availabilityStatus}
                  onChange={(event) => updateField("availabilityStatus", event.target.value)}
                  className={productSelectClass}
                >
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </ProductSelectWrapper>
            </ProductFormField>
          </div>
        </ProductFormSection>

        <ProductFormSection title="5. Additional Information" last>
          <div className="grid grid-cols-2 gap-5">
            <ProductFormField label="Product Video URL">
              <input
                value={form.videoUrl}
                onChange={(event) => updateField("videoUrl", event.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className={productInputClass}
              />
            </ProductFormField>

            <ProductFormField label="Product Brochure / Datasheet">
              <label className="flex h-[38px] cursor-pointer items-center justify-center gap-2 rounded-[5px] border border-[#c4c3e9] border-dashed bg-[#fbfaff]">
                <FileText size={13} className="text-[#3024c8]" />

                <span className="font-semibold text-[#3024c8] text-[8px]">Click to upload</span>

                <span className="text-[#777c94] text-[8px]">or drag and drop</span>

                <input type="file" accept=".pdf" className="hidden" />
              </label>
            </ProductFormField>
          </div>

          <div className="mt-4">
            <ProductFormField label="Tags / Keywords">
              <input
                value={form.tags}
                onChange={(event) => updateField("tags", event.target.value)}
                placeholder="Enter tags separated by commas"
                className={productInputClass}
              />
            </ProductFormField>

            <p className="mt-1 text-[#878ba0] text-[6px]">
              Example: cooler, industrial, desert cooler, energy efficient
            </p>
          </div>
        </ProductFormSection>
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <Link
          href="/supplier/dashboard/products"
          className="!text-[#3024c8] flex h-[38px] min-w-[90px] items-center justify-center rounded-[5px] border border-[#bdb9ea] font-bold text-[9px]"
        >
          Cancel
        </Link>

        <button
          type="button"
          onClick={handleSubmit}
          className="flex h-[38px] min-w-[125px] items-center justify-center gap-2 rounded-[5px] bg-[#2819bd] px-5 font-bold text-[9px] text-white"
        >
          <Check size={12} />

          {isEdit ? "Update Product" : "Save Product"}
        </button>
      </div>
    </section>
  );
}
