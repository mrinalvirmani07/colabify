import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SiteHeader({ currentPath = "/" }) {
  const inactive = "text-sm text-slate-600 transition-colors hover:text-slate-900";
  const active = "text-sm font-semibold text-violet-700";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 shadow-sm ring-1 ring-slate-200/80" />
          <span className="text-base font-semibold tracking-tight text-slate-900">
            Colabify
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#services" className={inactive}>
            Services
          </Link>
          <Link href="/#work" className={inactive}>
            Campaigns
          </Link>
          <Link
            href="/analyzer"
            className={currentPath === "/analyzer" ? active : inactive}
          >
            Analyzer
          </Link>
          <Link
            href="/portfolio"
            className={currentPath === "/portfolio" ? active : inactive}
          >
            Portfolio
          </Link>
          <Link href="/#contact" className={inactive}>
            Contact
          </Link>
        </nav>
        <Link
          href="/#contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
        >
          Get a proposal <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
