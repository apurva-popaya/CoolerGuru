"use client";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { ApiError } from "@/lib/api/api-client";
import {
  deleteFile,
  getUploadErrorMessage,
  listAllFiles,
  replaceFile,
  toFileIdMap,
  type UploadedFileRecord,
  uploadFile,
  uploadFiles,
  validateUploadFile,
} from "@/lib/api/file-upload-api";
import { getApiErrorMessage } from "@/lib/api/get-api-error-message";
import {
  createSellerProduct,
  getSellerProduct,
  type SellerProduct,
  updateSellerProduct,
} from "@/lib/api/seller-products-api";
import {
  fromProduct,
  initialProductForm,
  MAX_PRODUCT_IMAGES,
  type ProductFieldChangeHandler,
  type ProductFormState,
  type ProductImageItem,
  toProductPayload,
  toUpdatePayload,
  validateProductForm,
} from "@/lib/seller-product-form";

/* =========================================
   HELPERS
========================================= */

const REVIEW_NOTICE = "The product has been sent back for admin review.";

interface CatalogueFile {
  fileId?: string;
  name?: string;
}

function toImageItems(product: SellerProduct, filesByUrl: Map<string, UploadedFileRecord>): ProductImageItem[] {
  return [...product.images]
    .sort((first, second) => first.sort_order - second.sort_order)
    .map((image) => ({
      id: String(image.product_image_id),
      url: image.image_url,
      name: image.alt_text ?? product.name,
      fileId: filesByUrl.get(image.image_url)?.fileId,
      isPrimary: image.is_primary,
    }));
}

function withPrimaryImage(images: ProductImageItem[]) {
  if (images.length > 0 && !images.some((image) => image.isPrimary)) {
    return [{ ...images[0], isPrimary: true }, ...images.slice(1)];
  }

  return images;
}

/* GET product endpoints return URLs only; /uploads gives the fileIds. */
async function loadProductWithFiles(slug: string) {
  const response = await getSellerProduct(slug);

  const product = response.data?.product;

  if (!product) {
    throw new Error("Product not found.");
  }

  const files = await listAllFiles({ productId: product.product_id });

  return { product, filesByUrl: toFileIdMap(files) };
}

/* =========================================
   HOOK
========================================= */

