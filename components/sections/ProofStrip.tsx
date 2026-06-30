"use client";

import { motion } from "framer-motion";
import { PROOF_POINTS } from "@/lib/data";
import { fadeUp, staggerParent } from "@/lib/motion";

export function ProofStrip() {
  return (
    <section className="relative border-y border-white/6 bg-ink-900/40">
      <div className="shell py-10">
        <motion.div
          variants={staggerParent(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6"
        >
          {PROOF_POINTS.map((p) => (
            <motion.div
              key={p.label}
              variants={fadeUp}
              className="flex flex-col gap-1.5 border-l border-white/8 pl-4"
            >
              <span className="text-[0.82rem] font-medium leading-snug text-mist-200">
                {p.label}
              </span>
              <span className="text-[0.7rem] uppercase tracking-wider text-mist-500">
                {p.sub}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
