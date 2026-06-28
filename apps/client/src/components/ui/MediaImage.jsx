import Image from "next/image";

export function MediaImage({ src, alt, className, priority, fill, sizes, width, height }) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes || "100vw"}
        style={{ objectFit: "cover" }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      sizes={sizes}
      style={{ objectFit: "cover", width: "100%", height: "100%" }}
    />
  );
}
