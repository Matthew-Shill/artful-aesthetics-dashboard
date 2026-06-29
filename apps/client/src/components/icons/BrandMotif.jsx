export function BrushStrokeMotif({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 80C60 40 120 100 200 60C280 20 340 70 400 50V120H0V80Z"
        fill="currentColor"
        opacity="0.06"
      />
      <path
        d="M0 90C80 55 160 95 260 65C320 48 360 75 400 60"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.12"
      />
    </svg>
  );
}

export function HatchingPattern({ className }) {
  return (
    <svg className={className} width="100%" height="100%" aria-hidden="true">
      <defs>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.08" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hatch)" />
    </svg>
  );
}
