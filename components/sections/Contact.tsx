"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
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

const BUDGETS = ["< €1k", "€1k – €5k", "€5k – €15k", "€15k+", "Not sure yet"];

const CHANNELS = [
  {
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    note: "",
  },
  {
    label: "WhatsApp",
    value: "Available on request",
    href: "#contact",
    note: "placeholder",
  },
  {
    label: "LinkedIn",
    value: "Halit Statovci",
    href: "#contact",
    note: "placeholder",
  },
  {
    label: "Instagram",
    value: "@dyshja.natyre",
    href: "#contact",
    note: "placeholder",
  },
];

type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [sent, setSent] = useState(false);
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate(e.currentTarget);
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
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
              title="Let's build something that moves your business forward."
              subtitle="Website, system, automation, brand, content, or a full digital setup — tell me what you're trying to do and I'll tell you the smartest way to build it."
            />

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/5">
              {CHANNELS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group bg-ink-900/60 p-5 transition-colors hover:bg-ink-800"
                >
                  <p className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-mist-500">
                    {c.label}
                    {c.note === "placeholder" && (
                      <span className="rounded-full border border-white/10 px-1.5 py-px text-[0.55rem] normal-case tracking-normal text-mist-600">
                        soon
                      </span>
                    )}
                  </p>
                  <p className="mt-1.5 text-sm text-mist-200 transition-colors group-hover:text-accent">
                    {c.value}
                  </p>
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-mist-600">
              Social and messaging links are placeholders until launch — email
              is the fastest way to reach me right now.
            </p>
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
                  "radial-gradient(circle, rgba(56,189,248,0.3), transparent 70%)",
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
                  Looks good — almost there
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist-400">
                  This form is prepared for email/CRM integration. For now, the
                  fastest way to reach me is a direct email to{" "}
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

                <button type="submit" className="btn-primary mt-1 w-full">
                  Start a Project
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
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
      {children}
    </label>
  );
}
