"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function toneClass(tone) {
  if (tone === "rose") return "from-rose-100 to-white border-rose-200";
  if (tone === "cyan") return "from-cyan-100 to-white border-cyan-200";
  if (tone === "amber") return "from-amber-100 to-white border-amber-200";
  return "from-violet-100 to-white border-violet-200";
}

export function ReportDashboard({ data }) {
  if (!data) return null;

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-violet-700">
            Executive Dashboard
          </p>
          <h3 className="mt-1 text-xl font-semibold text-slate-900">
            Creative Performance Intelligence
          </h3>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
          Live simulation view
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {data.kpis.map((kpi) => (
          <article
            key={kpi.label}
            className={`rounded-2xl border bg-gradient-to-br p-4 ${toneClass(kpi.tone)}`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {kpi.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{kpi.value}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <p className="mb-3 text-sm font-semibold text-slate-800">
            Funnel Layer Scorecard
          </p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data.funnelScores}>
                <PolarAngleAxis dataKey="layer" />
                <Radar
                  dataKey="score"
                  stroke="#4f46e5"
                  fill="#6366f1"
                  fillOpacity={0.35}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <p className="mb-3 text-sm font-semibold text-slate-800">
            Metric vs Benchmark
          </p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.benchmark}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="your" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                <Bar dataKey="benchmark" fill="#94a3b8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <p className="mb-3 text-sm font-semibold text-slate-800">
            4-Week Lift Projection
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.weeklyProjection}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="baseline" stroke="#94a3b8" strokeWidth={2} />
                <Line type="monotone" dataKey="optimized" stroke="#14b8a6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <p className="mb-3 text-sm font-semibold text-slate-800">
            Leak Severity Map
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.leakStrength} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="leak" type="category" width={90} />
                <Tooltip />
                <Bar dataKey="risk" fill="#f43f5e" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>
    </section>
  );
}

