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
    icon: "/images/artful-logo-icon-transparent.png",
  },
  description:
    "Personalized aesthetic care in Englewood, CO — crafted with intention by Erica Eskeli.",
  url: "https://artfulaestheticmedicine.com",
  bookingUrl: "https://booking.mangomint.com/artfulaestheticmedicine",
  loginUrl: "/login",
  phone: "303.901.3381",
  phoneHref: "tel:+13039013381",
  email: "erica@artfulaestheticmedicine.com",
  address: {
    street: "811 Englewood Pkwy",
    city: "Englewood",
    state: "CO",
    zip: "80110",
    full: "811 Englewood Pkwy, Englewood CO 80110",
    mapsUrl: "https://maps.google.com/?q=811+Englewood+Pkwy+Englewood+CO+80110",
  },
  hours: [
    { days: "Mon – Fri", time: "9am – 4pm" },
    { days: "Saturday", time: "Closed" },
    { days: "Sunday", time: "Closed" },
  ],
  director: "Dr. Jonathan Stewart Gallen",
  social: {},
  nav: [
    { label: "Home", href: "/" },
    {
      label: "Aesthetic Injectables",
      href: "/services/aesthetic-injectables",
      children: [
        { label: "Non-Surgical Nose Job", href: "/services/aesthetic-injectables/non-surgical-nose-job" },
        { label: "Neurotoxin Treatment", href: "/services/aesthetic-injectables/neurotoxin-treatment" },
        { label: "Dissolver", href: "/services/aesthetic-injectables/dissolver" },
        { label: "Dermal Filler", href: "/services/aesthetic-injectables/dermal-filler" },
        { label: "PLLA PDO Threads", href: "/services/aesthetic-injectables/plla-pdo-threads" },
        { label: "Lip Filler", href: "/services/aesthetic-injectables/lip-filler" },
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
      label: "Body Contouring",
      href: "/services/body-contouring",
      children: [
        { label: "CoolTone", href: "/services/body-contouring/cooltone" },
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
    { label: "Blog", href: "/blog" },
  ],
};

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

