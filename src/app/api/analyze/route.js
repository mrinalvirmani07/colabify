import { NextResponse } from "next/server";
import { runMockAnalysis } from "@/lib/analyzer/mockEngine";

function validate(body) {
  const required = ["ctr", "cpc", "cpm", "adType", "adCopy"];
  const missing = required.filter((k) => body[k] === undefined || body[k] === "");

  if (missing.length) {
    return { ok: false, message: `Missing required fields: ${missing.join(", ")}` };
  }

  const numericFields = ["ctr", "cpc", "cpm", "roas"];
  for (const field of numericFields) {
    if (body[field] === undefined || body[field] === "") continue;
    if (!Number.isFinite(Number(body[field]))) {
      return { ok: false, message: `${field} must be a valid number` };
    }
  }

  return { ok: true };
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const validation = validate(payload);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.message }, { status: 400 });
    }

    // Phase 1: deterministic mock engine.
    // Phase 2: swap this with LLM call + strict JSON schema parsing.
    const report = runMockAnalysis(payload);

    return NextResponse.json({ report });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong while generating analysis." },
      { status: 500 }
    );
  }
}

