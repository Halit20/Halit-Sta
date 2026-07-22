"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { EASE } from "@/lib/motion";
import { SERVICES } from "@/lib/data";
import type { Service } from "@/lib/data";

/* One connected system, not six tiles: a vertical stack of service
   modules wired to a single spine. The active module powers the big
   detail panel (desktop) or expands inline (mobile). */

/* module → contact-form service option, used to preselect on CTA click */
const SERVICE_TO_FORM: Record<string, string> = {
  "01": "Website / Web Platform",
  "02": "AI & Automation",
  "03": "Branding & Design",
  "04": "Video / Photo / Drone",
  "05": "Infrastructure & Deployment",
  "06": "Digital Consulting",
};

function ServiceDetail({ service }: { service: Service }) {
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-0 select-none font-display text-[7rem] font-bold leading-none text-white/[0.03]"
      >
        {service.num}
      </span>

      <div className="relative flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
          <Icon name={service.icon} className="h-6 w-6" />
        </span>
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-mist-500">
            Module {service.num} / 06
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-mist-100">
            {service.title}
          </h3>
        </div>
      </div>

      <p className="mt-6 text-[0.95rem] leading-relaxed text-mist-300">
        {service.description}
      </p>

      {service.note && (
        <p className="mt-4 border-l-2 border-accent/40 pl-3 text-[0.8rem] leading-relaxed text-mist-500">
          {service.note}
        </p>
      )}

      <p className="mt-7 text-[0.62rem] uppercase tracking-[0.24em] text-mist-500">
        Includes
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {service.includes.map((item) => (
          <li
            key={item}
            className="rounded-full border border-white/8 bg-white/[0.02] px-2.5 py-1 text-[0.72rem] text-mist-400"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-7 flex items-start gap-2 border-t border-white/6 pt-5">
        <span className="mt-[3px] shrink-0 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-accent/80">
          Best for
        </span>
        <span className="text-[0.85rem] leading-snug text-mist-300">
          {service.bestFor}
        </span>
      </div>

      <a
        href="#contact"
        onClick={() => {
          const mapped = SERVICE_TO_FORM[service.num];
          if (mapped && typeof window !== "undefined")
            window.dispatchEvent(
              new CustomEvent("contact:preselect", { detail: mapped })
            );
        }}
        className="mt-6 inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.16em] text-mist-400 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60"
      >
        Discuss this service
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </div>
  );
}

export function Services() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <Section id="services" tone="calm">
      <SectionHeading
        eyebrow="Services"
        title="The full digital layer of a business — built from *strategy to launch.*"
        subtitle="Strategy, engineering, AI, design, media, and infrastructure — connected as one system instead of managed across six separate vendors."
      />

      {/* soft shade so the moving background stays behind both columns;
          radial falloff keeps it from reading as a panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-32 bottom-0 bg-[radial-gradient(80%_90%_at_50%_55%,rgba(3,3,3,0.5),transparent_82%)]"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
        className="relative mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14"
      >
        {/* the stack — six modules on one spine */}
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute bottom-5 left-[9px] top-5 w-px bg-white/8"
          />
          <div className="flex flex-col">
            {SERVICES.map((service, i) => {
              const isActive = i === active;
              return (
                <div key={service.num} className="relative">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    className={`group relative flex w-full items-center gap-5 py-4 pl-8 pr-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60 ${
                      isActive ? "bg-white/[0.02]" : "hover:bg-white/[0.015]"
                    }`}
                  >
                    {/* spine node */}
                    <span
                      className={`absolute left-[3px] top-1/2 h-[13px] w-[13px] -translate-y-1/2 rounded-full border transition-all duration-300 ${
                        isActive
                          ? "border-accent bg-accent/25 shadow-[0_0_14px_rgba(214,165,68,0.45)]"
                          : "border-white/20 bg-ink-950 group-hover:border-white/40"
                      }`}
                    >
                      <span
                        className={`absolute left-1/2 top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-opacity duration-300 ${
                          isActive ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </span>

                    <span
                      className={`font-display text-xs font-semibold tracking-widest transition-colors ${
                        isActive ? "text-accent" : "text-mist-600"
                      }`}
                    >
                      {service.num}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-display text-base font-semibold transition-colors sm:text-lg ${
                          isActive
                            ? "text-mist-100"
                            : "text-mist-300 group-hover:text-mist-100"
                        }`}
                      >
                        {service.title}
                      </span>
                      <span className="mt-0.5 block truncate text-[0.75rem] text-mist-500">
                        {service.nav}
                      </span>
                    </span>

                    <span
                      className={`shrink-0 transition-colors ${
                        isActive
                          ? "text-accent"
                          : "text-mist-600 group-hover:text-mist-400"
                      }`}
                    >
                      <Icon name={service.icon} className="h-5 w-5" />
                    </span>
                  </button>

                  {/* mobile: active module expands inline */}
                  <div className="lg:hidden">
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: reduce ? 0 : 0.45,
                            ease: EASE,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="surface mb-4 ml-8 p-6">
                            <ServiceDetail service={service} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* desktop: the powered detail panel */}
        <div className="hidden lg:block">
          <div className="surface sticky top-28 min-h-[31rem] overflow-hidden p-8 xl:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(214,165,68,0.28), transparent 70%)",
              }}
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={SERVICES[active].num}
                initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
              >
                <ServiceDetail service={SERVICES[active]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
