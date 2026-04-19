function numberOrNull(value) {
  if (value === "" || value === undefined || value === null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function normalizeAdType(adType) {
  if (!adType) return "image";
  const value = String(adType).toLowerCase();
  if (value.includes("video")) return "video";
  if (value.includes("carousel")) return "carousel";
  return "image";
}

function inferConsumerSignals(input) {
  const ctr = numberOrNull(input.ctr);
  const cpc = numberOrNull(input.cpc);
  const cpm = numberOrNull(input.cpm);
  const roas = numberOrNull(input.roas);
  const adType = normalizeAdType(input.adType);

  return {
    ctr,
    cpc,
    cpm,
    roas,
    adType,
    lowAttention: ctr !== null ? ctr < 1 : false,
    costlyAttention: cpc !== null ? cpc > 1.6 : false,
    weakCreativePull: cpm !== null ? cpm > 18 : false,
    weakConversionOutcome: roas !== null ? roas < 2 : false,
  };
}

function buildHooks(input) {
  const niche = input.industry || "your category";
  return [
    `Why do most ${niche} buyers keep scrolling? Because this core frustration is never named early.`,
    "The real reason your ad feels expensive: the first line explains, but it does not provoke curiosity.",
    "Before you show features, show the hidden cost your audience keeps paying every week.",
    "If they do not feel seen in 2 seconds, they will not trust you in 20.",
    "The best ads do not shout benefits first. They diagnose the buyer’s current pain first.",
  ];
}

function buildCreativeAngles(input) {
  const audience = input.audience || input.targetAudience || "your audience";
  const adType = normalizeAdType(input.adType);
  return [
    `Awareness bridge angle: start from the exact false belief ${audience} currently holds, then reframe with one sharp proof point.`,
    `Before/after inner monologue: show how life feels before and after transformation, using ${adType} scenes anchored in emotional contrast.`,
    "Trust ladder angle: problem statement -> mechanism -> proof -> low-friction CTA, with trust established before asking for action.",
  ];
}

function hasUrgency(copy) {
  const keywords = ["today", "now", "limited", "deadline", "spots", "expires"];
  return keywords.some((k) => copy.includes(k));
}

function hasProof(copy) {
  const keywords = ["review", "result", "case", "customer", "trusted", "proven", "users"];
  return keywords.some((k) => copy.includes(k));
}

function hasClearCta(copy) {
  const keywords = ["book", "apply", "start", "get", "claim", "shop", "download"];
  return keywords.some((k) => copy.includes(k));
}

function consumerIntelligenceEngine(input) {
  const s = inferConsumerSignals(input);
  const copy = (input.adCopy || "").toLowerCase();
  const audience = input.audience || input.targetAudience || "your target audience";
  const industry = input.industry || "this category";

  const attentionAnalysis = [
    s.lowAttention
      ? `CTR at ${s.ctr}% signals weak thumb-stop power: the opening is not interruptive enough to beat passive scrolling behavior.`
      : `CTR at ${s.ctr}% suggests the ad can stop some users, but attention quality may still be shallow if clicks are not converting.`,
    "The hook appears to explain too early instead of creating a curiosity gap, so people can dismiss the message before cognitive engagement starts.",
    `Pain framing for ${audience} is not explicit in the first beat, so users do not self-identify fast enough.`,
  ];

  const interestAnalysis = [
    "Message progression is likely linear and brand-led, not buyer-led; this reduces narrative pull and lowers dwell time.",
    "Curiosity is underdeveloped: the ad gives claims without opening an information loop that compels users to keep watching/reading.",
    "Clarity is acceptable, but salience is low; users understand the words without feeling immediate relevance.",
  ];

  const desireAnalysis = [
    "Emotional intensity is muted; the copy leans informative but does not amplify stakes, identity aspiration, or relief.",
    hasProof(copy)
      ? "Trust signals exist but are not sequenced strongly before the ask; proof should appear earlier to reduce skepticism."
      : "Trust scaffolding is thin: no obvious social proof, concrete outcome, or credibility marker before asking for action.",
    `Transformation is implied, not experienced; users need a clearer before/after state to feel desire, especially in ${industry}.`,
  ];

  const actionAnalysis = [
    hasClearCta(copy)
      ? "CTA exists, but the payoff is still generic; users need a concrete immediate reward for taking the next step."
      : "CTA is weak or ambiguous, so decision friction remains high at the moment of intent.",
    hasUrgency(copy)
      ? "Urgency language is present, but it may feel tactical unless paired with authentic consequence."
      : "No meaningful urgency is visible, so users defer action and tell themselves they can revisit later.",
    "The next step is not framed as low-risk, which increases hesitation among partially convinced prospects.",
  ];

  const consumerPsychologyInsights = [
    "Audience awareness mismatch: message assumes buyers are ready to evaluate solution details, while many are still problem-aware.",
    "The ad asks for commitment before earning belief, creating a trust gap between interest and action.",
    "Cognitive load is too high early on; users need one clear tension before they can process benefits.",
    "Without identity-level resonance ('this is for someone like me'), clicks stay curiosity-driven instead of intent-driven.",
  ];

  const funnelLeaks = [];
  if (s.lowAttention) {
    funnelLeaks.push("Top-of-funnel leak: weak hook prevents attention capture, suppressing quality traffic entering the funnel.");
  }
  if (s.costlyAttention) {
    funnelLeaks.push("Attention-to-interest leak: expensive clicks indicate people click from mild curiosity but fail to find immediate relevance.");
  }
  if (s.weakConversionOutcome) {
    funnelLeaks.push("Desire-to-action leak: users engage but do not commit, typically due to low trust and unclear value exchange.");
  }
  if (!s.lowAttention && !s.costlyAttention && !s.weakConversionOutcome) {
    funnelLeaks.push("Likely mid-funnel leak: messaging is attracting interest but not intensifying emotional conviction before CTA.");
  }

  const fixRecommendations = [
    "Open with a pain-led interruption before introducing your offer, so users instantly recognize themselves in the problem.",
    "Restructure narrative as: pain -> consequence -> mechanism -> proof -> CTA, instead of feature-first messaging.",
    "Insert one credibility anchor (client result, quantified outcome, or testimonial) before any conversion ask.",
    "Make CTA outcome-specific and low-friction, so the next step feels safe and immediately valuable.",
    "Build creative variants for different awareness stages: problem-aware, solution-aware, and most-aware audiences.",
  ];

  return {
    attention_analysis: attentionAnalysis,
    interest_analysis: interestAnalysis,
    desire_analysis: desireAnalysis,
    action_analysis: actionAnalysis,
    consumer_psychology_insights: consumerPsychologyInsights,
    funnel_leaks: funnelLeaks,
    fix_recommendations: fixRecommendations,
    new_hooks: buildHooks(input),
    creative_angles: buildCreativeAngles(input),
  };
}

function platformMetricsEngine(input) {
  // Legacy mode retained for side-by-side comparison with consumer intelligence.
  const s = inferConsumerSignals(input);
  return {
    diagnosis: [
      s.lowAttention
        ? `CTR at ${s.ctr}% indicates the top-of-funnel hook is underperforming.`
        : `CTR at ${s.ctr}% is stable; issue likely exists deeper in the funnel.`,
      s.costlyAttention
        ? `CPC at ${s.cpc} is high versus baseline, signaling weak click intent quality.`
        : `CPC at ${s.cpc} is not the primary bottleneck.`,
      s.weakCreativePull
        ? `CPM at ${s.cpm} suggests ad resonance is not strong enough for efficient distribution.`
        : `CPM at ${s.cpm} is acceptable for current creative format.`,
    ],
    root_causes: [
      "Hook and value proposition are not tightly coupled, reducing message relevance.",
      "The copy communicates benefits but does not create urgency or specificity.",
      "Proof and CTA sequencing is weak, so attention does not convert into action.",
    ],
    creative_analysis: [
      "Hook strength is moderate; opening line lacks sharp contrast or tension.",
      "Emotional driver is mostly logical value, with limited identity or fear-of-loss trigger.",
      "CTA is understandable but not outcome-specific enough to maximize conversion intent.",
    ],
    fixes: [
      "Use a single pain statement in line one, then introduce your mechanism by line two.",
      "Add quantified proof before CTA and make CTA specific to the promised outcome.",
      "Test three hook families: pain, curiosity, and aspiration.",
    ],
    new_hooks: buildHooks(input),
    ad_ideas: buildCreativeAngles(input),
    script_ideas: [],
  };
}

export function analyzeWithMode(input, mode = "consumer_intelligence") {
  if (mode === "platform_metrics") {
    return platformMetricsEngine(input);
  }
  return consumerIntelligenceEngine(input);
}

export { consumerIntelligenceEngine };

