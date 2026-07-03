import { NAV_LINKS, PROFILE } from "@/lib/data";

const SOCIALS = [
  { label: "LinkedIn", href: PROFILE.linkedin },
  { label: "GitHub", href: PROFILE.github },
  { label: `Instagram ${PROFILE.instagramHandle}`, href: PROFILE.instagram },
  { label: "Facebook", href: PROFILE.facebook },
  { label: "X", href: PROFILE.x },
  { label: "YouTube — Dyshja n'Natyrë", href: PROFILE.youtube },
  { label: "Twitch", href: PROFILE.twitch },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-ink-950">
      <div className="shell py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand */}
          <div>
            <span className="font-display text-base font-semibold text-mist-100">
              Halit Sta<span className="text-accent">.</span>
            </span>
            <p className="mt-4 max-w-sm font-display text-2xl font-bold leading-snug text-mist-100">
              Full-Cycle AI Engineer.{" "}
              <span className="accent-italic text-glitch">
                Digital Solutions Builder.
              </span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-500">
              Websites, workflows, media, and systems — built to work
              together.
            </p>
            <p className="mt-5 inline-flex items-center gap-2.5 border border-white/10 bg-white/[0.02] px-3.5 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-mist-400">
              <span className="h-1.5 w-1.5 bg-accent" />
              Available for selected projects · Kosovo / Remote
            </p>
          </div>

          {/* nav */}
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-mist-600">
              Navigate
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[0.78rem] uppercase tracking-[0.1em] text-mist-400 transition-colors hover:text-mist-100"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* connect */}
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-mist-600">
              Connect
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-[0.78rem] uppercase tracking-[0.1em] text-mist-400 transition-colors hover:text-accent"
                >
                  {PROFILE.email}
                </a>
              </li>
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.78rem] uppercase tracking-[0.1em] text-mist-400 transition-colors hover:text-mist-100"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/6 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-mist-600">
            © {new Date().getFullYear()} Halit Sta. All rights reserved.
          </p>
          <p className="text-xs text-mist-600">
            Designed & engineered from idea to launch — {PROFILE.location}.
          </p>
        </div>
      </div>
    </footer>
  );
}
