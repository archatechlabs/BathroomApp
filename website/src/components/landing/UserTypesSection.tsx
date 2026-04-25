"use client";

import { motion } from "framer-motion";
import { userTypes } from "@/data/landing";

export function UserTypesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Built for Everyone</p>
        <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Who this platform serves</h2>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {userTypes.map((type, i) => (
          <motion.span key={type} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
            {type}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
