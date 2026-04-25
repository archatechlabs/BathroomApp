"use client";

import { motion } from "framer-motion";
import { trustMetrics } from "@/data/landing";

export function TrustMetrics() {
  return (
    <section className="bg-slate-950 py-7 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900 to-blue-950 p-4 md:grid-cols-5 md:items-center">
          {trustMetrics.map((metric, i) => (
            <motion.div key={metric.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center md:text-left">
              <p className="text-2xl font-black text-blue-300">{metric.value}</p>
              <p className="text-sm text-slate-200">{metric.label}</p>
            </motion.div>
          ))}
          <p className="text-sm text-slate-200 md:pl-4">Trusted by individuals and businesses worldwide.</p>
        </div>
      </div>
    </section>
  );
}
