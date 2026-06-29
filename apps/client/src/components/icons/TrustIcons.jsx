const trustIconProps = {
  width: 32,
  height: 32,
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function ExpertCareIcon(props) {
  return (
    <svg {...trustIconProps} {...props}>
      <path d="M16 4l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" />
    </svg>
  );
}

export function NaturalResultsIcon(props) {
  return (
    <svg {...trustIconProps} {...props}>
      <circle cx="16" cy="16" r="10" />
      <path d="M11 16c1.5-2 3-2 5 0s3.5 2 5 0" />
    </svg>
  );
}

export function PersonalizedPlanIcon(props) {
  return (
    <svg {...trustIconProps} {...props}>
      <rect x="8" y="6" width="16" height="20" rx="2" />
      <path d="M12 12h8M12 16h8M12 20h5" />
    </svg>
  );
}

export function BenefitCheckIcon(props) {
  return (
    <svg {...trustIconProps} width={24} height={24} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  );
}
