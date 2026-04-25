"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { pricing } from "@/data/landing";

export function PricingSection() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Pricing</p>
        <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Flexible plans for users and partners.</h2>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {pricing.map((plan, i) => (
          <motion.div key={plan.tier} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className={`rounded-3xl border p-6 ${plan.featured ? "border-blue-700 bg-blue-700 text-white shadow-2xl" : "border-slate-200 bg-white text-slate-900"}`}>
            <p className={`text-sm font-bold uppercase tracking-wider ${plan.featured ? "text-blue-100" : "text-blue-700"}`}>{plan.tier}</p>
            <p className="mt-3 text-4xl font-black">{plan.price}</p>
            <p className={`mt-2 text-sm ${plan.featured ? "text-blue-100" : "text-slate-500"}`}>{plan.subtitle}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {plan.items.map((item) => (
                <li key={item} className="flex items-start gap-2"><Check className={`mt-0.5 h-4 w-4 ${plan.featured ? "text-white" : "text-blue-700"}`} />{item}</li>
              ))}
            </ul>
            <button className={`mt-8 w-full rounded-xl px-4 py-3 text-sm font-semibold ${plan.featured ? "bg-white text-blue-700" : "bg-slate-900 text-white"}`}>{plan.cta}</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
