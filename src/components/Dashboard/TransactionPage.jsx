import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FiPlus, FiSearch, FiSliders, FiEdit2, FiTrash2,
  FiChevronLeft, FiChevronRight, FiTrendingUp,
  FiTrendingDown, FiCreditCard, FiAlertTriangle,
} from "react-icons/fi";

import AddTransactionModal from "../../pages/Transactions/AddTransactionModal";

// ─── Config ───────────────────────────────────────────────────────────────────
const API = "http://localhost:3000";
const LIMIT = 10;

const CATEGORIES = [
  "All", "Work", "Housing", "Food", "Transport",
  "Shopping", "Entertainment", "Freelance", "Other",
];

const fmt = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n ?? 0);

const getPageNumbers = (page, totalPages) => {
  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, 4, 5];
  if (page >= totalPages - 2)
    return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  return [page - 2, page - 1, page, page + 1, page + 2];
};

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
const DeleteModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;
  return (
    <div className="modal modal-open z-50">
      <div className="modal-box bg-base-200 border border-base-300 rounded-3xl p-6 shadow-2xl mx-4 max-w-sm w-full">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-error/10 flex items-center justify-center">
            <FiAlertTriangle className="text-error text-2xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary">Delete transaction?</h3>
            <p className="text-secondary text-sm mt-1">This action cannot be undone.</p>
          </div>
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="btn btn-ghost rounded-xl flex-1 border border-base-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="btn btn-error rounded-xl flex-1"
            >
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Summary Card ─────────────────────────────────────────────────────────────
const SummaryCard = ({ icon, label, value, accent }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-200 p-5">
    <div className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${accent}`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-secondary text-xs font-medium uppercase tracking-widest">{label}</p>
      <p className="text-primary number-font text-xl font-bold mt-0.5 truncate">{fmt(value)}</p>
    </div>
  </div>
);

// ─── Category badge ───────────────────────────────────────────────────────────
const catBadge = (cat) => {
  const map = {
    Work: "badge-accent",
    Housing: "badge-warning",
    Food: "badge-success",
    Transport: "badge-info",
    Shopping: "badge-error",
    Entertainment: "badge-secondary",
    Freelance: "badge-accent",
  };
  return map[cat] ?? "badge-ghost";
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const TransactionPage = ({ uid = "demo-uid" }) => {const TransactionPage = () => {
  const { user } = useContext(AuthContext);
  const uid = user?.uid;
  // ── Data ──
  const [transactions, setTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fetching, setFetching] = useState(false);

  // ── Filters ──
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  // ── Modals ──
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ── Use a ref-based refetch counter so we can force re-fetch ──
  // without depending on useCallback deps that cause stale closures
  const [refetchKey, setRefetchKey] = useState(0);
  const pageRef = useRef(page);
  pageRef.current = page;

  const triggerRefetch = () => setRefetchKey((k) => k + 1);

  // ── Fetch paginated list ──
  useEffect(() => {
    let cancelled = false;

    const fetchPage = async () => {
      setFetching(true);
      try {
        const { data } = await axios.get(`${API}/transactions/${uid}`, {
          params: { page: pageRef.current, limit: LIMIT },
        });
        if (cancelled) return;
        setTransactions(data.transactions || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      } catch {
        if (!cancelled) toast.error("Failed to load transactions.");
      } finally {
        if (!cancelled) setFetching(false);
      }
    };

    fetchPage();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, page, refetchKey]);

  // ── Fetch ALL for summary cards ──
  useEffect(() => {
    let cancelled = false;

    const fetchAll = async () => {
      try {
        const { data } = await axios.get(`${API}/transactions/${uid}`, {
          params: { page: 1, limit: 9999 },
        });
        if (!cancelled) setAllTransactions(data.transactions || []);
      } catch {
        // silent
      }
    };

    fetchAll();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, refetchKey]);

  // ── Called after every mutation ──
  const handleSaved = () => {
    triggerRefetch();
  };

  // ── Client-side filter + sort (on current page slice) ──
  const visible = transactions
    .filter((t) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        (t.title || "").toLowerCase().includes(q) ||
        (t.category || "").toLowerCase().includes(q);
      const matchType = typeFilter === "All" || t.type === typeFilter;
      const matchCat = categoryFilter === "All" || t.category === categoryFilter;
      return matchSearch && matchType && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      if (sortBy === "amount-desc") return b.amount - a.amount;
      if (sortBy === "amount-asc") return a.amount - b.amount;
      return 0;
    });

  // ── Summary totals across ALL data ──
  const income = allTransactions
    .filter((t) => t.type === "Income")
    .reduce((s, t) => s + t.amount, 0);
  const expense = allTransactions
    .filter((t) => t.type === "Expense")
    .reduce((s, t) => s + t.amount, 0);

  // ── Delete ──
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await axios.delete(`${API}/transactions/${deleteTarget._id}`);
      toast.success("Transaction deleted.");
      setDeleteTarget(null);
      // If last item on page > 1, go back one page then refetch
      if (transactions.length === 1 && page > 1) {
        setPage((p) => p - 1); // page change already triggers useEffect
      } else {
        triggerRefetch();
      }
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const openAdd = () => { setEditingTx(null); setAddModalOpen(true); };
  const openEdit = (tx) => { setEditingTx(tx); setAddModalOpen(true); };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">Transactions</h1>
            <p className="text-secondary text-sm mt-1">
              Manage and track all your financial activity.
            </p>
          </div>
          <button
            onClick={openAdd}
            className="btn btn-primary rounded-xl gap-2 self-start sm:self-auto shadow-none"
          >
            <FiPlus className="text-base" />
            Add Transaction
          </button>
        </div>

        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <SummaryCard
            icon={<FiTrendingUp className="text-success text-xl" />}
            label="Income"
            value={income}
            accent="bg-success/10"
          />
          <SummaryCard
            icon={<FiTrendingDown className="text-error text-xl" />}
            label="Expenses"
            value={expense}
            accent="bg-error/10"
          />
          <SummaryCard
            icon={<FiCreditCard className="text-accent text-xl" />}
            label="Balance"
            value={income - expense}
            accent="bg-accent/10"
          />
        </div>

        {/* ── Filters ── */}
        <div className="rounded-2xl border border-base-300 bg-base-200 p-4 mb-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-3">

            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-sm" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-base-100 border border-base-300 text-primary placeholder:text-secondary outline-none focus:ring-2 focus:ring-accent transition text-sm"
              />
            </div>

            {/* Type pills */}
            <div className="flex gap-2 shrink-0">
              {["All", "Income", "Expense"].map((t) => (
                <button
                  key={t}
                  onClick={() => { setTypeFilter(t); setPage(1); }}
                  className={`btn btn-sm rounded-lg ${
                    typeFilter === t
                      ? "btn-accent text-white shadow-none"
                      : "btn-ghost border border-base-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 shrink-0">
              <FiSliders className="text-secondary text-sm shrink-0" />
              <select
                value={categoryFilter}
                onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
                className="select select-sm rounded-xl bg-base-100 border border-base-300 text-primary outline-none focus:ring-2 focus:ring-accent text-sm"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-sm rounded-xl bg-base-100 border border-base-300 text-primary outline-none focus:ring-2 focus:ring-accent text-sm shrink-0"
            >
              <option value="date">Sort by Date</option>
              <option value="amount-desc">Amount: High → Low</option>
              <option value="amount-asc">Amount: Low → High</option>
            </select>

          </div>
        </div>

        {/* ── Transaction List ── */}
        <div className="rounded-2xl border border-base-300 bg-base-200 overflow-hidden mb-6">
          {fetching ? (
            <div className="flex items-center justify-center py-20">
              <span className="loading loading-spinner loading-lg text-accent" />
            </div>
          ) : visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-secondary gap-3">
              <FiCreditCard className="text-4xl opacity-30" />
              <p className="text-sm">No transactions found.</p>
              <button onClick={openAdd} className="btn btn-sm btn-outline rounded-xl gap-1">
                <FiPlus /> Add one
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-base-300">
              {visible.map((tx) => (
                <li
                  key={tx._id}
                  className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 hover:bg-base-100/50 transition group"
                >
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-primary font-semibold text-sm truncate">
                      {tx.title || tx.category}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className={`badge badge-sm ${catBadge(tx.category)}`}>
                        {tx.category}
                      </span>
                      <span className={`badge badge-sm badge-outline ${
                        tx.type === "Income"
                          ? "text-success border-success"
                          : "text-error border-error"
                      }`}>
                        {tx.type}
                      </span>
                    </div>
                  </div>

                  {/* Date — hidden on mobile */}
                  <p className="hidden md:block text-secondary text-xs shrink-0 tabular-nums">
                    {new Date(tx.date).toLocaleDateString("en-CA")}
                  </p>

                  {/* Amount */}
                  <p className={`number-font text-sm font-bold shrink-0 ${
                    tx.type === "Income" ? "text-success" : "text-error"
                  }`}>
                    {tx.type === "Income" ? "+" : "-"}{fmt(tx.amount)}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-1 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition">
                    <button
                      onClick={() => openEdit(tx)}
                      className="btn btn-ghost btn-xs btn-circle hover:bg-base-300 text-secondary hover:text-primary"
                      title="Edit"
                    >
                      <FiEdit2 size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(tx)}
                      className="btn btn-ghost btn-xs btn-circle hover:bg-error/10 text-secondary hover:text-error"
                      title="Delete"
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-secondary text-sm">
              Page <span className="text-primary font-medium">{page}</span> of{" "}
              <span className="text-primary font-medium">{totalPages}</span> ·{" "}
              <span className="text-primary font-medium">{total}</span> total
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn btn-ghost btn-sm rounded-xl border border-base-300 disabled:opacity-30"
              >
                <FiChevronLeft />
              </button>

              {getPageNumbers(page, totalPages).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`btn btn-sm rounded-xl w-9 ${
                    p === page
                      ? "btn-accent text-white shadow-none"
                      : "btn-ghost border border-base-300"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="btn btn-ghost btn-sm rounded-xl border border-base-300 disabled:opacity-30"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ── Add / Edit Modal ── */}
      <AddTransactionModal
        isOpen={addModalOpen}
        onClose={() => { setAddModalOpen(false); setEditingTx(null); }}
        onSaved={handleSaved}
        uid={uid}
        editing={editingTx}
      />

      {/* ── Delete Confirm Modal ── */}
      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
};
}

export default TransactionPage;