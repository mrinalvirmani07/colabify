"use client";

import { useMemo, useState } from "react";
import { Lock, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { analyzeWithMode } from "@/lib/analyzer/mockEngine";

const initialForm = {
  ctr: "",
  cpc: "",
  cpm: "",
  adType: "Video",
  adCopy: "",
  roas: "",
  targetAudience: "",
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
  const [analysisMode, setAnalysisMode] = useState("consumer_intelligence");
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

  function handleAnalyze(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setIsUnlocked(false);

    if (!form.ctr || !form.cpc || !form.cpm || !form.adType || !form.adCopy) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...form,
        audience: form.targetAudience,
      };
      const data = analyzeWithMode(payload, analysisMode);
      setReport(data);
    } catch {
      setError("Failed to generate analysis.");
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

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Analysis Mode
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setAnalysisMode("platform_metrics")}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  analysisMode === "platform_metrics"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 bg-white text-slate-700"
                }`}
              >
                Platform Metrics Mode
              </button>
              <button
                type="button"
                onClick={() => setAnalysisMode("consumer_intelligence")}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  analysisMode === "consumer_intelligence"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 bg-white text-slate-700"
                }`}
              >
                Consumer Intelligence Mode
              </button>
            </div>
          </div>

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

            <div className="grid gap-4 sm:grid-cols-1">
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
              {analysisMode === "consumer_intelligence" ? (
                <>
                  <Section title="👀 Attention Analysis" icon="">
                    <List items={report.attention_analysis} />
                  </Section>
                  <Section title="🤔 Interest Analysis" icon="">
                    <List items={report.interest_analysis} />
                  </Section>
                  <Section title="❤️ Desire Analysis" icon="">
                    <List items={report.desire_analysis} />
                  </Section>
                  <Section title="🎯 Action Analysis" icon="">
                    <List items={report.action_analysis} />
                  </Section>
                  <Section title="🧠 Consumer Insights" icon="">
                    <List items={report.consumer_psychology_insights} />
                  </Section>
                  <Section title="🚨 Funnel Leaks" icon="">
                    <List items={report.funnel_leaks} />
                  </Section>
                  <Section title="🚀 Fix Recommendations" icon="">
                    <List items={report.fix_recommendations?.slice(0, 2)} />
                  </Section>
                  <Section title="💡 New Hooks" icon="">
                    <LockedBlock
                      title="New hooks"
                      items={report.new_hooks}
                      unlocked={isUnlocked}
                    />
                  </Section>
                  <Section title="🎨 Creative Angles" icon="">
                    <LockedBlock
                      title="Creative angles"
                      items={report.creative_angles}
                      unlocked={isUnlocked}
                    />
                  </Section>
                </>
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
                      title="Ad ideas"
                      items={report.ad_ideas}
                      unlocked={isUnlocked}
                    />
                  </Section>
                </>
              )}

              {!isUnlocked ? (
                <section className="rounded-2xl border border-violet-200 bg-violet-50 p-6">
                  <h4 className="text-base font-semibold text-slate-900">
                    Unlock high-converting ad ideas
                  </h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Share details to unlock hooks and creative angles.
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

