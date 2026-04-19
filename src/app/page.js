import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Flame,
  Megaphone,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Float, MarqueeRow, Reveal, TiltCard } from "@/components/Motion";

const services = [
  {
    title: "Performance ads",
    description:
      "Meta, Google, and programmatic — structured testing, creative velocity, and ROAS you can report to the board.",
    icon: Megaphone,
  },
  {
    title: "Social & influencers",
    description:
      "Always-on social, creator programs, and content engineered for shares, saves, and downstream conversion.",
    icon: TrendingUp,
  },
  {
    title: "Conversion creative",
    description:
      "Hooks, landing narratives, and motion-led assets built to shorten the path from impression to purchase.",
    icon: Flame,
  },
  {
    title: "Brand systems for scale",
    description:
      "Guidelines and templates so every ad variant still feels unmistakably you at high volume.",
    icon: BadgeCheck,
  },
];

const stats = [
  { k: "Paid + organic", v: "one growth team" },
  { k: "Creative", v: "built for testing" },
  { k: "North star", v: "pipeline & sales" },
];

const campaignCards = [
  {
    label: "Meta / Paid social",
    title: "Hook & angle matrix",
    metric: "+CTR lift",
    tone: "from-cyan-50 via-white to-slate-50",
  },
  {
    label: "Influencer → ads",
    title: "Creator IP to performance",
    metric: "Lower CPA",
    tone: "from-violet-50 via-white to-slate-50",
  },
  {
    label: "Reels / Shorts",
    title: "Retention-first edits",
    metric: "Hold time ↑",
    tone: "from-rose-50 via-white to-slate-50",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen text-slate-900">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-28 px-6 pb-24 pt-10">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-10 shadow-sm md:p-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-200/40 blur-3xl" />
            <div className="absolute -bottom-40 left-10 h-[420px] w-[420px] rounded-full bg-cyan-200/35 blur-3xl" />
            <div className="absolute -bottom-60 right-0 h-[520px] w-[520px] rounded-full bg-amber-200/30 blur-3xl" />
          </div>

          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-800">
              <Sparkles className="h-4 w-4" />
              Ad campaigns · Social · Sales conversion
            </p>
          </Reveal>

          <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div>
              <Reveal delay={0.05}>
                <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-6xl">
                  We scale brands with ads people actually stop for.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                  Colabify pairs performance media with social and influencer
                  storytelling — so your funnel fills with intent, not just
                  impressions.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Book a discovery call
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400"
                  >
                    See our portfolio
                  </Link>
                </div>
              </Reveal>

              <div className="mt-10 grid grid-cols-3 gap-4">
                {stats.map((s) => (
                  <Reveal key={s.v} delay={0.08} y={12}>
                    <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-sm backdrop-blur">
                      <p className="text-lg font-semibold text-slate-900 md:text-xl">
                        {s.k}
                      </p>
                      <p className="mt-1 text-xs text-slate-600">{s.v}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="relative">
              <Float duration={7} amplitude={10} className="relative">
                <TiltCard className="relative rounded-3xl">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg ring-1 ring-slate-100">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-800">
                        Campaign pulse
                      </p>
                      <p className="text-[11px] text-slate-500">This week</p>
                    </div>
                    <div className="mt-5 space-y-4">
                      {campaignCards.map((c) => (
                        <div
                          key={c.title}
                          className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${c.tone} p-4 ring-1 ring-slate-100`}
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                              {c.label}
                            </p>
                            <p className="text-xs font-semibold text-violet-700">
                              {c.metric}
                            </p>
                          </div>
                          <p className="mt-2 text-sm font-semibold text-slate-900">
                            {c.title}
                          </p>
                          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200/80">
                            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Float>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-4">
            <TrendingUp className="h-5 w-5 text-violet-600" />
            <p className="text-sm font-semibold text-slate-900">
              Motion-forward creative for always-on ads
            </p>
            <p className="ml-auto hidden text-xs text-slate-500 sm:block">
              Scroll the page — watch sections come alive
            </p>
          </div>
          <div className="relative py-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />

            <div className="flex flex-col gap-4">
              <MarqueeRow className="flex w-[200%] gap-4 px-6" duration={16}>
                {Array.from({ length: 10 }).map((_, idx) => (
                  <div
                    key={`m1-${idx}`}
                    className="flex w-60 items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      Creative test #{idx + 1}
                    </p>
                    <p className="text-xs text-slate-500">ads</p>
                  </div>
                ))}
              </MarqueeRow>
              <MarqueeRow
                className="flex w-[200%] gap-4 px-6"
                duration={20}
                reverse
              >
                {Array.from({ length: 10 }).map((_, idx) => (
                  <div
                    key={`m2-${idx}`}
                    className="flex w-[260px] items-center justify-between rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 px-5 py-4 shadow-sm"
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      Ad set #{idx + 1}
                    </p>
                    <p className="text-xs text-slate-500">scale</p>
                  </div>
                ))}
              </MarqueeRow>
            </div>
          </div>
        </section>

        <section id="services" className="space-y-8">
          <Reveal>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold text-violet-700">
                  What we run for clients
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                  From first touch to checkout — one coherent story.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-600">
                Paid social and search, creator and organic social, and
                conversion copy — orchestrated so every click has a job.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={idx * 0.06}>
                  <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-violet-100/80 blur-3xl transition group-hover:bg-cyan-100/60" />
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                        <Icon className="h-5 w-5 text-slate-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {s.description}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/portfolio"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition group-hover:gap-3"
                    >
                      See proof in portfolio
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-violet-50 via-white to-amber-50 p-10 shadow-sm md:p-12">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-semibold text-violet-800">
                  Client work & proof
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                  Costa, STB, ITC, IIMs, and more — real numbers, real brands.
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
                  Integrated campaigns, performance ROAS plays, hospitality and
                  D2C growth — documented on our portfolio page.
                </p>
              </div>
              <Link
                href="/portfolio"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Open portfolio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </section>

        <section id="work" className="space-y-8">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              How we think about campaigns
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Test creative in parallel, learn fast from paid signals, and feed
              winners back into social and influencer — so every rupee or dollar
              works harder.
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-violet-100/80 via-white to-white p-8 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">
                  Launch system
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                  Many hooks. One brand spine.
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600">
                  We ship matrices of angles, offers, and formats so Meta and
                  Google always have fresh creative to optimize — without
                  diluting your story.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {["Hook", "Offer", "CTA"].map((t) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center shadow-sm"
                    >
                      <p className="text-xs text-slate-500">{t}</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        Variant
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="md:col-span-5" delay={0.08}>
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-white p-8 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                  Conversion layer
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                  Ads that respect the funnel.
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Retention edits, benefit-led copy, and landing alignment —
                  tuned until CPL, CPA, and ROAS hit the targets you set.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    { label: "Creative iterations / mo", value: "High" },
                    { label: "Signals we optimize on", value: "Purchase & LTV" },
                    { label: "Reporting", value: "Clear & weekly" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
                    >
                      <p className="text-sm text-slate-700">{row.label}</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {row.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-700">
              Client spotlight
            </p>
            <blockquote className="mt-4 max-w-4xl text-2xl font-medium leading-relaxed text-slate-900 md:text-3xl">
              &quot;The team thinks like performance marketers and creatives at
              once — our cost per qualified lead finally moved in the right
              direction.&quot;
            </blockquote>
            <p className="mt-4 text-sm text-slate-500">
              — Growth lead, D2C brand
            </p>
          </Reveal>
        </section>

        <section
          id="contact"
          className="relative overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-100/90 via-white to-amber-50 p-10 shadow-sm md:p-12"
        >
          <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-violet-200/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-amber-200/40 blur-3xl" />

          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Ready to turn spend into pipeline?
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Share your category, average order value, and current channels —
              we&apos;ll reply with a concrete point of view on ads, social, and
              conversion creative.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href="mailto:hello@colabify.com"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Email Colabify <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400"
              >
                Browse portfolio
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Colabify. All rights reserved.</p>
          <p className="flex items-center gap-2 text-slate-600">
            Built for ads, social & sales{" "}
            <Sparkles className="h-4 w-4 text-violet-600" />
          </p>
        </div>
      </footer>
    </div>
  );
}
