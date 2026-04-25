"use client";

import { motion } from "framer-motion";
import { MapPinned } from "lucide-react";
import { navLinks } from "@/data/landing";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a className="flex items-center gap-2 font-bold text-slate-900" href="#">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-white">
            <MapPinned className="h-5 w-5" />
          </span>
          Restroom Now
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="transition hover:text-blue-700">
              {link}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-400">
            Log In
          </button>
          <motion.button whileHover={{ y: -1 }} className="rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-700/25 transition hover:bg-blue-600">
            Download App
          </motion.button>
        </div>
      </div>
    </header>
  );
}
