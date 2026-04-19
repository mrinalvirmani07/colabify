function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function num(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function buildDashboardData({ form, report, analysisMode }) {
  const ctr = num(form.ctr);
  const cpc = num(form.cpc);
  const cpm = num(form.cpm);
  const roas = form.roas === "" ? null : num(form.roas);

  const attentionScore = clamp(75 - (1 - Math.min(ctr, 1.8)) * 40 - Math.max(cpc - 1.6, 0) * 8);
  const interestScore = clamp(70 - Math.max(cpm - 16, 0) * 2.2);
  const desireScore = clamp(68 - (roas !== null ? Math.max(2 - roas, 0) * 14 : 8));
  const actionScore = clamp(72 - (roas !== null ? Math.max(2.2 - roas, 0) * 16 : 10));

  const funnelScores = [
    { layer: "Attention", score: Math.round(attentionScore) },
    { layer: "Interest", score: Math.round(interestScore) },
    { layer: "Desire", score: Math.round(desireScore) },
    { layer: "Action", score: Math.round(actionScore) },
  ];

  const benchmark = [
    { name: "CTR", your: Number(ctr.toFixed(2)), benchmark: 1.2 },
    { name: "CPC", your: Number(cpc.toFixed(2)), benchmark: 1.5 },
    { name: "CPM", your: Number(cpm.toFixed(2)), benchmark: 18 },
    { name: "ROAS", your: roas !== null ? Number(roas.toFixed(2)) : 0, benchmark: 2.2 },
  ];

  const weeklyProjection = [
    { week: "W1", baseline: 100, optimized: 100 },
    { week: "W2", baseline: 92, optimized: 108 },
    { week: "W3", baseline: 86, optimized: 118 },
    { week: "W4", baseline: 82, optimized: 129 },
  ];

  const leakStrength = [
    { leak: "Hook clarity", risk: clamp(100 - attentionScore) },
    { leak: "Message pull", risk: clamp(100 - interestScore) },
    { leak: "Trust build", risk: clamp(100 - desireScore) },
    { leak: "CTA friction", risk: clamp(100 - actionScore) },
  ];

  const insightCount =
    analysisMode === "consumer_intelligence"
      ? (report?.consumer_psychology_insights?.length || 0) + (report?.funnel_leaks?.length || 0)
      : (report?.root_causes?.length || 0) + (report?.fixes?.length || 0);

  const kpis = [
    { label: "Funnel Health", value: `${Math.round((attentionScore + interestScore + desireScore + actionScore) / 4)}%`, tone: "violet" },
    { label: "Critical Leaks", value: `${leakStrength.filter((x) => x.risk > 35).length}`, tone: "rose" },
    { label: "Insight Density", value: `${insightCount}`, tone: "cyan" },
    { label: "Improvement Potential", value: `${Math.round(Math.max(...leakStrength.map((x) => x.risk)))} pts`, tone: "amber" },
  ];

  return {
    kpis,
    funnelScores,
    benchmark,
    weeklyProjection,
    leakStrength,
  };
}

