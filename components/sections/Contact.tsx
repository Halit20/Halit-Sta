"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { FormSelect } from "@/components/ui/FormSelect";
import { PROFILE } from "@/lib/data";
import { EASE } from "@/lib/motion";
import { scrollToId } from "@/lib/scroll";

const SERVICE_OPTIONS = [
  "Website / Web Platform",
  "AI & Automation",
  "Branding & Design",
  "Video / Photo / Drone",
  "Social Media Management",
  "Infrastructure & Deployment",
  "Digital Consulting",
  "Complete Digital Setup",
  "Not sure / Need guidance",
];

const BUDGETS = ["Under €1k", "€1k – €3k", "€3k – €5k", "€5k+", "Not sure yet"];

/**
 * TODO: form endpoint — set this to your Formspree/EmailJS endpoint
 * (e.g. "https://formspree.io/f/xxxxxxxx") and the form posts to it as-is.
 * While empty, submissions fall back to a direct-email prompt — the UI
 * never claims a request was sent when nothing was.
 */
const FORM_ENDPOINT = "";

const MIN_MESSAGE_LENGTH = 15;
/** submissions faster than this since mount are treated as bot traffic */
const MIN_SUBMIT_MS = 3000;

type Errors = { name?: string; email?: string; service?: string; message?: string };
type SentState = "" | "success" | "fallback";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [sent, setSent] = useState<SentState>("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const mountedAt = useRef(Date.now());

  // CTA preselection from other sections
  useEffect(() => {
    function apply(value: string) {
      if (!SERVICE_OPTIONS.includes(value)) return;
      setService(value);
      setSent("");
      setErrors((prev) => {
        if (!prev.service) return prev;
        const rest = { ...prev };
        delete rest.service;
        return rest;
      });
      requestAnimationFrame(() => scrollToId("contact"));
    }
    // "Book Creative Work" (Media section)
    const onBook = () => apply("Video / Photo / Drone");
    // "Discuss this service" (Services modules)
    const onPreselect = (e: Event) =>
      apply(String((e as CustomEvent).detail ?? ""));
    window.addEventListener("creative:book", onBook);
    window.addEventListener("contact:preselect", onPreselect);
    return () => {
      window.removeEventListener("creative:book", onBook);
      window.removeEventListener("contact:preselect", onPreselect);
    };
  }, []);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    if (!String(data.get("name") || "").trim()) {
      next.name = "Please enter your name.";
    }
    const email = String(data.get("email") || "").trim();
    if (!email || !EMAIL_RE.test(email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!String(data.get("service") || "").trim()) {
      next.service = "Please select a service.";
    }
    if (String(data.get("message") || "").trim().length < MIN_MESSAGE_LENGTH) {
      next.message = "Please tell me a little about your project.";
    }
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return; // double-submit guard
    const form = e.currentTarget;
    const data = new FormData(form);

    // spam guards: hidden honeypot + minimum time-on-page
    if (String(data.get("website") || "")) return;
    if (Date.now() - mountedAt.current < MIN_SUBMIT_MS) return;

    const next = validate(data);
    setErrors(next);
    const firstError = (["name", "email", "service", "message"] as const).find(
      (k) => next[k]
    );
    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }

    if (!FORM_ENDPOINT) {
      // endpoint not connected yet — show the honest direct-email fallback
      setSent("fallback");
      return;
    }

    setSending(true);
    setSendError(false);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
      form.reset();
      setService("");
      setBudget("");
      setSent("success");
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

  function resetForm() {
    setSent("");
    setSendError(false);
    setErrors({});
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
              subtitle="Whether you need a website, system, automation, brand identity, visual content, or a complete digital setup — the goal is to build it properly from the start."
            />

            <p className="mt-10 text-sm leading-relaxed text-mist-500">
              Prefer a direct line? Email me at{" "}
              <a
                href={`mailto:${PROFILE.email}`}
                className="text-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/60"
              >
                {PROFILE.email}
              </a>{" "}
              — or find every channel in the Connect section below.
            </p>
          </div>

          {/* form panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="surface relative p-7 sm:p-9"
          >
            {/* decorative glow clipped inside the card on its own layer,
                so the card itself never clips the open select menus */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
              <div
                className="absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-40 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(214,165,68,0.3), transparent 70%)",
                }}
              />
            </div>

            {sent !== "" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                role="status"
                aria-live="polite"
                className="relative flex min-h-[420px] flex-col items-center justify-center text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                  <svg
                    aria-hidden="true"
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
                  {sent === "success"
                    ? "Thanks — your project request has been sent."
                    : "Details look good"}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist-400">
                  {sent === "success" ? (
                    <>
                      I&apos;ll review the details and reply to your email as
                      soon as possible.
                    </>
                  ) : (
                    <>
                      The form endpoint isn&apos;t connected yet — the fastest
                      way to reach me is a direct email to{" "}
                      <a
                        href={`mailto:${PROFILE.email}`}
                        className="text-accent underline-offset-2 hover:underline"
                      >
                        {PROFILE.email}
                      </a>
                      .
                    </>
                  )}
                </p>
                <button
                  onClick={resetForm}
                  className="btn-ghost mt-6 !py-2.5 text-sm"
                >
                  {sent === "success" ? "Send another request" : "Edit details"}
                </button>
              </motion.div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="relative flex flex-col gap-5"
              >
                {/* honeypot — humans never see or fill this */}
                <div className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Name" htmlFor="name" error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      autoComplete="name"
                      onChange={() => clearError("name")}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={inputCls(!!errors.name)}
                    />
                  </Field>
                  <Field label="Email" htmlFor="email" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      autoComplete="email"
                      onChange={() => clearError("email")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={inputCls(!!errors.email)}
                    />
                  </Field>
                </div>

                <Field label="Company / Project — Optional" htmlFor="companyProject">
                  <input
                    id="companyProject"
                    name="companyProject"
                    placeholder="Company or project name"
                    autoComplete="organization"
                    className={inputCls(false)}
                  />
                </Field>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Service needed"
                    htmlFor="service"
                    error={errors.service}
                  >
                    <FormSelect
                      id="service"
                      name="service"
                      value={service}
                      onChange={(v) => {
                        setService(v);
                        clearError("service");
                      }}
                      options={SERVICE_OPTIONS}
                      placeholder="Select a service"
                      invalid={!!errors.service}
                      describedBy={errors.service ? "service-error" : undefined}
                      className={inputCls(!!errors.service)}
                    />
                  </Field>
                  <Field label="Budget range" htmlFor="budget">
                    <FormSelect
                      id="budget"
                      name="budget"
                      value={budget}
                      onChange={setBudget}
                      options={BUDGETS}
                      placeholder="Select a budget range"
                      className={inputCls(false)}
                    />
                  </Field>
                </div>

                <Field label="Message" htmlFor="message" error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell me about your idea, goals, timeline, and what you need help with..."
                    onChange={() => clearError("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`${inputCls(!!errors.message)} resize-none`}
                  />
                </Field>

                {sendError && (
                  <p role="alert" className="text-sm leading-relaxed text-red-400">
                    Something went wrong while sending your request. Please try
                    again or email me directly at{" "}
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="underline underline-offset-2"
                    >
                      {PROFILE.email}
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  aria-busy={sending}
                  className="btn-primary mt-1 w-full disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                >
                  {sending ? "Sending..." : "Start a Project"}
                  {!sending && (
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  )}
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
  return `w-full rounded-xl border bg-ink-950/60 px-4 py-3 text-base text-mist-100 outline-none transition-colors placeholder:text-mist-600 focus:ring-1 sm:text-sm ${
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
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="flex items-center justify-between text-[0.72rem] uppercase tracking-[0.16em] text-mist-500"
      >
        {label}
        {error && (
          <span
            id={`${htmlFor}-error`}
            className="normal-case tracking-normal text-red-400"
          >
            {error}
          </span>
        )}
      </label>
      <div className="field-wrap">{children}</div>
    </div>
  );
}
