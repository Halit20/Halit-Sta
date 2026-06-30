import type { IconName } from "@/lib/data";

const paths: Record<IconName, React.ReactNode> = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 21h8M12 18v3" />
    </>
  ),
  ai: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2v3.2M12 18.8V22M2 12h3.2M18.8 12H22M5 5l2.3 2.3M16.7 16.7 19 19M19 5l-2.3 2.3M7.3 16.7 5 19" />
    </>
  ),
  brand: (
    <>
      <path d="M12 3l2.4 5.3L20 9l-4 4 1 6-5-2.8L7 19l1-6-4-4 5.6-.7z" />
    </>
  ),
  media: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10 9.5v5l4-2.5z" />
    </>
  ),
  infra: (
    <>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
    </>
  ),
  consulting: (
    <>
      <path d="M12 3a9 9 0 0 0-9 9c0 4 3 7.5 7 8.7" />
      <path d="M12 3a9 9 0 0 1 9 9c0 4-3 7.5-7 8.7" />
      <circle cx="12" cy="12" r="2.4" />
    </>
  ),
};

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
