// Minimal stand-in for next/image in the static build: a plain <img>.
/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | { src: string };
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  unoptimized?: boolean;
};

export default function Image({ src, alt = "", fill, priority, quality, unoptimized, style, ...rest }: Props) {
  void quality;
  void unoptimized;
  const url = typeof src === "string" ? src : src.src;
  const fillStyle: CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
    : {};
  return <img src={url} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" style={{ ...fillStyle, ...style }} {...rest} />;
}
