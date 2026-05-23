import React from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import EmptyCard from "./EmptyCard";
import { chartColors, money, shortMoney, tooltipStyle } from "./helpers";

const SpendingCategoriesChart = ({ spendingCategories, activeMonthName, monthExpense }) => {
  return (
    <div className="rounded-3xl border border-base-300 bg-base-200/50 p-5 shadow-xl backdrop-blur-xl">
      <h2 className="mb-1 text-xl font-bold text-primary">Spending Categories</h2>
      <p className="mb-6 text-sm text-secondary/70">Expense split for {activeMonthName}</p>

      {spendingCategories.length === 0 ? (
        <EmptyCard
          title="No expense data yet"
          message="Add expense transactions to see your category breakdown."
        />
      ) : (
        <div className="grid items-center gap-6 md:grid-cols-[1fr_0.9fr]">
          <div className="relative h-70">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingCategories}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={4}
                >
                  {spendingCategories.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => money(value)}
                  contentStyle={tooltipStyle}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="number-font text-2xl font-black text-primary">
                  {shortMoney(monthExpense)}
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary/60">
                  Total
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {spendingCategories.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-4 rounded-2xl bg-base-300/40 p-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: chartColors[index % chartColors.length] }}
                  />
                  <span className="text-sm font-medium text-primary">{item.name}</span>
                </div>
                <span className="number-font text-sm font-bold text-primary">{item.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpendingCategoriesChart;
