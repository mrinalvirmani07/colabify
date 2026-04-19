import { ArrowRight, BadgeCheck, Flame, Sparkles, TrendingUp } from "lucide-react";
import { Float, MarqueeRow, Reveal, TiltCard } from "@/components/Motion";

const services = [
  {
    title: "Brand Positioning",
    description: "Own a clear POV and a visual language built to scale.",
    icon: BadgeCheck,
  },
  {
    title: "Social Strategy",
    description: "Content pillars, community loops, and channel-first planning.",
    icon: TrendingUp,
  },
  {
    title: "Short-Form Video",
    description: "Hooks, edits, and creator-style storytelling that converts.",
    icon: Flame,
  },
  {
    title: "Campaign Creative",
    description: "Performance assets designed for testing, iteration, and wins.",
    icon: Sparkles,
  },
];

const stats = [
  { k: "3–5x", v: "creative velocity" },
  { k: "12+", v: "hdooks tested weekly" },
  { k: "90d", v: "growth sprints" },
];

const campaignCards = [
  {
    label: "Meta / Paid Social",
    title: "UGC Hook Variations",
    metric: "+38% CTR",
    tone: "from-cyan-500/20 via-slate-950 to-slate-950",
  },
  {
    label: "TikTok / Organic",
    title: "Creator Story Arc",
    metric: "2.1M views",
    tone: "from-violet-500/20 via-slate-950 to-slate-950",
  },
  {
    label: "Instagram / Reels",
    title: "Before → After",
    metric: "+64% saves",
    tone: "from-rose-500/20 via-slate-950 to-slate-950",
  },
];

