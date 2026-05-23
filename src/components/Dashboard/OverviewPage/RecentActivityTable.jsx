import React from "react";
import EmptyCard from "./EmptyCard";
import { categoryIcon, formatDate, getType, money } from "./helpers";

const RecentActivityTable = ({ recentTransactions, lastUpdated }) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-200/50 shadow-xl backdrop-blur-xl">
      <div className="flex flex-col justify-between gap-3 border-b border-base-300 p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-primary">Recent Activity</h2>
          <p className="mt-1 text-sm text-secondary/70">
            {lastUpdated ? `Last updated ${lastUpdated.toLocaleTimeString()}` : "Waiting for live data"}
          </p>
        </div>
        <a href="/transactions" className="text-sm font-bold text-accent hover:text-accent/70">
          View All Transactions
        </a>
      </div>

      {recentTransactions.length === 0 ? (
        <EmptyCard
          title="No transactions found"
          message="Once you add income or expense records, they will appear here automatically."
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-base-300/40 text-secondary/70">
              <tr>
                <th className="px-5 py-4 text-xs uppercase tracking-[0.18em]">Transaction</th>
                <th className="px-5 py-4 text-xs uppercase tracking-[0.18em]">Category</th>
                <th className="px-5 py-4 text-xs uppercase tracking-[0.18em]">Date</th>
                <th className="px-5 py-4 text-right text-xs uppercase tracking-[0.18em]">Amount</th>
              </tr>
            </thead>

            <tbody>
              {recentTransactions.map((item) => {
                const isIncome = getType(item.type) === "income";
                return (
                  <tr key={item._id} className="border-base-300/30 hover:bg-base-300/20">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`grid h-11 w-11 place-items-center rounded-2xl ${
                            isIncome
                              ? "bg-success/10 text-success"
                              : "bg-base-300/40 text-secondary"
                          }`}
                        >
                          {categoryIcon(item.category)}
                        </div>
                        <div>
                          <p className="font-bold text-primary">{item.note || item.category}</p>
                          <p className="text-xs capitalize text-secondary/60">{item.type}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-base-300/40 px-3 py-1 text-xs font-semibold text-secondary">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-secondary/80">{formatDate(item.date)}</td>

                    <td
                      className={`number-font px-5 py-4 text-right font-black ${
                        isIncome ? "text-success" : "text-error"
                      }`}
                    >
                      {isIncome ? "+" : "-"}
                      {money(item.amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentActivityTable;
