"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export interface PricePoint {
  time: string;
  price: number;
}

interface StockChartProps {
  ticker: string;
  data: PricePoint[];
  isPositive?: boolean;
}

export function StockChart({
  ticker,
  data,
  isPositive = true,
}: StockChartProps) {
  const lineColor = isPositive ? "#10b981" : "#f43f5e";

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide">
            {ticker} Price Trend
          </h3>
          <p className="text-xs text-gray-400">
            Historical price action overview
          </p>
        </div>
        <div className="text-right">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              isPositive
                ? "bg-emerald-950 text-emerald-400 border border-emerald-800/50"
                : "bg-rose-950 text-rose-400 border border-rose-800/50"
            }`}
          >
            {isPositive ? "Upward Trend" : "Downward Trend"}
          </span>
        </div>
      </div>

      <div className="h-64 w-full pt-2">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500 text-sm">
            No chart data available for {ticker}.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#262626"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                stroke="#737373"
                tick={{ fontSize: 11 }}
                tickLine={false}
              />
              <YAxis
                stroke="#737373"
                tick={{ fontSize: 11 }}
                tickLine={false}
                domain={["auto", "auto"]}
                tickFormatter={(val) => `$${val.toFixed(0)}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#171717",
                  borderColor: "#404040",
                  borderRadius: "0.5rem",
                  color: "#f5f5f5",
                  fontSize: "12px",
                }}
                formatter={(value: any) => [
                  `$${Number(value || 0).toFixed(2)}`,
                  "Price",
                ]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={lineColor}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: lineColor, stroke: "#171717" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
