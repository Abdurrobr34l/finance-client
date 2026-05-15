import React, { useMemo, useState } from "react";
import {
  FiBriefcase,
  FiCoffee,
  FiCreditCard,
  FiFilter,
  FiHome,
  FiPlus,
  FiSearch,
  FiShoppingCart,
  FiTrendingDown,
  FiTrendingUp,
} from "react-icons/fi";
import Container from "../../components/shared/Container";
import AddTransactionModal from "./AddTransactionModal";

const transactions = [
  {
    id: 1,
    title: "Monthly Salary",
    category: "Work",
    method: "Bank Transfer",
    date: "2026-01-31",
    amount: 6200,
    type: "income",
    icon: <FiBriefcase />,
  },
  {
    id: 2,
    title: "Rent Payment",
    category: "Housing",
    method: "Bank Transfer",
    date: "2026-01-30",
    amount: 1200,
    type: "expense",
    icon: <FiHome />,
  },
  {
    id: 3,
    title: "Grocery Shopping",
    category: "Food",
    method: "Debit Card",
    date: "2026-01-29",
    amount: 142.5,
    type: "expense",
    icon: <FiShoppingCart />,
  },
  {
    id: 4,
    title: "Freelance Project",
    category: "Work",
    method: "PayPal",
    date: "2026-01-28",
    amount: 850,
    type: "income",
    icon: <FiBriefcase />,
  },
  {
    id: 5,
    title: "Coffee Meeting",
    category: "Food",
    method: "Credit Card",
    date: "2026-01-27",
    amount: 18.75,
    type: "expense",
    icon: <FiCoffee />,
  },
];

const categories = ["All", "Work", "Housing", "Food"];

const Transactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("date");

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((item) => {
        const matchesSearch = item.title
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesType = type === "all" || item.type === type;
        const matchesCategory = category === "All" || item.category === category;

        return matchesSearch && matchesType && matchesCategory;
      })
      .sort((a, b) => {
        if (sort === "amount") return b.amount - a.amount;
        return new Date(b.date) - new Date(a.date);
      });
  }, [search, type, category, sort]);

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  const balance = income - expense;

  const summary = [
    {
      label: "Income",
      value: income,
      icon: <FiTrendingUp />,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Expenses",
      value: expense,
      icon: <FiTrendingDown />,
      color: "text-error",
      bg: "bg-error/10",
    },
    {
      label: "Balance",
      value: balance,
      icon: <FiCreditCard />,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <section className="min-h-screen bg-base-100 py-8 md:py-10 lg:py-12">
      <title>WealthWise | Transactions</title>

      <Container>
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
              Transactions
            </h1>
            <p className="mt-3 text-base text-secondary">
              Manage and track all your financial activity.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary shadow-none transition-colors duration-300 ease-linear hover:bg-transparent hover:text-primary rounded-lg"
          >
            <FiPlus />
            Add Transaction
          </button>
        </div>

        <div className="rounded-xl border border-white/10 bg-base-200/80 p-4 shadow-xl shadow-black/10">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto_auto]">
            <label className="input input-bordered flex w-full items-center gap-3 rounded-2xl bg-base-100">
              <FiSearch className="text-secondary" />
              <input
                type="text"
                className="grow"
                placeholder="Search transactions..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <div className="join w-full lg:w-auto">
              {["all", "income", "expense"].map((item) => (
                <button
                  key={item}
                  onClick={() => setType(item)}
                  className={`btn join-item flex-1 capitalize lg:flex-none ${type === item ? "btn-accent" : "btn-ghost"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <select
                className="select select-bordered w-full rounded-2xl bg-base-100 lg:w-40"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <button className="btn btn-square btn-ghost hidden rounded-2xl sm:flex">
                <FiFilter />
              </button>
            </div>

            <select
              className="select select-bordered w-full rounded-2xl bg-base-100 lg:w-44"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {summary.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-base-200/80 p-10 md:p-14 shadow-xl shadow-black/10 transition hover:scale-[1.02]"
            >
              <div className="flex items-center gap-6">

                {/* Icon */}
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl text-2xl ${item.bg} ${item.color}`}
                >
                  {item.icon}
                </div>

                {/* Text */}
                <div>
                  <p className="text-base text-secondary">
                    {item.label}
                  </p>

                  <h2 className={`number-font text-4xl font-bold ${item.color}`}>
                    ${item.value.toFixed(2)}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {filteredTransactions.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-white/10 bg-base-200/80 p-4 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 md:p-5"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl ${item.type === "income"
                      ? "bg-success/10 text-success"
                      : "bg-accent/10 text-accent"
                      }`}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-primary">
                      {item.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-secondary">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${item.type === "income"
                          ? "bg-success/10 text-success"
                          : "bg-accent/10 text-accent"
                          }`}
                      >
                        {item.category}
                      </span>

                      <span>{item.method}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-5 md:min-w-64 md:justify-end">
                  <p className="number-font text-sm text-secondary">
                    {item.date}
                  </p>

                  <p
                    className={`number-font text-lg font-bold ${item.type === "income" ? "text-success" : "text-error"
                      }`}
                  >
                    {item.type === "income" ? "+" : "-"}$
                    {item.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filteredTransactions.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-base-200/80 p-10 text-center shadow-xl shadow-black/10">
              <h3 className="text-2xl font-bold text-primary">
                No transactions found
              </h3>
              <p className="mt-3 text-secondary">
                Try changing the search, type, or category filter.
              </p>
            </div>
          )}
        </div>
      </Container>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Transactions;