import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Reveal } from "@/components/Motion";
import { portfolioItems } from "@/data/portfolio";

export const metadata = {
  title: "Portfolio — Colabify",
  description:
    "Selected campaigns in performance ads, social media marketing, and sales conversion for global and Indian brands.",
};

const accents = [
  "from-violet-500/15 to-fuchsia-500/10 ring-violet-200/60",
  "from-cyan-500/12 to-sky-500/8 ring-cyan-200/50",
  "from-amber-500/15 to-orange-500/10 ring-amber-200/50",
  "from-rose-500/12 to-pink-500/8 ring-rose-200/50",
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen text-slate-900">
      <SiteHeader currentPath="/portfolio" />

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-12">
        <Reveal>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-violet-700 transition hover:text-violet-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-10 max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-800">
              <Sparkles className="h-4 w-4" />
              Our work & clientele
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              Campaigns that move metrics — not just feeds.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              A snapshot of integrated digital, performance advertising, social
              and influencer programs, and brand systems we&apos;ve shaped with
              founders and marketing teams. Built for reach, engagement, and
              sales.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {portfolioItems.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 4) * 0.05}>
              <article
                id={item.slug}
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br p-8 shadow-sm ring-1 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg scroll-mt-28 ${accents[i % accents.length]}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {item.category}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900 md:text-2xl">
                      {item.client}
                    </h2>
                    {item.hashtag ? (
                      <p className="mt-1 font-mono text-sm text-violet-700">
                        {item.hashtag}
                      </p>
                    ) : null}
                  </div>
                  <span className="shrink-0 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                    {item.tag}
                  </span>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.metrics.map((m) => (
                    <li
                      key={m}
                      className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200/80"
                    >
                      {m}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 flex-1 text-sm leading-relaxed text-slate-600">
                  {item.summary}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <section className="mt-20 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-center text-white shadow-xl md:p-14">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Want your brand on this wall next?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-slate-300 md:text-base">
              Tell us your goals — paid social, influencer, or full-funnel
              conversion — and we&apos;ll map a campaign architecture that fits.
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </section>
        </Reveal>
      </main>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Colabify</p>
          <Link href="/" className="font-medium text-violet-700 hover:underline">
            Return home
          </Link>
        </div>
      </footer>
    </div>
  );
}
