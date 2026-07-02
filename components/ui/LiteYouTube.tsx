"use client";

import { useState } from "react";

/**
 * Lite YouTube embed — renders a lightweight click-to-load facade (thumbnail +
 * play control) and only injects the real iframe after user interaction, so
 * the page never pays the YouTube embed cost up front.
 */
export function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group/yt relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-ink-950">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="absolute inset-0 h-full w-full cursor-pointer text-left"
        >
          {/* thumbnail (lazy) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover/yt:opacity-100"
          />
          {/* cinematic grade over the thumb */}
          <span className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/40" />

          {/* viewfinder corner brackets */}
          <span className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 border-l border-t border-accent/50" />
          <span className="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 border-r border-t border-accent/50" />
          <span className="pointer-events-none absolute bottom-2.5 left-2.5 h-4 w-4 border-b border-l border-accent/50" />
          <span className="pointer-events-none absolute bottom-2.5 right-2.5 h-4 w-4 border-b border-r border-accent/50" />

          {/* REC-style status line */}
          <span className="absolute left-4 top-4 flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-red-400/90">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            Play
          </span>
          <span className="absolute right-4 top-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mist-400">
            YouTube · 4K
          </span>

          {/* play control */}
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-ink-950/70 backdrop-blur transition-all duration-300 group-hover/yt:scale-110 group-hover/yt:border-accent/60">
            <span className="ml-1 block h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-mist-100" />
          </span>

          {/* title strip */}
          <span className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4">
            <span className="text-[0.82rem] font-medium leading-snug text-mist-100 [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
              {title}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
