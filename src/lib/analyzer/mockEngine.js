const highCpcByPlatform = {
  Meta: 1.5,
  Google: 2.5,
  TikTok: 1.2,
};

const highCpmByPlatform = {
  Meta: 18,
  Google: 22,
  TikTok: 14,
};

function numberOrNull(value) {
  if (value === "" || value === undefined || value === null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function inferSignals(input) {
  const ctr = numberOrNull(input.ctr);
  const cpc = numberOrNull(input.cpc);
  const cpm = numberOrNull(input.cpm);
  const roas = numberOrNull(input.roas);
  const platform = input.platform || "Meta";

  const cpcThreshold = highCpcByPlatform[platform] ?? 1.5;
  const cpmThreshold = highCpmByPlatform[platform] ?? 18;

  return {
    ctr,
    cpc,
    cpm,
    roas,
    platform,
    lowCtr: ctr !== null ? ctr < 1 : false,
    highCpc: cpc !== null ? cpc > cpcThreshold : false,
    highCpm: cpm !== null ? cpm > cpmThreshold : false,
    weakRoas: roas !== null ? roas < 2 : false,
  };
}

function buildDiagnosis(input, s) {
  const items = [];

  if (s.lowCtr) {
    items.push(
      `CTR is ${s.ctr}% (below 1%), which usually means the hook is not earning attention in the first 1-2 seconds.`
    );
  } else {
    items.push(
      `CTR is ${s.ctr}% which is not a top-of-funnel bottleneck; focus should shift to post-click efficiency.`
    );
  }

  if (s.highCpc) {
    items.push(
      `CPC is elevated at ${s.cpc} for ${s.platform}, indicating relevance mismatch (creative/audience pairing is likely weak).`
    );
  } else {
    items.push(
      `CPC is manageable at ${s.cpc}; your bigger gain likely comes from conversion-stage optimization.`
    );
  }

  if (s.highCpm) {
    items.push(
      `CPM is high (${s.cpm}), suggesting the auction is expensive for your current positioning and creative freshness.`
    );
  }

  if (s.weakRoas) {
    items.push(
      `ROAS at ${s.roas} points to monetization friction after the click (offer clarity, landing alignment, or audience intent quality).`
    );
  }

  return items;
}

function buildRootCauses(input, s) {
  const causes = [];
  const copy = (input.adCopy || "").toLowerCase();

  if (!copy.includes("you") && !copy.includes("your")) {
    causes.push(
      "Ad copy is brand-centered instead of customer-centered; low personal relevance reduces thumb-stop behavior."
    );
  }
  if (!copy.includes("now") && !copy.includes("today") && !copy.includes("limited")) {
    causes.push(
      "The message lacks urgency or timing pressure, so high-intent users have no reason to act immediately."
    );
  }
  if (s.lowCtr) {
    causes.push(
      "The opening line likely explains instead of pattern-interrupting; in feed environments this kills early retention."
    );
  }
  if (s.highCpc) {
    causes.push(
      "Platform delivery is probably learning the wrong audience pockets due to weak creative signals and broad intent cues."
    );
  }
  if (s.highCpm) {
    causes.push(
      "Creative fatigue risk is high; repeating similar angles in a competitive auction inflates CPM before CTR catches up."
    );
  }

  return causes.slice(0, 4);
}

function buildCreativeAnalysis(input) {
  const adType = input.adType || "Image";
  const audience = input.targetAudience || "broad target audience";

  return [
    `Hook strength: moderate. Current copy does not create a sharp curiosity gap for ${audience}.`,
    "Emotional trigger: mostly rational value framing; limited tension, social proof, or loss-aversion language.",
    "Message clarity: understandable, but benefit hierarchy is not crisp (problem -> promise -> proof -> CTA).",
    `CTA quality: present but not forceful enough for ${adType} format; needs a specific next action and payoff.`,
  ];
}

function buildFixes(input, s) {
  const platform = s.platform;
  return [
    `Rebuild the first line for interruption: use a contrarian claim tied to a concrete outcome on ${platform}.`,
    "Launch a 3x3 test matrix (3 hooks x 3 offers) and kill losers inside 48-72 hours based on CTR and CPC.",
    "Tighten audience-message match: one pain point per ad set, not one ad trying to speak to everyone.",
    "Upgrade CTA from generic to outcome-led (e.g., 'Get your audit in 24h' vs 'Learn more').",
    "Add proof density in-frame: numbers, testimonials, or before/after evidence within first fold/seconds.",
  ];
}

function buildHooks(input) {
  const niche = input.industry || "your category";
  return [
    `Most ${niche} ads sound identical. Here is the exact angle we use to lower CAC fast.`,
    "You are not losing sales because of budget. You are losing them in your first 3 seconds.",
    "This one creative tweak cut our acquisition cost before we increased spend.",
    "If your CTR is under 1%, your hook is the bottleneck, not your product.",
    "Steal this performance ad structure before your competitors do.",
  ];
}

function buildAdIdeas(input) {
  const platform = input.platform || "Meta";
  return [
    `Myth vs Reality: challenge a common buying belief, then reveal your differentiated mechanism (optimized for ${platform}).`,
    "Problem Escalation Sequence: show hidden cost of inaction, then present a low-friction first step.",
    "Customer POV Story: mini narrative from skeptical buyer to converted user with proof snapshots.",
  ];
}

function buildScriptIdeas(input) {
  if (input.adType !== "Video") return [];
  return [
    "Script 1: Pattern interrupt -> painful truth -> proof screenshot -> CTA with deadline.",
    "Script 2: 'What changed' founder monologue -> 3 tactical shifts -> invite to apply/demo.",
  ];
}

export function runMockAnalysis(input) {
  const signals = inferSignals(input);

  return {
    diagnosis: buildDiagnosis(input, signals),
    root_causes: buildRootCauses(input, signals),
    creative_analysis: buildCreativeAnalysis(input),
    fixes: buildFixes(input, signals),
    new_hooks: buildHooks(input),
    ad_ideas: buildAdIdeas(input),
    script_ideas: buildScriptIdeas(input),
  };
}

