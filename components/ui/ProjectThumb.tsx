"use client";

import { ProjectVisual } from "@/components/ui/ProjectVisual";
import type { CaseStudy } from "@/lib/projects";

/** thumbnail (real screenshot) or the stylized fallback visual */
export function ProjectThumb({
  project,
  className,
}: {
  project: CaseStudy;
  className: string;
}) {
  if (project.thumbnail) {
    return (
      <div className={`relative overflow-hidden bg-ink-900 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`./${project.thumbnail}`}
          alt={`${project.title} — website screenshot`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {/* cinematic grade so thumbnails sit in the dark theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-ink-950/20" />
        {project.protected && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 border border-accent/30 bg-ink-950/80 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-accent backdrop-blur">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="11" width="14" height="9" rx="1.5" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            Protected system
          </span>
        )}
      </div>
    );
  }
  return (
    <ProjectVisual
      hue={project.hue ?? "212"}
      screen={project.screen ?? "dashboard"}
      label={project.urlLabel ?? project.title}
      className={className}
    />
  );
}
