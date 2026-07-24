export const siteConfig = {
  name: "Artful Aesthetic Medicine",
  tagline: "Intentional Beauty. Artfully Crafted.",
  heroHeadline: ["Intentional Beauty.", "Artfully Crafted."],
  logo: {
    /** Switch to "redesign" when ready to use the horizontal icon + text logo. */
    variant: "owner",
    alt: "Artful Aesthetic Medicine",
    owner: {
      dark: "/images/artful-logo-owner-dark.png",
      light: "/images/artful-logo-owner-light.png",
      gold: "/images/artful-logo-owner-gold.png",
    },
    redesign: {
      icon: "/images/artful-logo-icon-transparent.png",
    },
    full: "/images/artful-logo-full.png",
    /** Tab / PWA icon — circular monogram from the owner logo. */
    icon: "/images/artful-logo-favicon.png",
  },
  description:
    "Personalized aesthetic care in Englewood, CO — crafted with intention by Erica Eskeli. Botox, fillers, skin treatments, IV therapy, and more.",
  url: "https://www.artfulaestheticmedicine.com",
  /** Default Open Graph / social share image (landscape) — Injectables stock. */
  ogImage:
    "https://images.unsplash.com/photo-1746708810803-722593e53772?auto=format&fit=crop&w=1200&h=630&q=80",
  bookingUrl: "https://booking.mangomint.com/artfulaestheticmedicine",
  loginUrl: "/login",
  phone: "303.901.3381",
  phoneE164: "+13039013381",
  phoneHref: "tel:+13039013381",
  email: "erica@artfulaestheticmedicine.com",
  founder: {
    name: "Erica Eskeli",
    jobTitle: "Owner & Aesthetic Injector",
    image: "/images/erica-eskeli.png",
  },
  keywords: [
    "aesthetic medicine Englewood CO",
    "med spa Englewood",
    "Botox Englewood CO",
    "dermal filler Englewood",
    "lip filler Denver metro",
    "microneedling Englewood",
    "IV therapy Englewood CO",
    "laser hair removal Englewood",
    "microblading Englewood",
    "Erica Eskeli",
  ],
  address: {
    street: "811 Englewood Pkwy",
    city: "Englewood",
    state: "CO",
    zip: "80110",
    full: "811 Englewood Pkwy, Englewood CO 80110",
    mapsUrl: "https://maps.google.com/?q=811+Englewood+Pkwy+Englewood+CO+80110",
  },
  geo: {
    latitude: 39.5807,
    longitude: -104.987,
  },
  hours: [
    { days: "Mon – Fri", time: "9am – 4pm" },
    { days: "Saturday", time: "Closed" },
    { days: "Sunday", time: "Closed" },
  ],
  openingHoursSpecification: [
    { dayOfWeek: "Monday", opens: "09:00", closes: "16:00" },
    { dayOfWeek: "Tuesday", opens: "09:00", closes: "16:00" },
    { dayOfWeek: "Wednesday", opens: "09:00", closes: "16:00" },
    { dayOfWeek: "Thursday", opens: "09:00", closes: "16:00" },
    { dayOfWeek: "Friday", opens: "09:00", closes: "16:00" },
  ],
  director: "Dr. Jonathan Stewart Gallen",
  social: {},
  nav: [
    { label: "Home", href: "/" },
    {
      label: "Injectables",
      href: "/services/injectables",
      children: [
        { label: "Non-Surgical Nose Job", href: "/services/injectables/non-surgical-nose-job" },
        { label: "Neurotoxin Treatment", href: "/services/injectables/neurotoxin-treatment" },
        { label: "Dissolver", href: "/services/injectables/dissolver" },
        { label: "Dermal Filler", href: "/services/injectables/dermal-filler" },
        { label: "PLLA PDO Threads", href: "/services/injectables/plla-pdo-threads" },
        { label: "Lip Filler", href: "/services/injectables/lip-filler" },
      ],
    },
    {
      label: "Skin",
      href: "/services/skin",
      children: [
        { label: "Plasma Pen Treatment", href: "/services/skin/plasma-pen-treatment" },
        { label: "Microneedling", href: "/services/skin/microneedling" },
        { label: "IPL Treatment", href: "/services/skin/ipl-treatment" },
        { label: "Glow Treatment", href: "/services/skin/glow-treatment" },
        { label: "CO2 Ablative Treatment", href: "/services/skin/co2-ablative-treatment" },
      ],
    },
    {
      label: "Weight Loss",
      href: "/services/weight-loss",
      children: [
        { label: "Weight Loss Injections", href: "/services/weight-loss/weight-loss-injections" },
      ],
    },
    {
      label: "Laser Hair Removal",
      href: "/services/laser-hair-removal",
      children: [
        { label: "Laser Removal Treatments", href: "/services/laser-hair-removal/laser-removal-treatments" },
      ],
    },
    {
      label: "Wellness",
      href: "/services/wellness",
      children: [
        { label: "NAD+ Booster", href: "/services/wellness/nad-booster" },
        { label: "Glutathione Treatment", href: "/services/wellness/glutathione-treatment" },
        { label: "Biotin", href: "/services/wellness/biotin" },
        { label: "B12 Shots", href: "/services/wellness/b12-shots" },
        { label: "Beauty Bag IV", href: "/services/wellness/beauty-bag-iv" },
        { label: "Artful IV Therapy", href: "/services/wellness/artful-iv-therapy" },
      ],
    },
    {
      label: "Cellulite Treatment",
      href: "/services/cellulite-treatment",
      children: [
        { label: "Aveli", href: "/services/cellulite-treatment/aveli" },
      ],
    },
    {
      label: "Microblading by Erica",
      href: "/services/microblading",
      children: [
        { label: "Microblading", href: "/services/microblading/microblading" },
      ],
    },
    { label: "Consultation", href: "/consultation" },
  ],
};


/** Deep-link to Mangomint for a treatment when service / category IDs are known. */
export function getServiceBookingUrl(service) {
  const base = siteConfig.bookingUrl;
  if (service?.mangomintServiceId != null) {
    return `${base}?serviceId=${service.mangomintServiceId}`;
  }
  if (service?.mangomintShowOnlyScId != null) {
    return `${base}?showOnlyScId=${service.mangomintShowOnlyScId}`;
  }
  return base;
}

export const testimonials = [
  {
    quote:
      "Erica is THE Best! Such an expert with a wealth of knowledge. I always feel like I'm in good hands and she makes me look incredible.",
    author: "Celeste Pfeiffer",
  },
];

export const trustCards = [
  {
    title: "Expert Care",
    description: "Led by Erica Eskeli with over a decade in medical aesthetics.",
  },
  {
    title: "Natural Results",
    description: "Enhancements that look like you — never overdone.",
  },
  {
    title: "Personalized Plan",
    description: "Every treatment tailored to your goals and anatomy.",
  },
];

