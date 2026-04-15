/**
 * Custom inline SVG icons. Architectural style: 1.6px square caps,
 * miter joins, no rounded edges. Replaces lucide-react which read as
 * generic AI-slop iconography.
 */

type Props = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

const base = (size = 16) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
});

export const Check = ({ size = 16, className, strokeWidth = 2 }: Props) => (
  <svg {...base(size)} className={className} strokeWidth={strokeWidth}>
    <path d="M4 12 L10 18 L20 6" />
  </svg>
);

export const Arrow = ({ size = 16, className, strokeWidth = 1.6 }: Props) => (
  <svg {...base(size)} className={className} strokeWidth={strokeWidth}>
    <path d="M4 12 H20 M14 6 L20 12 L14 18" />
  </svg>
);

export const Send = ({ size = 16, className, strokeWidth = 2 }: Props) => (
  <svg {...base(size)} className={className} strokeWidth={strokeWidth}>
    <path d="M12 3 V21 M5 10 L12 3 L19 10" />
  </svg>
);

export const Pin = ({ size = 16, className, strokeWidth = 1.8 }: Props) => (
  <svg {...base(size)} className={className} strokeWidth={strokeWidth}>
    <path d="M12 22 C12 22 5 14 5 9 A7 7 0 0 1 19 9 C19 14 12 22 12 22 Z" />
    <circle cx="12" cy="9" r="2.4" fill="currentColor" stroke="none" />
  </svg>
);
