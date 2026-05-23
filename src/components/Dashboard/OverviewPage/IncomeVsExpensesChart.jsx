import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { money, tooltipStyle } from "./helpers";

const IncomeVsExpensesChart = ({ incomeVsExpense }) => {
  return (
    <div className="rounded-3xl border border-base-300 bg-base-200/50 p-5 shadow-xl backdrop-blur-xl">
      <h2 className="mb-1 text-xl font-bold text-primary">Income vs Expenses</h2>
      <p className="mb-6 text-sm text-secondary/70">Last 3 months comparison</p>

      <div className="h-75">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={incomeVsExpense}>
            <CartesianGrid stroke="var(--color-base-300)" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-secondary)", fontSize: 12 }}
            />
            <YAxis hide />
            <Tooltip
              formatter={(value) => money(value)}
              contentStyle={tooltipStyle}
            />
            <Bar dataKey="income" fill="var(--color-accent)" radius={[10, 10, 0, 0]} />
            <Bar dataKey="expenses" fill="#7C3AED" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-center gap-6 text-sm">
        <span className="flex items-center gap-2 text-secondary">
          <span className="h-3 w-3 rounded-full bg-accent" />
          Income
        </span>
        <span className="flex items-center gap-2 text-secondary">
          <span className="h-3 w-3 rounded-full bg-error" />
          Expenses
        </span>
      </div>
    </div>
  );
};

export default IncomeVsExpensesChart;
