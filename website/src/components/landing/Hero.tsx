"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-sky-50/50">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
            <BadgeCheck className="h-4 w-4" /> Clean. Verified. Guaranteed Access.
          </div>
          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Find. Access. Relax.<br />
            <span className="text-blue-700">Restrooms</span> Anywhere.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Real-time access to clean, verified restrooms near you. Pay, unlock,
            reserve, and skip the line with confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <motion.button whileHover={{ y: -1 }} className="rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/25 hover:bg-blue-600">
              Find a Restroom
            </motion.button>
            <button className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:border-slate-400">
              For Businesses
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-blue-100 via-white to-slate-100 blur-3xl" />
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
