import { NAV_LINKS, PROFILE } from "@/lib/data";

const SOCIALS = ["LinkedIn", "Instagram", "GitHub", "YouTube"];

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-ink-950">
      <div className="shell py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand */}
          <div>
            <span className="font-display text-base font-semibold text-mist-100">
              Halit Statovci
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-500">
              Full-Cycle AI Engineer & Digital Solutions Builder. Websites,
              workflows, media, and systems — built to work together.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-mist-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
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
                    className="text-sm text-mist-400 transition-colors hover:text-mist-100"
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
                  className="text-sm text-mist-400 transition-colors hover:text-accent"
                >
                  {PROFILE.email}
                </a>
              </li>
              {SOCIALS.map((s) => (
                <li key={s}>
                  <a
                    href="#contact"
                    className="text-sm text-mist-400 transition-colors hover:text-mist-100"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/6 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-mist-600">
            © {new Date().getFullYear()} Halit Statovci. All rights reserved.
          </p>
          <p className="text-xs text-mist-600">
            Designed & engineered from idea to launch — {PROFILE.location}.
          </p>
        </div>
      </div>
    </footer>
  );
}