export default function Home() {

  return (
    <div className="min-h-screen text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/55 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500/80 via-cyan-400/60 to-rose-500/70 shadow-[0_0_0_1px_rgba(255,255,255,0.12)]" />
            <p className="text-base font-semibold tracking-tight">Colabify</p>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#work" className="hover:text-white transition-colors">
              Campaigns
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Get a proposal <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-28 px-6 pb-24 pt-10">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/70 to-slate-950 p-10 md:p-16">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-500/25 blur-3xl" />
            <div className="absolute -bottom-40 left-10 h-[420px] w-[420px] rounded-full bg-cyan-400/15 blur-3xl" />
            <div className="absolute -bottom-60 right-0 h-[520px] w-[520px] rounded-full bg-rose-500/15 blur-3xl" />
          </div>

          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-sm text-violet-200">
              <Sparkles className="h-4 w-4" />
              Social-first branding & campaigns
            </p>
          </Reveal>

          <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div>
              <Reveal delay={0.05}>
                <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
                  AI-powered ad campaigns for brands that want attention.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                  Colabify builds scroll-stopping content systems and ad
                  campaigns designed like products: tested, iterated, and scaled.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
                  >
                    Book a discovery call
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                  >
                    See campaign motion
                  </a>
                </div>
              </Reveal>

              <div className="mt-10 grid grid-cols-3 gap-4">
                {stats.map((s) => (
                  <Reveal key={s.v} delay={0.08} y={12}>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4">
                      <p className="text-2xl font-semibold">{s.k}</p>
                      <p className="mt-1 text-xs text-slate-300">{s.v}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="relative">
              <Float duration={7} amplitude={12} className="relative">
                <TiltCard className="relative rounded-3xl">
                  <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-200">
                        Live Campaign Dashboard
                      </p>
                      <p className="text-[11px] text-slate-400">This week</p>
                    </div>
                    <div className="mt-5 space-y-4">
                      {campaignCards.map((c) => (
                        <div
                          key={c.title}
                          className={`rounded-2xl border border-white/10 bg-gradient-to-br ${c.tone} p-4`}
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-300">
                              {c.label}
                            </p>
                            <p className="text-xs font-semibold text-white">
                              {c.metric}
                            </p>
                          </div>
                          <p className="mt-2 text-sm font-semibold text-slate-100">
                            {c.title}
                          </p>
                          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-violet-400 via-cyan-300 to-rose-300" />
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

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/55">
          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
            <TrendingUp className="h-5 w-5 text-cyan-300" />
            <p className="text-sm font-semibold text-slate-100">
              Always-on motion for always-on marketing
            </p>
            <p className="ml-auto text-xs text-slate-400">
              scroll → watch the transitions
            </p>
          </div>
          <div className="relative py-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950/85 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950/85 to-transparent" />

            <div className="flex flex-col gap-4">
              <MarqueeRow className="flex w-[200%] gap-4 px-6" duration={16}>
                {Array.from({ length: 10 }).map((_, idx) => (
                  <div
                    key={`m1-${idx}`}
                    className="flex w-[240px] items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                  >
                    <p className="text-sm font-semibold">Hook test #{idx + 1}</p>
                    <p className="text-xs text-slate-300">creative</p>
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
                    className="flex w-[260px] items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 px-5 py-4"
                  >
                    <p className="text-sm font-semibold">Ad set #{idx + 1}</p>
                    <p className="text-xs text-slate-300">testing</p>
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
                <p className="text-sm font-semibold text-violet-200">
                  Services built for social
                </p>
                <h2 className="mt-2 text-3xl font-semibold md:text-4xl">
                  Strategy + creative + motion, end-to-end.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-300">
                Everything you need to ship scroll-stopping creative fast, learn
                what works, and scale winners across channels.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={idx * 0.06}>
                  <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/7">
                    <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl transition group-hover:bg-cyan-400/10" />
                    <div className="flex items-start gap-4">
                      <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                        <Icon className="h-5 w-5 text-slate-100" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{s.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {s.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-200">
                      <span>See examples</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="work" className="space-y-8">
          <Reveal>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Campaign scenes (built to move)
            </h2>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/20 via-slate-950 to-slate-950 p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-violet-200">
                  Launch creative system
                </p>
                <h3 className="mt-3 text-2xl font-semibold">
                  12 hooks. 4 angles. 1 week.
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-slate-300">
                  A repeatable system to produce variations fast and keep your
                  ads fresh without losing brand consistency.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {["Hook", "Angle", "CTA"].map((t) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                    >
                      <p className="text-xs text-slate-300">{t}</p>
                      <p className="mt-2 text-sm font-semibold">Variant</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="md:col-span-5" delay={0.08}>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 via-slate-950 to-slate-950 p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">
                  Conversion creative
                </p>
                <h3 className="mt-3 text-2xl font-semibold">
                  Motion that earns attention.
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Fast transitions, strong visual hierarchy, and a brand feel
                  that looks expensive.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    { label: "Thumbstop rate", value: "47%" },
                    { label: "Hold time", value: "1.8s" },
                    { label: "CPA", value: "-22%" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                    >
                      <p className="text-sm text-slate-200">{row.label}</p>
                      <p className="text-sm font-semibold text-white">
                        {row.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-10">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em] text-rose-200">
              Client Spotlight
            </p>
            <blockquote className="mt-4 max-w-4xl text-2xl leading-relaxed text-slate-100 md:text-3xl">
              &quot;In 90 days, Colabify doubled inbound leads — and the new
              creative system made our weekly campaigns feel effortless.&quot;
            </blockquote>
            <p className="mt-4 text-sm text-slate-400">
              - Marketing Director, D2C Wellness Brand
            </p>
          </Reveal>
        </section>

        <section
          id="contact"
          className="relative overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-500/15 via-slate-950 to-slate-950 p-10"
        >
          <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-violet-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-cyan-400/15 blur-3xl" />

          <Reveal>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Want a transition-heavy campaign site like this?
            </h2>
            <p className="mt-3 max-w-2xl text-slate-200">
              Tell us your niche and goal — we&apos;ll map a creative system and
              ship motion-forward pages built for conversion.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <a
                href="mailto:hello@colabify.com"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Email Colabify <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
              >
                Review services
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Colabify. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Built for ads, brands, and attention <Sparkles className="h-4 w-4" />
          </p>
        </div>
      </footer>
    </div>
  );
}
