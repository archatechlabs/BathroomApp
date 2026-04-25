"use client";

import { BadgeCheck, CalendarClock, CreditCard, Radar } from "lucide-react";
import { motion } from "framer-motion";
import { whyCards } from "@/data/landing";

const icons = { Radar, BadgeCheck, CreditCard, CalendarClock };

export function WhySection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">WHY RESTROOM NOW?</p>
        <h2 className="mt-3 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">More Than a Map.<br />It’s Peace of Mind.</h2>
        <p className="mt-5 max-w-xl text-slate-600">We combine real-time data, user reviews, verified partners, and secure access tools to give users the best restroom experience—every time.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {whyCards.map((card, i) => {
          const Icon = icons[card.icon as keyof typeof icons];
          return (
            <motion.div key={card.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <Icon className="h-5 w-5 text-blue-700" />
              <h3 className="mt-3 font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
