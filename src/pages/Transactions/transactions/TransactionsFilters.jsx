import React from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import { CATEGORIES } from "./helpers";

const TransactionsFilters = ({
  search,
  setSearch,
  type,
  setType,
  category,
  setCategory,
  sort,
  setSort,
}) => {
  return (
    <div className="rounded-xl border border-white/10 bg-base-200/80 p-4 shadow-xl shadow-black/10">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto_auto]">
        <label className="input input-bordered flex w-full items-center gap-3 rounded-2xl bg-base-100">
          <FiSearch className="text-secondary" />
          <input
            type="text"
            className="grow"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <div className="join w-full lg:w-auto">
          {["all", "income", "expense"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`btn join-item flex-1 capitalize lg:flex-none ${
                type === t ? "btn-accent" : "btn-ghost"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <select
            className="select select-bordered w-full rounded-2xl bg-base-100 lg:w-40"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <button className="btn btn-square btn-ghost hidden rounded-2xl sm:flex">
            <FiFilter />
          </button>
        </div>

        <select
          className="select select-bordered w-full rounded-2xl bg-base-100 lg:w-44"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>
    </div>
  );
};

export default TransactionsFilters;
