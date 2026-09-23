"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api/get-api-error-message";
import {
  createSellerProduct,
  getSellerProduct,
  type SellerProduct,
  updateSellerProduct,
  uploadProductFile,
} from "@/lib/api/seller-products-api";
import {
  createId,
  fromProduct,
  initialProductForm,
  MAX_CATALOGUE_SIZE_MB,
  MAX_IMAGE_SIZE_MB,
  MAX_PRODUCT_IMAGES,
  type ProductFieldChangeHandler,
  type ProductFormState,
  type ProductImageItem,
  toProductPayload,
  toUpdatePayload,
  validateProductForm,
} from "@/lib/seller-product-form";

/* =========================================
   HOOK
========================================= */

export function useProductForm(slug?: string) {
  const router = useRouter();

  const isEdit = Boolean(slug);

  const [form, setForm] = useState<ProductFormState>(initialProductForm);
  const [product, setProduct] = useState<SellerProduct | null>(null);
  const [images, setImages] = useState<ProductImageItem[]>([]);

  const [catalogueFileName, setCatalogueFileName] = useState<string>();

  const [isLoading, setIsLoading] = useState(isEdit);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [isUploadingCatalogue, setIsUploadingCatalogue] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const objectUrlsRef = useRef<string[]>([]);

  /* Edit mode: load the existing product */
  useEffect(() => {
    if (!slug) return;

    let isMounted = true;

    getSellerProduct(slug)
      .then((response) => {
        const existingProduct = response.data?.product;

        if (!isMounted || !existingProduct) return;

        setProduct(existingProduct);
        setForm(fromProduct(existingProduct));
        setImages(
          existingProduct.images.map((image) => ({
            id: String(image.product_image_id),
            url: image.image_url,
            name: image.alt_text ?? existingProduct.name,
            isPrimary: image.is_primary,
          })),
        );
      })
      .catch((error) => {
        if (isMounted) setLoadError(getApiErrorMessage(error));
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  /* Release local image previews */
  useEffect(() => {
    const objectUrls = objectUrlsRef.current;

    return () => {
      for (const url of objectUrls) {
        URL.revokeObjectURL(url);
      }
    };
  }, []);

  const updateField: ProductFieldChangeHandler = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const addImages = async (files: File[]) => {
    const availableSlots = MAX_PRODUCT_IMAGES - images.length;

    if (availableSlots <= 0) {
      toast.error(`You can upload up to ${MAX_PRODUCT_IMAGES} images.`);
      return;
    }

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image.`);
        return false;
      }

      if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        toast.error(`${file.name} must be smaller than ${MAX_IMAGE_SIZE_MB}MB.`);
        return false;
      }

      return true;
    });

    if (validFiles.length > availableSlots) {
      toast.error(`Only ${availableSlots} more image(s) can be added.`);
    }

    const filesToUpload = validFiles.slice(0, availableSlots);

    if (filesToUpload.length === 0) return;

    setIsUploadingImages(true);

    try {
      const uploadedImages = await Promise.all(
        filesToUpload.map(async (file) => {
          const url = await uploadProductFile(file, "images");
          const previewUrl = URL.createObjectURL(file);

          objectUrlsRef.current.push(previewUrl);

          return {
            id: createId("image"),
            url,
            name: file.name,
            previewUrl,
            isPrimary: false,
          };
        }),
      );

      setImages((previous) => {
        const nextImages = [...previous, ...uploadedImages];

        // The first image becomes primary when none is selected yet.
        if (!nextImages.some((image) => image.isPrimary)) {
          nextImages[0] = { ...nextImages[0], isPrimary: true };
        }

        return nextImages;
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsUploadingImages(false);
    }
  };

  const removeImage = (id: string) => {
    setImages((previous) => {
      const nextImages = previous.filter((image) => image.id !== id);

      if (nextImages.length > 0 && !nextImages.some((image) => image.isPrimary)) {
        nextImages[0] = { ...nextImages[0], isPrimary: true };
      }

      return nextImages;
    });
  };

  const setPrimaryImage = (id: string) => {
    setImages((previous) =>
      previous.map((image) => ({
        ...image,
        isPrimary: image.id === id,
      })),
    );
  };

  const uploadCatalogue = async (file: File) => {
    if (file.size > MAX_CATALOGUE_SIZE_MB * 1024 * 1024) {
      toast.error(`Catalogue must be smaller than ${MAX_CATALOGUE_SIZE_MB}MB.`);
      return;
    }

    setIsUploadingCatalogue(true);

    try {
      const url = await uploadProductFile(file, "catalogues");

      setCatalogueFileName(file.name);
      updateField("catalogue_url", url);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsUploadingCatalogue(false);
    }
  };

  const removeCatalogue = () => {
    setCatalogueFileName(undefined);
    updateField("catalogue_url", "");
  };

  const saveProduct = async () => {
    const validationError = validateProductForm(form, images, isEdit);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSaving(true);

    try {
      const response =
        isEdit && slug
          ? await updateSellerProduct(slug, toUpdatePayload(form))
          : await createSellerProduct(toProductPayload(form, images));

      const savedProduct = response.data?.product;

      toast.success(isEdit ? "Product updated and sent for approval." : "Product created and sent for approval.");

      router.push(savedProduct ? `/supplier/dashboard/products/${savedProduct.slug}` : "/supplier/dashboard/products");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isEdit,
    form,
    product,
    images,
    catalogueFileName,
    isLoading,
    loadError,
    isUploading: isUploadingImages || isUploadingCatalogue,
    isUploadingImages,
    isUploadingCatalogue,
    isSaving,
    updateField,
    addImages,
    removeImage,
    setPrimaryImage,
    uploadCatalogue,
    removeCatalogue,
    saveProduct,
  };
}
