"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { businessCards } from "@/data/landing";

export function BusinessSection() {
  return (
    <section id="for-businesses" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">For Businesses</p>
        <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Turn Restrooms Into Revenue.</h2>
        <p className="mt-4 max-w-3xl text-slate-600">Monetize unused restroom capacity while increasing local awareness and foot traffic with trusted access tools.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {businessCards.map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="rounded-2xl border border-slate-200 bg-white p-5">
              <Building2 className="h-5 w-5 text-blue-700" />
              <p className="mt-3 font-semibold text-slate-800">{item}</p>
            </motion.div>
          ))}
        </div>
        <button className="mt-8 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 hover:bg-blue-600">
          Become a Verified Partner
        </button>
      </div>
    </section>
  );
}
