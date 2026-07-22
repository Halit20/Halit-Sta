"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/data";
import { useActiveSection, useScrolled } from "@/lib/hooks";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE } from "@/lib/motion";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

export function Header() {
  const scrolled = useScrolled(20);
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "border-b border-white/[0.04] bg-ink-950/55 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.8)] backdrop-blur-xl supports-[backdrop-filter]:bg-ink-950/45"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="shell flex h-[72px] items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center"
              aria-label="Halit Sta — home"
            >
              <span className="flex flex-col leading-none">
                <span className="font-display text-[0.95rem] font-semibold tracking-tight text-mist-100">
                  Halit Sta<span className="text-accent">.</span>
                </span>
                <span className="text-[0.62rem] uppercase tracking-[0.25em] text-mist-500">
                  Digital Solutions
                </span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = active === id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative px-2.5 py-2 text-[0.8rem] uppercase tracking-[0.14em] transition-colors duration-300 xl:px-3.5 ${
                      isActive
                        ? "text-mist-100"
                        : "text-mist-300 hover:text-mist-100"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-2.5 right-2.5 h-px bg-gradient-to-r from-transparent via-accent to-transparent xl:left-3.5 xl:right-3.5"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <MagneticButton
                href="#contact"
                className="btn-primary hidden sm:inline-flex !px-5 !py-2.5 text-[0.85rem]"
              >
                Start a Project
              </MagneticButton>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="flex h-10 w-10 items-center justify-center rounded-none border border-white/10 text-mist-200 lg:hidden"
              >
                <div className="relative h-4 w-5">
                  <motion.span
                    className="absolute left-0 top-0 h-[1.5px] w-full bg-current"
                    animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute left-0 top-[7px] h-[1.5px] w-full bg-current"
                    animate={{ opacity: open ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="absolute bottom-0 left-0 h-[1.5px] w-full bg-current"
                    animate={
                      open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink-950/85 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.05 }}
              className="relative mt-[72px] flex flex-col gap-1 px-6 pt-6"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, ease: EASE }}
                  className="flex items-center justify-between border-b border-white/6 py-4 text-2xl font-display text-mist-200"
                >
                  {link.label}
                  <span className="text-xs text-mist-500">0{i + 1}</span>
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-6"
              >
                Start a Project
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
