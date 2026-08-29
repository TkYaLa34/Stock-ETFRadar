"use client";

import { useState } from "react";
import { getMockSecMdaAnalysis } from "@/services/simulationService";

interface SecMdaAnalysisProps {
  symbol: string;
}

export function SecMdaAnalysis({ symbol }: SecMdaAnalysisProps) {
  const [mda] = useState(() => getMockSecMdaAnalysis(symbol));

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-white">AI SEC MD&A Text & Risk Factor Analysis</h3>
            <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded bg-blue-950 text-blue-400 border border-blue-800/60 uppercase">
              {mda.filingPeriod}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            LLM-extracted Management Discussion & Analysis text analysis and balance sheet debt maturity profile for <strong className="text-white">{mda.entityName}</strong>.
          </p>
        </div>
      </div>

      {/* AI Executive Summary & Liquidity Commentary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-blue-400">🤖 AI Executive Summary</span>
            <span className="text-[10px] text-gray-500 font-mono">10-K Section Item 7</span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-sans">{mda.aiExecutiveSummary}</p>
        </div>

        <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-emerald-400">💧 Liquidity & Capital Resources</span>
            <span className="text-[10px] text-gray-500 font-mono">Cash & Facilities</span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-sans">{mda.liquidityCommentary}</p>
        </div>
      </div>

      {/* Debt Maturity Wall Profile */}
      <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
        <span className="text-xs font-bold text-white block">Debt Maturity Wall ($ Millions)</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
          <div className="p-2.5 bg-neutral-900 rounded border border-neutral-800 space-y-1">
            <span className="text-[10px] text-gray-400 block font-sans">Within 1 Year</span>
            <span className="text-amber-400 font-bold">${mda.debtMaturityWall.within1Year.toLocaleString()}M</span>
          </div>
          <div className="p-2.5 bg-neutral-900 rounded border border-neutral-800 space-y-1">
            <span className="text-[10px] text-gray-400 block font-sans">Years 1 - 3</span>
            <span className="text-blue-400 font-bold">${mda.debtMaturityWall.years1To3.toLocaleString()}M</span>
          </div>
          <div className="p-2.5 bg-neutral-900 rounded border border-neutral-800 space-y-1">
            <span className="text-[10px] text-gray-400 block font-sans">Years 3 - 5</span>
            <span className="text-purple-400 font-bold">${mda.debtMaturityWall.years3To5.toLocaleString()}M</span>
          </div>
          <div className="p-2.5 bg-neutral-900 rounded border border-neutral-800 space-y-1">
            <span className="text-[10px] text-gray-400 block font-sans">After 5 Years</span>
            <span className="text-emerald-400 font-bold">${mda.debtMaturityWall.after5Years.toLocaleString()}M</span>
          </div>
        </div>
      </div>

      {/* Extracted SEC Item 1A Risk Factors */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-white block">Extracted Item 1A Risk Factors</span>
        <div className="space-y-2.5 text-xs">
          {mda.riskFactors.map((risk, idx) => (
            <div key={idx} className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
              <div className="flex justify-between items-center font-mono">
                <span className="font-bold text-gray-200">{risk.category}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    risk.severity === "HIGH"
                      ? "bg-rose-950 text-rose-400 border border-rose-800"
                      : risk.severity === "MEDIUM"
                      ? "bg-amber-950 text-amber-400 border border-amber-800"
                      : "bg-emerald-950 text-emerald-400 border border-emerald-800"
                  }`}
                >
                  SEVERITY: {risk.severity}
                </span>
              </div>
              <p className="text-gray-300 font-sans leading-relaxed">{risk.summary}</p>
              <div className="p-2 bg-neutral-900 rounded border border-neutral-800 text-[11px] text-gray-400 font-mono italic">
                "{risk.quoteSnippet}"
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
