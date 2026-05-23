import React from "react";
import { Link } from "react-router";
import { FiCreditCard, FiPlus } from "react-icons/fi";
import { CATEGORY_ICONS } from "./helpers";

const TransactionsList = ({
  user,
  loading,
  error,
  filtered,
  transactions,
  page,
  setPage,
  totalPages,
}) => {
  return (
    <div className="mt-6 space-y-4">
      {/* Not logged in */}
      {!user && (
        <div className="rounded-xl border border-white/10 bg-base-200/80 p-10 text-center">
          <h3 className="text-xl font-bold text-primary">Sign in to see your transactions</h3>
          <Link to="/login" className="btn btn-accent mt-4 rounded-xl">
            Sign in
          </Link>
        </div>
      )}

      {/* Loading */}
      {user && loading && (
        <div className="flex items-center justify-center py-20 gap-3 text-secondary">
          <span className="loading loading-spinner loading-md text-accent" />
          <span>Loading transactions...</span>
        </div>
      )}

      {/* Error */}
      {user && !loading && error && (
        <div className="rounded-xl border border-error/30 bg-error/10 p-6 text-center text-error">
          {error}
        </div>
      )}

      {/* Empty */}
      {user && !loading && !error && filtered.length === 0 && (
        <div className="rounded-xl border border-white/10 bg-base-200/80 p-10 text-center shadow-xl shadow-black/10">
          <h3 className="text-2xl font-bold text-primary">No transactions found</h3>
          <p className="mt-3 text-secondary">
            {transactions.length === 0
              ? "You have no transactions yet."
              : "Try changing the search, type, or category filter."}
          </p>
          {transactions.length === 0 && (
            <Link to="/dashboard/transaction" className="btn btn-primary mt-6 rounded-xl">
              <FiPlus /> Add your first transaction
            </Link>
          )}
        </div>
      )}

      {/* List */}
      {user &&
        !loading &&
        !error &&
        filtered.map((item) => (
          <div
            key={item._id}
            className="rounded-xl border border-white/10 bg-base-200/80 p-4 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 md:p-5"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl
                    ${
                      item.type === "income"
                        ? "bg-success/10 text-success"
                        : "bg-error/10 text-error"
                    }`}
                >
                  {CATEGORY_ICONS[item.category] || <FiCreditCard />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">{item.note || item.category}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-secondary">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold
                        ${
                          item.type === "income"
                            ? "bg-success/10 text-success"
                            : "bg-error/10 text-error"
                        }`}
                    >
                      {item.category}
                    </span>
                    <span className="capitalize">{item.type}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-5 md:min-w-64 md:justify-end">
                <p className="number-font text-sm text-secondary">
                  {new Date(item.date).toISOString().split("T")[0]}
                </p>
                <p
                  className={`number-font text-lg font-bold
                    ${item.type === "income" ? "text-success" : "text-error"}`}
                >
                  {item.type === "income" ? "+" : "-"}${Number(item.amount).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="btn btn-ghost btn-sm rounded-xl"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm rounded-xl ${page === i + 1 ? "btn-accent" : "btn-ghost"}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="btn btn-ghost btn-sm rounded-xl"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
