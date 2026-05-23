import React from "react";

const StatCard = ({ title, value, note, icon, danger }) => (
  <div className="rounded-3xl border border-base-300 bg-base-200/55 p-5 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:bg-base-200">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">{title}</p>
        <h3 className="number-font mt-4 text-2xl font-bold text-primary sm:text-3xl">{value}</h3>
        <p className={`mt-2 text-sm font-medium ${danger ? "text-error" : "text-secondary"}`}>{note}</p>
      </div>
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-lg text-accent">
        {icon}
      </div>
    </div>
  </div>
);

export default StatCard;
