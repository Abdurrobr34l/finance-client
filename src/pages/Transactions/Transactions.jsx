import { useContext, useEffect, useState } from "react";
import {
  FiBriefcase, FiCoffee, FiCreditCard, FiFilter, FiHome, FiPlus, FiSearch, FiShoppingCart, FiTrendingDown, FiTrendingUp, FiTruck,
} from "react-icons/fi";
import { Link } from "react-router";
import axios from "axios";
import Container from "../../components/shared/Container";
import { AuthContext } from "../../Context/AuthContext";
import { useMemo } from "react";

const API = "http://localhost:3000";

const CATEGORY_ICONS = {
  Work: <FiBriefcase />,
  Housing: <FiHome />,
  Food: <FiCoffee />,
  Shopping: <FiShoppingCart />,
  Transport: <FiTruck />,
  Other: <FiCreditCard />,
};

const CATEGORIES = ["All", "Work", "Housing", "Food", "Transport", "Shopping", "Other"];

const Transactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("date");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchTransactions = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${API}/transactions/${user.uid}?page=${page}&limit=10`);
        setTransactions(res.data.transactions);
        setTotalPages(res.data.totalPages);

      } catch (err) {
        console.error(err);
        setError("Failed to load transactions. Is your backend running?");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user?.uid, page]);

  // Summaries — always computed from full list
  const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;

  const summary = [
    { label: "Income", value: income, icon: <FiTrendingUp />, color: "text-success", bg: "bg-success/10" },
    { label: "Expenses", value: expense, icon: <FiTrendingDown />, color: "text-error", bg: "bg-error/10" },
    { label: "Balance", value: balance, icon: <FiCreditCard />, color: "text-accent", bg: "bg-accent/10" },
  ];

  // Filter + sort
  const filtered = [...transactions]
    .filter((t) => {
      const matchSearch = (t.note || "").toLowerCase().includes(search.toLowerCase()) ||
        (t.category || "").toLowerCase().includes(search.toLowerCase());
      const matchType = type === "all" || t.type === type;
      const matchCategory = category === "All" || t.category === category;
      return matchSearch && matchType && matchCategory;
    })
    .sort((a, b) =>
      sort === "amount"
        ? b.amount - a.amount
        : new Date(b.date) - new Date(a.date)
    );

  return (
    <section className="min-h-screen bg-base-100 sectionPadding">
      <title>WealthWise | Transactions</title>

      <Container>

        {/* ── Header ── */}
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
              Transactions
            </h1>
            <p className="mt-3 text-base text-secondary">
              Manage and track all your financial activity.
            </p>
          </div>

          <Link
            to="/dashboard/transaction"
            className="btn btn-primary shadow-none transition-colors duration-300 ease-linear hover:bg-transparent hover:text-primary rounded-lg"
          >
            <FiPlus />
            Add Transaction
          </Link>
        </div>

        {/* ── Filters ── */}
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
                  className={`btn join-item flex-1 capitalize lg:flex-none ${type === t ? "btn-accent" : "btn-ghost"}`}
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
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
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

        {/* ── Summary cards ── */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {summary.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-base-200/80 p-10 md:p-14 shadow-xl shadow-black/10 transition hover:scale-[1.02]"
            >
              <div className="flex items-center gap-6">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-2xl ${item.bg} ${item.color}`}>
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

        {/* ── Transaction list ── */}
        <div className="mt-6 space-y-4">

          {/* Not logged in */}
          {!user && (
            <div className="rounded-xl border border-white/10 bg-base-200/80 p-10 text-center">
              <h3 className="text-xl font-bold text-primary">Sign in to see your transactions</h3>
              <Link to="/login" className="btn btn-accent mt-4 rounded-xl">Sign in</Link>
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
                <Link
                  to="/dashboard/transaction"
                  className="btn btn-primary mt-6 rounded-xl"
                >
                  <FiPlus /> Add your first transaction
                </Link>
              )}
            </div>
          )}

          {/* List */}
          {user && !loading && !error && filtered.map((item) => (
            <div
              key={item._id}
              className="rounded-xl border border-white/10 bg-base-200/80 p-4 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 md:p-5"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl
                    ${item.type === "income" ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                    {CATEGORY_ICONS[item.category] || <FiCreditCard />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary">{item.note || item.category}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-secondary">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold
                        ${item.type === "income" ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
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
                  <p className={`number-font text-lg font-bold
                    ${item.type === "income" ? "text-success" : "text-error"}`}>
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
      onClick={() => setPage(p => p - 1)}
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
      onClick={() => setPage(p => p + 1)}
      disabled={page === totalPages}
      className="btn btn-ghost btn-sm rounded-xl"
    >
      Next
    </button>
  </div>
)}
        </div>
      </Container>
    </section>
  );
};

export default Transactions;