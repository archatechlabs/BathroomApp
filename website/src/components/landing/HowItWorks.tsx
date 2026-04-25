"use client";

import { motion } from "framer-motion";
import { howSteps } from "@/data/landing";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">How it Works</p>
        <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Simple access in three steps.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {howSteps.map((step, i) => (
          <motion.div key={step} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">{i + 1}</span>
            <p className="mt-4 text-lg font-semibold text-slate-900">{step}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
