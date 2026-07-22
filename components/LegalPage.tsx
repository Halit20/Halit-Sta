import { PROFILE } from "@/lib/data";

/**
 * Minimal shell for the legal pages (/privacy, /terms).
 * Deliberately does not reuse the site Footer — its nav links are #hash
 * anchors that only resolve on the home page. Links use explicit .html
 * targets so the pages also work when the export is opened via file://.
 */
export function LegalPage({
  title,
  updated,
  otherPage,
  children,
}: {
  title: string;
  updated: string;
  otherPage: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-ink-950">
      <header className="border-b border-white/8">
        <div className="shell flex items-center justify-between py-6">
          <a
            href="./index.html"
            className="font-display text-base font-semibold text-mist-100"
          >
            Halit Sta<span className="text-accent">.</span>
          </a>
          <a
            href="./index.html"
            className="text-[0.72rem] uppercase tracking-[0.18em] text-mist-400 transition-colors hover:text-mist-100"
          >
            ← Back to site
          </a>
        </div>
      </header>

      <main className="shell flex-1 py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-4 font-display text-3xl font-bold text-mist-100 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-mist-600">
            Last updated: {updated}
          </p>
          <div className="legal-prose mt-10">{children}</div>
        </div>
      </main>

      <footer className="border-t border-white/8">
        <div className="shell flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-mist-600">
            © {new Date().getFullYear()} Halit Statovci · {PROFILE.location}
          </p>
          <a
            href={otherPage.href}
            className="text-xs text-mist-500 transition-colors hover:text-mist-200"
          >
            {otherPage.label}
          </a>
        </div>
      </footer>
    </div>
  );
}
