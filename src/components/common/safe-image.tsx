"use client";

import { useEffect, useState } from "react";

import Image, { type ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = "/images/placeholders/image-placeholder.png";

function isRemoteUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://");
}

function canUseRemoteUrl(value: string) {
  if (!isRemoteUrl(value)) {
    return true;
  }

  try {
    const url = new URL(value);

    /*
     * For now reject example.com
     * placeholder URLs coming from backend.
     *
     * Later remove this condition when
     * backend provides actual S3/CDN URLs.
     */
    if (url.hostname === "example.com") {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function SafeImage({ src, fallbackSrc = DEFAULT_FALLBACK, alt, onError, ...props }: SafeImageProps) {
  const initialSrc = src && canUseRemoteUrl(src) ? src : fallbackSrc;

  const [imageSrc, setImageSrc] = useState(initialSrc);

  useEffect(() => {
    setImageSrc(src && canUseRemoteUrl(src) ? src : fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onError={(event) => {
        if (imageSrc !== fallbackSrc) {
          setImageSrc(fallbackSrc);
        }

        onError?.(event);
      }}
    />
  );
}
