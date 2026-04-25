"use client";

import { MapPin, Lock, BadgeCheck, CreditCard, Toilet } from "lucide-react";
import { motion } from "framer-motion";

export function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto w-[280px] rounded-[2.4rem] border-[10px] border-slate-900 bg-white p-3 shadow-[0_30px_80px_rgba(2,6,23,.25)]"
    >
      <div className="mb-2 h-5 w-20 rounded-full bg-slate-900/90 mx-auto" />
      <div className="overflow-hidden rounded-[1.7rem] border border-slate-100">
        <div className="bg-white px-3 py-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Restroom Now</span>
            <MapPin className="h-3.5 w-3.5" />
          </div>
          <div className="mt-2 rounded-xl bg-slate-100 px-2 py-1 text-[11px] text-slate-500">Search location</div>
        </div>
        <div className="relative h-48 bg-gradient-to-br from-sky-100 via-emerald-50 to-blue-100">
          {["left-5 top-8 bg-emerald-600", "left-16 top-16 bg-blue-700", "left-28 top-10 bg-yellow-500", "left-44 top-20 bg-emerald-600", "left-52 top-8 bg-blue-700"].map((p) => (
            <span key={p} className={`absolute ${p} inline-flex h-7 w-7 items-center justify-center rounded-full text-white shadow`}>
              <Toilet className="h-3.5 w-3.5" />
            </span>
          ))}
          <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-blue-900 px-2 py-1 text-[10px] font-semibold text-white">
            <BadgeCheck className="h-3 w-3" /> 17 Available Nearby
          </div>
          <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white p-2 shadow-lg">
            <div className="text-[11px] font-semibold text-slate-800">Premium Restroom · 3 min</div>
            <div className="mt-1 flex items-center justify-between rounded-xl bg-slate-900 px-2 py-1.5 text-[10px] text-white">
              <span className="inline-flex items-center gap-1"><CreditCard className="h-3 w-3" /> $2.00</span>
              <span className="inline-flex items-center gap-1 rounded bg-blue-500 px-2 py-1 font-semibold">Pay & Unlock <Lock className="h-3 w-3" /></span>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="absolute -right-14 bottom-14 max-w-[170px] rounded-2xl bg-white/95 p-3 text-sm font-semibold text-slate-800 shadow-2xl"
      >
        Skip the Line.<br />Save Time.<br />Feel Confident.
      </motion.div>
    </motion.div>
  );
}
