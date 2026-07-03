"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PROFILE } from "@/lib/data";
import { EASE } from "@/lib/motion";

const SERVICE_OPTIONS = [
  "Website / Web Platform",
  "AI & Automation",
  "Branding & Design",
  "Video / Photo / Drone",
  "Infrastructure & Deployment",
  "Digital Consulting",
];

const BUDGETS = ["€1k – €3k", "€3k – €5k", "€5k+", "Under €1k", "Not sure yet"];

/**
 * TODO: form endpoint — set this to your Formspree/EmailJS endpoint
 * (e.g. "https://formspree.io/f/xxxxxxxx") and the form posts to it as-is.
 * While empty, submissions fall back to a direct-email prompt.
 */
const FORM_ENDPOINT = "";

const CHANNELS = [
  {
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    external: false,
    wide: true,
  },
  {
    label: "LinkedIn",
    value: "Halit Statovci",
    href: PROFILE.linkedin,
    external: true,
    wide: false,
  },
  {
    label: "GitHub",
    value: "Halit20",
    href: PROFILE.github,
    external: true,
    wide: false,
  },
  {
    label: "Instagram",
    value: PROFILE.instagramHandle,
    href: PROFILE.instagram,
    external: true,
    wide: false,
  },
  {
    label: "X",
    value: "@HalitSta",
    href: PROFILE.x,
    external: true,
    wide: false,
  },
];

type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);

  // "Book Creative Work" → preselect the media service + focus the form
  useEffect(() => {
    function onBook() {
      setService("Video / Photo / Drone");
      setSent(false);
      requestAnimationFrame(() => {
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    window.addEventListener("creative:book", onBook);
    return () => window.removeEventListener("creative:book", onBook);
  }, []);

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    if (!String(data.get("name") || "").trim()) next.name = "Please add your name.";
    const email = String(data.get("email") || "").trim();
    if (!email) next.email = "Please add your email.";
    else if (!EMAIL_RE.test(email)) next.email = "That email doesn't look right.";
    if (!String(data.get("message") || "").trim())
      next.message = "Tell me a little about the project.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    if (!FORM_ENDPOINT) {
      // endpoint not connected yet — show the direct-email fallback
      setSent(true);
      return;
    }

    setSending(true);
    setSendError(false);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
      setSent(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  function clearError(field: keyof Errors) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const rest = { ...prev };
      delete rest[field];
      return rest;
    });
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <SectionAtmosphere tone="focused" />
      <div className="relative z-[1] shell">
        <div className="divider-line mb-20" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* left intro */}
          <div>
            <SectionHeading
              eyebrow="Start a Project"
              title="Let's build something that actually *moves your business forward.*"
              subtitle="Whether you need a website, system, automation, brand identity, visual content, or a complete digital setup — the goal is to build it properly from the beginning."
            />

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/5">
              {CHANNELS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`group bg-ink-900/60 p-5 transition-colors hover:bg-ink-800 ${
                    c.wide ? "col-span-2" : ""
                  }`}
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.2em] text-mist-500">
                    {c.label}
                  </p>
                  <p className="mt-1.5 text-sm text-mist-200 transition-colors group-hover:text-accent">
                    {c.value}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* form panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="surface relative overflow-hidden p-7 sm:p-9"
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(214,165,68,0.3), transparent 70%)",
              }}
            />

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative flex min-h-[420px] flex-col items-center justify-center text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-mist-100">
                  {FORM_ENDPOINT ? "Message sent" : "Details look good"}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist-400">
                  {FORM_ENDPOINT ? (
                    <>I&apos;ll get back to you shortly. Prefer direct email?</>
                  ) : (
                    <>
                      The form endpoint isn&apos;t connected yet — the fastest
                      way to reach me is a direct email to
                    </>
                  )}{" "}
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    {PROFILE.email}
                  </a>
                  .
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn-ghost mt-6 !py-2.5 text-sm"
                >
                  Edit details
                </button>
              </motion.div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="relative flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Name" htmlFor="name" error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      onChange={() => clearError("name")}
                      aria-invalid={!!errors.name}
                      className={inputCls(!!errors.name)}
                    />
                  </Field>
                  <Field label="Email" htmlFor="email" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      onChange={() => clearError("email")}
                      aria-invalid={!!errors.email}
                      className={inputCls(!!errors.email)}
                    />
                  </Field>
                </div>

                <Field label="Company / Project" htmlFor="company">
                  <input
                    id="company"
                    name="company"
                    placeholder="Company or project name"
                    className={inputCls(false)}
                  />
                </Field>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Service needed" htmlFor="service">
                    <select
                      id="service"
                      name="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className={inputCls(false)}
                    >
                      {SERVICE_OPTIONS.map((o) => (
                        <option key={o} className="bg-ink-900">
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Budget range" htmlFor="budget">
                    <select id="budget" name="budget" className={inputCls(false)}>
                      {BUDGETS.map((o) => (
                        <option key={o} className="bg-ink-900">
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Message" htmlFor="message" error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell me about your idea, goals, and timeline…"
                    onChange={() => clearError("message")}
                    aria-invalid={!!errors.message}
                    className={`${inputCls(!!errors.message)} resize-none`}
                  />
                </Field>

                {sendError && (
                  <p className="text-sm leading-relaxed text-red-400">
                    Sending failed — please try again, or email me directly at{" "}
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="underline underline-offset-2"
                    >
                      {PROFILE.email}
                    </a>
                    .
                  </p>
                )}

                <MagneticButton className="btn-primary mt-1 w-full">
                  {sending ? "Sending…" : "Start a Project"}
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </MagneticButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function inputCls(invalid: boolean) {
  return `w-full rounded-xl border bg-ink-950/60 px-4 py-3 text-sm text-mist-100 outline-none transition-colors placeholder:text-mist-600 focus:ring-1 ${
    invalid
      ? "border-red-500/60 focus:border-red-500/70 focus:ring-red-500/30"
      : "border-white/10 focus:border-accent/50 focus:ring-accent/30"
  }`;
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="flex items-center justify-between text-[0.72rem] uppercase tracking-[0.16em] text-mist-500">
        {label}
        {error && (
          <span className="normal-case tracking-normal text-red-400">
            {error}
          </span>
        )}
      </span>
      <div className="field-wrap">{children}</div>
    </label>
  );
}
