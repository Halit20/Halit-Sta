import type { ReactNode } from "react";
import { SectionAtmosphere, type Tone } from "@/components/ui/SectionAtmosphere";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** show a faint top divider line */
  divider?: boolean;
  /** per-section background mood */
  tone?: Tone;
};

export function Section({ id, children, className = "", divider, tone }: Props) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-24 sm:py-28 lg:py-32 ${className}`}
    >
      {tone && <SectionAtmosphere tone={tone} />}
      {divider && (
        <div className="relative z-[1] shell">
          <div className="divider-line mb-20" />
        </div>
      )}
      <div className="relative z-[1] shell">{children}</div>
    </section>
  );
}
