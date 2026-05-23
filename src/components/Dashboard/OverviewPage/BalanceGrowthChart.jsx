import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { money, tooltipStyle } from "./helpers";

const BalanceGrowthChart = ({ balanceGrowth }) => {
  return (
    <div className="mb-6 rounded-3xl border border-base-300 bg-base-200/50 p-5 shadow-2xl backdrop-blur-xl">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-primary">Balance Growth</h2>
          <p className="mt-1 text-sm text-secondary/70">Asset performance over the last 12 months</p>
        </div>
        <div className="rounded-full bg-accent/10 px-4 py-2 text-xs font-bold text-accent">
          1Y
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={balanceGrowth}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.55} />
                <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--color-base-300)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-secondary)", fontSize: 12 }}
            />
            <YAxis hide />
            <Tooltip
              formatter={(value) => [money(value), "Balance"]}
              contentStyle={tooltipStyle}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="var(--color-accent)"
              strokeWidth={4}
              fill="url(#balanceGradient)"
              dot={{ r: 4, strokeWidth: 2, fill: "var(--color-base-100)", stroke: "var(--color-accent)" }}
              activeDot={{ r: 7 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceGrowthChart;
