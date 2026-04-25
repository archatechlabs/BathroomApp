"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Clock3, LockKeyhole, Star } from "lucide-react";
import { iconFeatures } from "@/data/landing";

const icons = { BadgeCheck, LockKeyhole, Clock3, Star };

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {iconFeatures.map((f, index) => {
          const Icon = icons[f.icon as keyof typeof icons];
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <Icon className="h-5 w-5 text-blue-700" />
              <p className="mt-3 text-sm font-semibold text-slate-900">{f.title}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
