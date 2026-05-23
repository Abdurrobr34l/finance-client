import React from "react";

const TransactionsSummary = ({ summary }) => {
  return (
    <div className="mt-6 grid gap-5 md:grid-cols-3">
      {summary.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-white/10 bg-base-200/80 p-10 md:p-14 shadow-xl shadow-black/10 transition hover:scale-[1.02]"
        >
          <div className="flex items-center gap-6">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl text-2xl ${item.bg} ${item.color}`}
            >
              {item.icon}
            </div>
            <div>
              <p className="text-base text-secondary">{item.label}</p>
              <h2 className={`number-font text-4xl font-bold ${item.color}`}>
                ${item.value.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionsSummary;
