import { getServiceImage } from "@/config/images";

/** Priority treatments featured on city landing pages. */
export const priorityServiceLinks = [
  {
    category: "injectables",
    slug: "neurotoxin-treatment",
    title: "Botox",
    blurb: "Smooth fine lines with precise, natural-looking dosing.",
  },
  {
    category: "injectables",
    slug: "dermal-filler",
    title: "Dermal Filler",
    blurb: "Restore volume and refine facial contours.",
  },
  {
    category: "injectables",
    slug: "lip-filler",
    title: "Lip Filler",
    blurb: "Balanced lip shape and volume that still looks like you.",
  },
  {
    category: "injectables",
    slug: "sculptra",
    title: "Sculptra",
    blurb: "Stimulate collagen for gradual, lasting facial rejuvenation.",
  },
  {
    category: "skin",
    slug: "microneedling",
    title: "Microneedling",
    blurb: "Improve texture, tone, and acne scarring.",
  },
];

export function getPriorityServicesWithImages() {
  return priorityServiceLinks.map((service) => ({
    ...service,
    href: `/services/${service.category}/${service.slug}`,
    imageSrc: getServiceImage(service.category, service.slug),
  }));
}

export const locations = {
  denver: {
    slug: "denver",
    city: "Denver",
    seoTitle: "Botox, Filler & Aesthetic Medicine for Denver | Artful Aesthetic Medicine",
    seoDescription:
      "Looking for Botox, lip filler, Sculptra, or microneedling near Denver? Visit Artful Aesthetic Medicine in Englewood — minutes from Denver, led by Erica Eskeli.",
    h1: "Aesthetic Medicine for Denver",
    eyebrow: "Serving Denver Metro",
    subtitle:
      "Botox, fillers, Sculptra, and skin treatments for Denver patients — at our Englewood studio just south of the city.",
    intro: [
      "Denver patients choose Artful Aesthetic Medicine for natural results and careful, personalized dosing — not a rushed injectables mill. Owner and aesthetic injector Erica Eskeli brings over a decade of experience in Botox, filler, and skin treatments.",
      "Our studio is at 811 Englewood Pkwy in Englewood, CO — a short drive from downtown Denver, Cherry Creek, and the surrounding metro. Same trusted care whether you live in Denver proper or nearby suburbs.",
    ],
    whyTitle: "Why Denver patients come to Englewood",
    whyBody:
      "You do not need a downtown storefront to get exceptional aesthetic care. Many Denver clients prefer a calm, appointment-focused studio where Erica can take time with anatomy, goals, and product selection — including Botox alternatives like Letybo, Dysport, and Daxxify when they fit better.",
    faq: [
      {
        q: "How far is Artful Aesthetic Medicine from downtown Denver?",
        a: "We are at 811 Englewood Pkwy in Englewood — typically about 15–25 minutes from downtown Denver depending on traffic. Patients also visit from Cherry Creek, Capitol Hill, and the Tech Center corridor.",
      },
      {
        q: "Do you offer the best Botox near Denver?",
        a: "“Best” means precise placement, conservative dosing, and results that still look like you. Erica Eskeli focuses on natural movement and personalized plans — not overdone or cookie-cutter treatment. We also offer Letybo, Dysport, and Daxxify so product choice matches your goals and lifestyle.",
      },
      {
        q: "Can Denver residents book lip filler or dermal filler?",
        a: "Yes. Denver metro patients regularly book lip filler, cheek and jawline filler, and full-face contouring consultations. Start with a consultation so we can map the right approach for your features.",
      },
      {
        q: "Do you offer Sculptra and microneedling for Denver patients?",
        a: "Yes. Sculptra for collagen biostimulation and professional microneedling for texture and scarring are available at our Englewood studio for patients across the Denver metro.",
      },
    ],
  },
  englewood: {
    slug: "englewood",
    city: "Englewood",
    seoTitle: "Botox, Filler & Med Spa in Englewood, CO | Artful Aesthetic Medicine",
    seoDescription:
      "Artful Aesthetic Medicine in Englewood, CO — Botox, dermal filler, lip filler, Sculptra, and microneedling by Erica Eskeli. Book at 811 Englewood Pkwy.",
    h1: "Aesthetic Medicine in Englewood, CO",
    eyebrow: "Englewood Studio",
    subtitle:
      "Your local studio for Botox, fillers, Sculptra, and skin treatments — intentional care on Englewood Pkwy.",
    intro: [
      "Artful Aesthetic Medicine is based in Englewood, Colorado. If you are searching for Botox in Englewood, lip filler, dermal filler, Sculptra, or microneedling close to home, you will find a focused, appointment-based practice led by Erica Eskeli.",
      "We are at 811 Englewood Pkwy, Englewood CO 80110. Call 303.901.3381 or book online. Patients from Englewood, Greenwood Village, Centennial, and across the Denver metro are welcome.",
    ],
    whyTitle: "Local Englewood care, elevated standards",
    whyBody:
      "Living or working in Englewood means you can maintain treatments without a long commute. Erica’s approach emphasizes natural results, clear education, and dosing that respects your facial anatomy — whether you are new to Botox or refining an existing plan.",
    faq: [
      {
        q: "Where is your Englewood location?",
        a: "Artful Aesthetic Medicine is at 811 Englewood Pkwy, Englewood CO 80110. Hours are Monday–Friday 9am–4pm. Call 303.901.3381 or book through our online scheduler.",
      },
      {
        q: "Do you see Englewood patients for lip filler?",
        a: "Yes. Lip filler is one of our most requested treatments for Englewood and nearby clients who want balanced volume and shape without an overfilled look.",
      },
      {
        q: "Is Botox available in Englewood at your studio?",
        a: "Yes. We offer Botox and related options such as Letybo, Dysport, and Daxxify, with dosing tailored to your goals. Many patients searching for Botox in Englewood start with a consultation to choose the right product and plan.",
      },
      {
        q: "What other treatments do Englewood clients book most?",
        a: "Beyond Botox and filler, Englewood patients frequently book Sculptra for gradual collagen support and microneedling for texture, pores, and acne scarring.",
      },
    ],
  },
};

export function getLocation(slug) {
  return locations[slug] || null;
}

export function getAllLocationSlugs() {
  return Object.keys(locations);
}
