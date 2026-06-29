import {
  Syringe,
  Sparkles,
  Scale,
  Zap,
  HeartPulse,
  Dumbbell,
  Brush,
} from "lucide-react";

const CATEGORY_ICONS = {
  "aesthetic-injectables": Syringe,
  skin: Sparkles,
  "weight-loss": Scale,
  "laser-hair-removal": Zap,
  wellness: HeartPulse,
  "body-contouring": Dumbbell,
  microblading: Brush,
};

export function CategoryIcon({ slug, className, size, width, height, strokeWidth = 1.75, ...props }) {
  const Icon = CATEGORY_ICONS[slug];
  if (!Icon) return null;

  const iconSize = width ?? height ?? size ?? 28;

  return (
    <Icon
      className={className}
      size={iconSize}
      strokeWidth={strokeWidth}
      aria-hidden
      {...props}
    />
  );
}

export function categorySlugFromHref(href) {
  if (!href) return null;
  const match = href.match(/\/services\/([^/]+)/);
  return match?.[1] ?? null;
}