export function useProductForm(slug?: string) {
  const router = useRouter();

  const isEdit = Boolean(slug);

  const [form, setForm] = useState<ProductFormState>(initialProductForm);
  const [product, setProduct] = useState<SellerProduct | null>(null);
  const [images, setImages] = useState<ProductImageItem[]>([]);

  const [catalogueFile, setCatalogueFile] = useState<CatalogueFile>({});

  const [isLoading, setIsLoading] = useState(isEdit);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [busyImageIds, setBusyImageIds] = useState<string[]>([]);
  const [isUploadingCatalogue, setIsUploadingCatalogue] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /* Edit mode: load the existing product */
  useEffect(() => {
    if (!slug) return;

    let isMounted = true;

    loadProductWithFiles(slug)
      .then(({ product: existingProduct, filesByUrl }) => {
        if (!isMounted) return;

        setProduct(existingProduct);
        setForm(fromProduct(existingProduct));
        setImages(toImageItems(existingProduct, filesByUrl));

        const catalogue = existingProduct.catalogue_url ? filesByUrl.get(existingProduct.catalogue_url) : undefined;

        setCatalogueFile(
          catalogue ? { fileId: catalogue.fileId, name: catalogue.originalFilename ?? undefined } : {},
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

  /*
   * Edit mode: image changes are saved immediately by /uploads.
   * Refetch the gallery without touching unsaved form fields.
   */
  const refreshImages = useCallback(async () => {
    if (!slug) return;

    try {
      const { product: freshProduct, filesByUrl } = await loadProductWithFiles(slug);

      setProduct(freshProduct);
      setImages(toImageItems(freshProduct, filesByUrl));
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }, [slug]);

  const updateField: ProductFieldChangeHandler = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const setImageBusy = (id: string, busy: boolean) => {
    setBusyImageIds((previous) => (busy ? [...previous, id] : previous.filter((item) => item !== id)));
  };

  /* =========================================
     IMAGES
  ========================================= */

  const addImages = async (files: File[]) => {
    const availableSlots = MAX_PRODUCT_IMAGES - images.length;

    if (availableSlots <= 0) {
      toast.error(`You can upload up to ${MAX_PRODUCT_IMAGES} images.`);
      return;
    }

    const validFiles = files.filter((file) => {
      const error = validateUploadFile(file, "product_image");

      if (error) {
        toast.error(error);
      }

      return !error;
    });

    if (validFiles.length > availableSlots) {
      toast.error(`Only ${availableSlots} more image(s) can be added.`);
    }

    const filesToUpload = validFiles.slice(0, availableSlots);

    if (filesToUpload.length === 0) return;

    setIsUploadingImages(true);

    try {
      if (isEdit && product) {
        // Linked to the product gallery automatically; no PATCH needed.
        await uploadFiles(filesToUpload, "product_image", { productId: product.product_id });

        await refreshImages();

        toast.success(`Images added. ${REVIEW_NOTICE}`);
        return;
      }

      const uploaded = await uploadFiles(filesToUpload, "product_image");

      setImages((previous) =>
        withPrimaryImage([
          ...previous,
          ...uploaded.map((file, index) => ({
            id: file.fileId,
            url: file.url,
            name: filesToUpload[index]?.name ?? "Product image",
            fileId: file.fileId,
            isPrimary: false,
          })),
        ]),
      );
    } catch (error) {
      toast.error(getUploadErrorMessage(error));
    } finally {
      setIsUploadingImages(false);
    }
  };

  const replaceImage = async (id: string, file: File) => {
    const image = images.find((item) => item.id === id);

    if (!image?.fileId) {
      toast.error("This image can't be replaced here.");
      return;
    }

    const validationError = validateUploadFile(file, "product_image");

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setImageBusy(id, true);

    try {
      const replaced = await replaceFile(image.fileId, file);

      if (isEdit) {
        await refreshImages();

        toast.success(`Image replaced. ${REVIEW_NOTICE}`);
      } else {
        setImages((previous) =>
          previous.map((item) => (item.id === id ? { ...item, url: replaced.url, name: file.name } : item)),
        );
      }
    } catch (error) {
      toast.error(getUploadErrorMessage(error));
    } finally {
      setImageBusy(id, false);
    }
  };

  const removeImage = async (id: string) => {
    const image = images.find((item) => item.id === id);

    if (!image) return;

    if (isEdit && !image.fileId) {
      toast.error("This image can't be removed here.");
      return;
    }

    setImageBusy(id, true);

    try {
      if (image.fileId) {
        // 409 = the product's last image; the message asks to replace it instead.
        await deleteFile(image.fileId);
      }

      if (isEdit) {
        // The backend picks a new primary image when needed.
        await refreshImages();

        toast.success(`Image removed. ${REVIEW_NOTICE}`);
      } else {
        setImages((previous) => withPrimaryImage(previous.filter((item) => item.id !== id)));
      }
    } catch (error) {
      // 404 = the upload is already gone; drop it from the unsaved list.
      if (!isEdit && error instanceof ApiError && error.status === 404) {
        setImages((previous) => withPrimaryImage(previous.filter((item) => item.id !== id)));
      } else {
        toast.error(getUploadErrorMessage(error));
      }
    } finally {
      setImageBusy(id, false);
    }
  };

  /* Create mode only: PATCH does not accept images. */
  const setPrimaryImage = (id: string) => {
    setImages((previous) =>
      previous.map((image) => ({
        ...image,
        isPrimary: image.id === id,
      })),
    );
  };

  /* Create mode only: moves an image one position left (-1) or right (1). */
  const moveImage = (id: string, offset: -1 | 1) => {
    setImages((previous) => {
      const index = previous.findIndex((image) => image.id === id);
      const target = index + offset;

      if (index < 0 || target < 0 || target >= previous.length) {
        return previous;
      }

      const nextImages = [...previous];

      [nextImages[index], nextImages[target]] = [nextImages[target], nextImages[index]];

      return nextImages;
    });
  };

  /* =========================================
     BROCHURE (catalogue_url)
  ========================================= */

  const uploadCatalogue = async (file: File) => {
    const validationError = validateUploadFile(file, "product_brochure");

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsUploadingCatalogue(true);

    try {
      if (catalogueFile.fileId) {
        // Same fileId, new url. A saved product is updated by the backend.
        const replaced = await replaceFile(catalogueFile.fileId, file);

        setCatalogueFile({ fileId: replaced.fileId, name: file.name });
        updateField("catalogue_url", replaced.url);

        if (isEdit) {
          toast.success(`Brochure replaced. ${REVIEW_NOTICE}`);
        }

        return;
      }

      const uploaded = await uploadFile(
        file,
        "product_brochure",
        isEdit && product ? { productId: product.product_id } : {},
      );

      setCatalogueFile({ fileId: uploaded.fileId, name: file.name });
      updateField("catalogue_url", uploaded.url);

      if (isEdit) {
        toast.info("Brochure uploaded. Click Update Product to save it.");
      }
    } catch (error) {
      toast.error(getUploadErrorMessage(error));
    } finally {
      setIsUploadingCatalogue(false);
    }
  };

  const removeCatalogue = async () => {
    if (catalogueFile.fileId) {
      setIsUploadingCatalogue(true);

      try {
        // The backend also clears a saved catalogue_url.
        await deleteFile(catalogueFile.fileId);

        if (isEdit) {
          toast.success(`Brochure removed. ${REVIEW_NOTICE}`);
        }
      } catch (error) {
        if (!(error instanceof ApiError && error.status === 404)) {
          toast.error(getUploadErrorMessage(error));
          return;
        }
      } finally {
        setIsUploadingCatalogue(false);
      }
    }

    // Without a fileId (old external URL), the next save clears it.
    setCatalogueFile({});
    updateField("catalogue_url", "");
  };

  /* =========================================
     SAVE
  ========================================= */

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
    catalogueFileName: catalogueFile.name,
    isLoading,
    loadError,
    isUploading: isUploadingImages || isUploadingCatalogue || busyImageIds.length > 0,
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
  };
}
