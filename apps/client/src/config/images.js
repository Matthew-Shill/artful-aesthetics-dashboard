/**
 * Site imagery — client photography plus stock photos (Unsplash).
 */
export const images = {
  hero: {
    src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1400&q=80",
    alt: "Serene med spa treatment room with soft natural light",
    video:
      "https://uod.gce.mybluehost.me/website_d1af7ed0/wp-content/uploads/2025/05/Artful-back-v2-1.mp4",
  },
  erica: {
    src: "/images/erica-eskeli.png",
    alt: "Erica Eskeli, Owner & Aesthetic Injector at Artful Aesthetic Medicine",
  },
  categories: {
    /** Botox / facial injection — Unsplash (fallback for injectables without a dedicated result photo) */
    injectables:
      "https://images.unsplash.com/photo-1746708810803-722593e53772?auto=format&fit=crop&w=800&q=80",
    skin: "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&q=80",
    /** Active woman — weight management / wellness journey */
    "weight-loss":
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
    /** Laser device on patient — Unsplash (nmN0MAHoFjQ) */
    "laser-hair-removal":
      "https://images.unsplash.com/photo-1746806942799-b4db209e9a6b?auto=format&fit=crop&w=800&q=80",
    wellness:
      "https://images.unsplash.com/photo-1763310225009-50214e3c99d9?auto=format&fit=crop&w=800&q=80",
    /** Hip / thigh — Aveli cellulite treatment area */
    "cellulite-treatment":
      "https://images.unsplash.com/photo-1647832878669-b1c524dbc883?auto=format&fit=crop&w=800&q=80",
    microblading: "/images/erica-eskeli.png",
  },
  blog: {
    default:
      "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=800&q=80",
    skincare:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    wellness:
      "https://images.unsplash.com/photo-1763310225009-50214e3c99d9?auto=format&fit=crop&w=800&q=80",
  },
  /**
   * Per-service imagery. Values may be a path string or an array of paths
   * (first image is the primary / hero cover).
   */
  services: {
    default:
      "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=1400&q=80",
    "non-surgical-nose-job": [
      "/images/treatments/nose-job-1.jpg",
      "/images/treatments/nose-job-2.jpg",
    ],
    "dermal-filler": [
      "/images/treatments/dermal-filler-jaw-1.jpg",
      "/images/treatments/dermal-filler-jaw-2.jpg",
    ],
    "lip-filler": "/images/treatments/lip-filler.jpg",
    "plla-pdo-threads": "/images/treatments/plla-pdo-threads.jpg",
    /** Hip / buttock / thigh — Aveli treatment area (not muscle toning) */
    aveli:
      "https://images.unsplash.com/photo-1647832878669-b1c524dbc883?auto=format&fit=crop&w=1400&q=80",
    microblading: "/images/treatments/microblading.jpg",
  },
};

function normalizeServiceImages(entry) {
  if (!entry) return [];
  return Array.isArray(entry) ? entry.filter(Boolean) : [entry];
}

export function getCategoryImage(slug) {
  return images.categories[slug] || images.services.default;
}

/** Primary cover image for a service (falls back to category image). */
export function getServiceImage(categorySlug, serviceSlug) {
  const fromService = normalizeServiceImages(images.services[serviceSlug])[0];
  if (fromService) return fromService;
  return getCategoryImage(categorySlug);
}

/** All result images for a service (empty if none configured). */
export function getServiceGallery(serviceSlug) {
  return normalizeServiceImages(images.services[serviceSlug]);
}

export function getBlogImage(category) {
  if (category?.toLowerCase().includes("wellness")) return images.blog.wellness;
  if (category?.toLowerCase().includes("skin")) return images.blog.skincare;
  return images.blog.default;
}

export function getEricaImageAlt(context = "profile") {
  if (context === "microblading") {
    return "Erica Eskeli performing microblading at Artful Aesthetic Medicine";
  }
  return images.erica.alt;
}
