import { siteConfig } from "@/config/site";

function toAbsoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return siteConfig.ogImage;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  return `${siteConfig.url}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

function flattenTitle(title) {
  if (!title) return null;
  if (typeof title === "object" && title.absolute) return title.absolute;
  return title;
}

/**
 * Build Next.js Metadata with canonical, Open Graph, and Twitter card fields.
 */
export function buildPageMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  absoluteTitle = false,
  noIndex = false,
}) {
  const canonical = `${siteConfig.url}${path === "/" ? "" : path}`;
  const flatTitle = flattenTitle(title);
  const useAbsolute = absoluteTitle || (typeof title === "object" && Boolean(title?.absolute));
  const ogTitle = useAbsolute
    ? flatTitle || siteConfig.name
    : flatTitle
      ? `${flatTitle} | ${siteConfig.name}`
      : siteConfig.name;
  const ogImage = toAbsoluteUrl(image);
  const ogDescription = description || siteConfig.description;

  const metadata = {
    description: ogDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_US",
      type,
      images: [
        {
          url: ogImage,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };

  if (useAbsolute && flatTitle) {
    metadata.title = { absolute: flatTitle };
  } else if (flatTitle) {
    metadata.title = flatTitle;
  }

  if (noIndex) {
    metadata.robots = { index: false, follow: false };
  }

  return metadata;
}
