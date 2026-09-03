"use client";

import { useState } from "react";

export interface EconomicEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  titleTh: string;
  category: "Earnings" | "Inflation" | "Interest Rate" | "Employment";
  impact: "High" | "Medium" | "Low";
  forecast: string;
  previous: string;
  ticker?: string;
}

const UPCOMING_EVENTS: EconomicEvent[] = [
  {
    id: "1",
    date: "2026-09-02",
    time: "20:30 น.",
    title: "US Non-Farm Payrolls (NFP)",
    titleTh: "รายงานตัวเลขอัตราการจ้างงานนอกภาคเกษตรสหรัฐฯ",
    category: "Employment",
    impact: "High",
    forecast: "175K",
    previous: "182K",
  },
  {
    id: "2",
    date: "2026-09-05",
    time: "21:00 น.",
    title: "Apple Inc. (AAPL) Q3 Earnings Call",
    titleTh: "รายงานผลประกอบการไตรมาส 3 บริษัท Apple Inc.",
    category: "Earnings",
    impact: "High",
    forecast: "$1.42 EPS",
    previous: "$1.26 EPS",
    ticker: "AAPL",
  },
  {
    id: "3",
    date: "2026-09-10",
    time: "19:30 น.",
    title: "US Consumer Price Index (CPI YoY)",
    titleTh: "ดัชนีราคาผู้บริโภคสะท้อนอัตราเงินเฟ้อสหรัฐฯ",
    category: "Inflation",
    impact: "High",
    forecast: "2.8%",
    previous: "2.9%",
  },
  {
    id: "4",
    date: "2026-09-16",
    time: "01:00 น.",
    title: "FOMC Federal Funds Rate Decision",
    titleTh: "การตัดสินใจอัตราดอกเบี้ยนโยบายธนาคารกลางสหรัฐฯ (FED)",
    category: "Interest Rate",
    impact: "High",
    forecast: "5.25%",
    previous: "5.50%",
  },
  {
    id: "5",
    date: "2026-09-20",
    time: "21:00 น.",
    title: "NVIDIA Corp. (NVDA) Earnings Release",
    titleTh: "รายงานผลประกอบการไตรมาสล่าสุด บริษัท NVIDIA",
    category: "Earnings",
    impact: "High",
    forecast: "$0.68 EPS",
    previous: "$0.61 EPS",
    ticker: "NVDA",
  },
];

export function EconomicCalendar() {
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredEvents = UPCOMING_EVENTS.filter((evt) => {
    if (filterCategory === "all") return true;
    return evt.category === filterCategory;
  });

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-extrabold text-white tracking-wide">
              Economic & Earnings Calendar
            </h3>
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-blue-950 text-blue-400 border border-blue-800/60 uppercase">
              ปฏิทินเศรษฐกิจ & ผลประกอบการ
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            ติดตามเหตุการณ์สำคัญ ผลประกอบการบริษัทจดทะเบียน และดัชนีชี้วัดทางเศรษฐกิจระดับโลก
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 overflow-x-auto">
          {["all", "Earnings", "Inflation", "Interest Rate"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 text-[11px] font-bold rounded-lg whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? "bg-neutral-800 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {cat === "all" ? "ทั้งหมด" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile-Friendly Timeline Card Layout */}
      <div className="space-y-3 pt-1">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 rounded-xl p-4 transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
          >
            <div className="flex items-start gap-3">
              {/* Date Badge */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-center min-w-[68px] flex-shrink-0">
                <span className="text-[10px] text-blue-400 font-mono font-bold block uppercase">
                  {new Date(evt.date).toLocaleDateString("en-US", { month: "short" })}
                </span>
                <span className="text-base font-black text-white font-mono block leading-none my-0.5">
                  {new Date(evt.date).getDate()}
                </span>
                <span className="text-[9px] text-gray-500 block">
                  {evt.time}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-extrabold text-white">
                    {evt.title}
                  </h4>
                  {evt.ticker && (
                    <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-blue-950 text-blue-400 border border-blue-800/60">
                      ${evt.ticker}
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${
                      evt.impact === "High"
                        ? "bg-red-950 text-red-400 border border-red-800/60"
                        : "bg-amber-950 text-amber-400 border border-amber-800/60"
                    }`}
                  >
                    ความสำคัญ: {evt.impact === "High" ? "สูงมาก" : "ปานกลาง"}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {evt.titleTh}
                </p>
              </div>
            </div>

            {/* Metrics Forecast vs Previous */}
            <div className="flex items-center gap-4 text-xs font-mono border-t sm:border-t-0 sm:border-l border-neutral-800 pt-2 sm:pt-0 sm:pl-4 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-start">
              <div>
                <span className="text-[10px] text-gray-500 block">คาดการณ์ (Forecast)</span>
                <span className="font-bold text-emerald-400">{evt.forecast}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 block">ครั้งก่อน (Previous)</span>
                <span className="font-semibold text-gray-300">{evt.previous}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
