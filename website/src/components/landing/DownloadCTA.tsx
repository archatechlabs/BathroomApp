"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

export function DownloadCTA() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-sky-100/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Download the App and Get Started Today.</h2>
          <p className="mt-4 text-slate-600">Find clean verified restrooms, unlock premium access, and skip the line in seconds.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">App Store</button>
            <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">Google Play</button>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mx-auto w-full max-w-sm rounded-3xl border border-blue-100 bg-white p-6 shadow-2xl">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700"><BadgeCheck className="h-7 w-7" /></div>
          <h3 className="mt-4 text-xl font-bold text-slate-900">Access Granted!</h3>
          <p className="mt-2 text-sm text-slate-600">Door unlocked. Enjoy your visit. Thanks for rating your experience.</p>
          <button className="mt-6 w-full rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white">Done</button>
        </motion.div>
      </div>
    </section>
  );
}
