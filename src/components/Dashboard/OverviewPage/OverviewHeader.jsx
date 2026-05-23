import React from "react";
import { FaDownload } from "react-icons/fa";

const OverviewHeader = ({ user, transactions, exportToCSV }) => {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <p className="mb-3 inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-accent">
          Live financial overview
        </p>
        <h1 className="text-3xl font-black text-primary sm:text-4xl">
          Welcome back{user?.displayName ? `, ${user.displayName}` : ""}.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-secondary/75">
          Track your balance, income, expenses, savings rate, spending pattern, and latest transactions from one clean dashboard.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={exportToCSV}
          disabled={transactions.length === 0}
          className="btn border rounded-lg bg-accent text-primary transition-all duration-300 ease-initial hover:bg-transparent hover:border-accent"
        >
          <FaDownload />
          Export to CSV
        </button>
      </div>
    </div>
  );
};

export default OverviewHeader;
