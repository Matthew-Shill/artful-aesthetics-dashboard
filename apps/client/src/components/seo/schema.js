import { siteConfig } from "@/config/site";

export function getBusinessId() {
  return `${siteConfig.url}/#medicalbusiness`;
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@id": getBusinessId(),
    },
  };
}

export function getMedicalBusinessSchema() {
  const {
    address,
    geo,
    openingHoursSpecification,
    phoneE164,
    email,
    name,
    url,
    description,
    founder,
    social,
  } = siteConfig;

  const sameAs = Object.values(social || {}).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": getBusinessId(),
    name,
    description,
    url,
    telephone: phoneE164,
    email,
    image: `${url}${siteConfig.logo.full}`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    openingHoursSpecification: openingHoursSpecification.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.dayOfWeek,
      opens: entry.opens,
      closes: entry.closes,
    })),
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.jobTitle,
      image: `${url}${founder.image}`,
      worksFor: { "@id": getBusinessId() },
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function getServiceSchema(service) {
  const description = service.seoDescription
    || (Array.isArray(service.description) ? service.description.join(" ") : service.description);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1 || service.title,
    description,
    url: `${siteConfig.url}/services/${service.category}/${service.slug}`,
    provider: {
      "@id": getBusinessId(),
    },
    areaServed: {
      "@type": "City",
      name: "Englewood",
      containedInPlace: {
        "@type": "State",
        name: "Colorado",
      },
    },
  };
}

export function getFaqPageSchema(faq) {
  if (!faq?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function getBreadcrumbSchema(items) {
  if (!items?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http")
        ? item.path
        : `${siteConfig.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function getBlogPostingSchema(post, imageUrl) {
  const url = `${siteConfig.url}/blog/${post.slug}`;
  const image =
    !imageUrl
      ? siteConfig.ogImage
      : imageUrl.startsWith("http")
        ? imageUrl
        : `${siteConfig.url}${imageUrl}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image,
    author: {
      "@type": "Person",
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.jobTitle,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logo.full}`,
      },
    },
  };
}
