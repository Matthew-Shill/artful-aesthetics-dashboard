/**
 * Site imagery — stock photos (Unsplash) plus client photography.
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
    /** Botox / facial injection — Unsplash (qehqLHZ9toc) */
    "aesthetic-injectables":
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
    /** Toned physique — body sculpting / CoolTone */
    "body-contouring":
      "https://images.unsplash.com/photo-1646909876562-9a00dab98e65?auto=format&fit=crop&w=800&q=80",
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
  services: {
    default:
      "https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=1400&q=80",
    microblading: "/images/erica-eskeli.png",
  },
};

export function getCategoryImage(slug) {
  return images.categories[slug] || images.services.default;
}

export function getServiceImage(categorySlug) {
  if (categorySlug === "microblading") return images.erica.src;
  return getCategoryImage(categorySlug);
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
