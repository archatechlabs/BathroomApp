import { MapPinned } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-white"><MapPinned className="h-5 w-5" /></span>
            Restroom Now
          </div>
          <p className="mt-4 text-sm text-slate-600">A verified real-time restroom access network for users and businesses.</p>
        </div>
        {[
          { title: "Product", links: ["How It Works", "Features", "Pricing"] },
          { title: "Business", links: ["Partners", "For Businesses", "Integrations"] },
          { title: "Legal", links: ["Terms", "Privacy", "Security"] },
        ].map((group) => (
          <div key={group.title}>
            <h4 className="font-semibold text-slate-900">{group.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {group.links.map((link) => <li key={link}><a href="#" className="hover:text-blue-700">{link}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100 py-5 text-center text-sm text-slate-500">© {new Date().getFullYear()} Restroom Now. All rights reserved.</div>
    </footer>
  );
}
