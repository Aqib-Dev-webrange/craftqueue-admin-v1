"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface SupabaseImageProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
}

export function SupabaseImage({
  src,
  alt,
  fallback = "/images/placeholder.jpg",
  className,
  width,
  height,
  fill,
  priority = false,
  ...props
}: SupabaseImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(fallback);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (src.includes("/authenticated/")) {
          // Extract path after bucket name
          const fullPath = src.split("/authenticated/")[1];
          const { data, error } = await supabase.storage
            .from("images") // your bucket name
            .download(fullPath);

          if (error || !data) {
            throw error;
          }

          const url = URL.createObjectURL(data);
          setImgSrc(url);
        } else {
          setImgSrc(src); // Public images
        }
      } catch (err) {
        console.error("Image load failed:", err);
        setImgSrc(fallback);
        setHasError(true);
      }
    };

    loadImage();
  }, [src, fallback]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      fill={fill}
      priority={priority}
      onError={handleError}
      {...props}
    />
  );
}
