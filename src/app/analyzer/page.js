"use client";

import { useMemo, useState } from "react";
import { Lock, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

const initialForm = {
  ctr: "",
  cpc: "",
  cpm: "",
  adType: "Video",
  adCopy: "",
  roas: "",
  targetAudience: "",
  platform: "Meta",
  industry: "",
};

function Section({ title, icon, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
        <span>{icon}</span>
        <span>{title}</span>
      </h3>
      {children}
    </section>
  );
}

function List({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">
          {item}
        </li>
      ))}
    </ul>
  );
}

function LockedBlock({ title, items, unlocked }) {
  if (unlocked) {
    return <List items={items} />;
  }

  return (
    <div className="relative">
      <div className="pointer-events-none blur-[2px]">
        <List items={items} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/70">
        <div className="max-w-sm rounded-xl border border-slate-200 bg-white p-4 text-center shadow-md">
          <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Lock className="h-4 w-4" />
            Locked Insights
          </p>
          <p className="text-sm text-slate-600">
            Unlock full report + high-converting ad ideas
          </p>
          <p className="mt-2 text-xs text-slate-500">{title}</p>
        </div>
      </div>
    </div>
  );
}

export default function AnalyzerPage() {
  const [form, setForm] = useState(initialForm);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lead, setLead] = useState({ name: "", email: "", company: "" });
  const [isUnlocked, setIsUnlocked] = useState(false);

  const signalFlags = useMemo(() => {
    const ctr = Number(form.ctr);
    const cpc = Number(form.cpc);
    const cpm = Number(form.cpm);
    const cpcHigh = Number.isFinite(cpc) && cpc > 1.5;
    const cpmHigh = Number.isFinite(cpm) && cpm > 18;
    const ctrLow = Number.isFinite(ctr) && ctr < 1;
    return { cpcHigh, cpmHigh, ctrLow };
  }, [form.ctr, form.cpc, form.cpm]);

  async function handleAnalyze(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setIsUnlocked(false);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to analyze");
      }
      setReport(data.report);
    } catch (err) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  function handleLeadSubmit(e) {
    e.preventDefault();
    if (!lead.name || !lead.email || !lead.company) return;
    setIsUnlocked(true);
  }

  return (
    <div className="min-h-screen text-slate-900">
      <SiteHeader currentPath="/analyzer" />

      <main className="mx-auto grid w-full max-w-6xl gap-8 px-6 pb-20 pt-10 lg:grid-cols-[1fr_1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
            <Sparkles className="h-3.5 w-3.5" />
            Colabify AI Tool (MVP)
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            AI Ad Performance Analyzer
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Diagnose underperforming ads with structured reasoning and actionable
            improvement ideas.
          </p>

          <form onSubmit={handleAnalyze} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="text-sm">
                CTR % *
                <input
                  type="number"
                  step="0.01"
                  value={form.ctr}
                  onChange={(e) => setForm((p) => ({ ...p, ctr: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                  required
                />
              </label>
              <label className="text-sm">
                CPC *
                <input
                  type="number"
                  step="0.01"
                  value={form.cpc}
                  onChange={(e) => setForm((p) => ({ ...p, cpc: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                  required
                />
              </label>
              <label className="text-sm">
                CPM *
                <input
                  type="number"
                  step="0.01"
                  value={form.cpm}
                  onChange={(e) => setForm((p) => ({ ...p, cpm: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                  required
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                Ad Type *
                <select
                  value={form.adType}
                  onChange={(e) => setForm((p) => ({ ...p, adType: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                  required
                >
                  <option>Video</option>
                  <option>Image</option>
                  <option>Carousel</option>
                </select>
              </label>
              <label className="text-sm">
                Platform
                <select
                  value={form.platform}
                  onChange={(e) => setForm((p) => ({ ...p, platform: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                >
                  <option>Meta</option>
                  <option>Google</option>
                  <option>TikTok</option>
                </select>
              </label>
            </div>

            <label className="block text-sm">
              Ad Copy *
              <textarea
                value={form.adCopy}
                onChange={(e) => setForm((p) => ({ ...p, adCopy: e.target.value }))}
                rows={5}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                required
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="text-sm">
                ROAS
                <input
                  type="number"
                  step="0.01"
                  value={form.roas}
                  onChange={(e) => setForm((p) => ({ ...p, roas: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="text-sm">
                Target Audience
                <input
                  type="text"
                  value={form.targetAudience}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, targetAudience: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                />
              </label>
              <label className="text-sm">
                Industry / Niche
                <input
                  type="text"
                  value={form.industry}
                  onChange={(e) => setForm((p) => ({ ...p, industry: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2"
                />
              </label>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
              Rule-based flags:{" "}
              {signalFlags.ctrLow ? "Low CTR (<1%) · " : ""}
              {signalFlags.cpcHigh ? "High CPC · " : ""}
              {signalFlags.cpmHigh ? "High CPM" : ""}
              {!signalFlags.ctrLow && !signalFlags.cpcHigh && !signalFlags.cpmHigh
                ? "No major threshold alerts from base rules."
                : ""}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Run Analysis"}
            </button>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </form>
        </section>

        <section className="space-y-4">
          {!report ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500">
              Submit campaign inputs to generate your report.
            </div>
          ) : (
            <>
              <Section title="🔍 What’s Going Wrong" icon="">
                <List items={report.diagnosis} />
              </Section>

              <Section title="🧠 Why It’s Happening" icon="">
                <List items={report.root_causes} />
              </Section>

              <Section title="🎯 Creative Breakdown" icon="">
                <List items={report.creative_analysis} />
              </Section>

              <Section title="🚀 How to Fix It" icon="">
                <List items={report.fixes?.slice(0, 2)} />
              </Section>

              <Section title="💡 New Ad Hooks" icon="">
                <LockedBlock
                  title="New hooks"
                  items={report.new_hooks}
                  unlocked={isUnlocked}
                />
              </Section>

              <Section title="🎥 New Ad Concepts" icon="">
                <LockedBlock
                  title="Ad and script ideas"
                  items={[...(report.ad_ideas || []), ...(report.script_ideas || [])]}
                  unlocked={isUnlocked}
                />
              </Section>

              {!isUnlocked ? (
                <section className="rounded-2xl border border-violet-200 bg-violet-50 p-6">
                  <h4 className="text-base font-semibold text-slate-900">
                    Unlock full report + high-converting ad ideas
                  </h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Share details to unlock hooks, concepts, and script angles.
                  </p>
                  <form onSubmit={handleLeadSubmit} className="mt-4 grid gap-3 sm:grid-cols-3">
                    <input
                      placeholder="Name"
                      value={lead.name}
                      onChange={(e) => setLead((p) => ({ ...p, name: e.target.value }))}
                      className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={lead.email}
                      onChange={(e) => setLead((p) => ({ ...p, email: e.target.value }))}
                      className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                      required
                    />
                    <input
                      placeholder="Company"
                      value={lead.company}
                      onChange={(e) => setLead((p) => ({ ...p, company: e.target.value }))}
                      className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                      required
                    />
                    <button
                      type="submit"
                      className="sm:col-span-3 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      Unlock Now
                    </button>
                  </form>
                </section>
              ) : null}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

