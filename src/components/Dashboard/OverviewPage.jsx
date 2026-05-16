import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FaBriefcase,
  FaCar,
  FaDownload,
  FaEllipsisH,
  FaHome,
  FaMoneyBillWave,
  FaPiggyBank,
  FaReceipt,
  FaShoppingBag,
  FaUtensils,
  FaWallet,
} from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Chart colors using your theme's accent/secondary palette
const chartColors = [
  "var(--color-accent)",       // #818cf8 (dark) / #4f46e5 (light)
  "#7c3aed",
  "#06b6d4",
  "#f59e0b",
  "#22c55e",
  "#ef4444",
  "var(--color-secondary)",    // #a5b4fc (dark) / #64748b (light)
];

// Tooltip shared style using theme variables
const tooltipStyle = {
  background: "var(--color-base-200)",
  border: "1px solid var(--color-neutral, var(--color-base-300))",
  borderRadius: "18px",
  color: "var(--color-primary)",
};

const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const shortMoney = (value) => {
  const amount = Number(value || 0);
  if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}k`;
  return `$${amount.toFixed(0)}`;
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const monthKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth()}`;
};

const monthLabel = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
  });

const getLastMonths = (anchorDate, count) =>
  Array.from({ length: count }, (_, index) => {
    const date = new Date(anchorDate);
    date.setDate(1);
    date.setMonth(date.getMonth() - count + 1 + index);
    return date;
  });

const getType = (type) => String(type || "").toLowerCase();

const getAmount = (transaction) => Number(transaction?.amount || 0);

const categoryIcon = (category = "") => {
  const value = category.toLowerCase();
  if (value.includes("income") || value.includes("salary") || value.includes("payroll")) return <FaBriefcase />;
  if (value.includes("food") || value.includes("dining") || value.includes("restaurant")) return <FaUtensils />;
  if (value.includes("rent") || value.includes("house") || value.includes("home")) return <FaHome />;
  if (value.includes("car") || value.includes("transport")) return <FaCar />;
  if (value.includes("shop") || value.includes("grocery")) return <FaShoppingBag />;
  return <FaEllipsisH />;
};

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

const EmptyCard = ({ title, message }) => (
  <div className="flex min-h-70 flex-col items-center justify-center rounded-3xl border border-base-300 bg-base-200/45 p-6 text-center">
    <FaReceipt className="mb-4 text-3xl text-secondary/70" />
    <h3 className="text-lg font-bold text-primary">{title}</h3>
    <p className="mt-2 max-w-sm text-sm text-secondary/70">{message}</p>
  </div>
);

const OverviewPage = () => {
  const { user } = useContext(AuthContext) || {};
  const uid = user?.uid;

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState("");

  const fetchTransactions = useCallback(async () => {
    if (!uid) {
      setLoading(false);
      return;
    }
    try {
      setError("");
      const { data } = await axios.get(`${API_URL}/transactions/${uid}`, {
        params: { page: 1, limit: 1000 },
      });
      setTransactions(data?.transactions || []);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load overview data.");
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 7000);
    window.addEventListener("focus", fetchTransactions);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", fetchTransactions);
    };
  }, [fetchTransactions]);

  const dashboard = useMemo(() => {
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    const anchorDate = sortedTransactions[0]?.date
      ? new Date(sortedTransactions[0].date)
      : new Date();

    const activeMonthKey = monthKey(anchorDate);
    const currentMonthTransactions = transactions.filter(
      (item) => monthKey(item.date) === activeMonthKey
    );

    const totalIncome = transactions
      .filter((item) => getType(item.type) === "income")
      .reduce((sum, item) => sum + getAmount(item), 0);

    const totalExpense = transactions
      .filter((item) => getType(item.type) === "expense")
      .reduce((sum, item) => sum + getAmount(item), 0);

    const monthIncome = currentMonthTransactions
      .filter((item) => getType(item.type) === "income")
      .reduce((sum, item) => sum + getAmount(item), 0);

    const monthExpense = currentMonthTransactions
      .filter((item) => getType(item.type) === "expense")
      .reduce((sum, item) => sum + getAmount(item), 0);

    const balance = totalIncome - totalExpense;
    const savingsRate = monthIncome > 0 ? ((monthIncome - monthExpense) / monthIncome) * 100 : 0;

    const last12Months = getLastMonths(anchorDate, 12);
    let runningBalance = 0;

    const balanceGrowth = last12Months.map((month) => {
      const key = monthKey(month);
      const income = transactions
        .filter((item) => monthKey(item.date) === key && getType(item.type) === "income")
        .reduce((sum, item) => sum + getAmount(item), 0);
      const expense = transactions
        .filter((item) => monthKey(item.date) === key && getType(item.type) === "expense")
        .reduce((sum, item) => sum + getAmount(item), 0);
      runningBalance += income - expense;
      return { month: monthLabel(month), balance: runningBalance };
    });

    const monthlyExpenses = last12Months.map((month) => {
      const key = monthKey(month);
      return transactions
        .filter((item) => monthKey(item.date) === key && getType(item.type) === "expense")
        .reduce((sum, item) => sum + getAmount(item), 0);
    });

    const monthsWithExpense = monthlyExpenses.filter((value) => value > 0);
    const averageExpense =
      monthsWithExpense.length > 0
        ? monthsWithExpense.reduce((sum, value) => sum + value, 0) / monthsWithExpense.length
        : 0;

    const expenseChange =
      averageExpense > 0 ? ((monthExpense - averageExpense) / averageExpense) * 100 : 0;

    const incomeVsExpense = getLastMonths(anchorDate, 3).map((month) => {
      const key = monthKey(month);
      return {
        month: monthLabel(month),
        income: transactions
          .filter((item) => monthKey(item.date) === key && getType(item.type) === "income")
          .reduce((sum, item) => sum + getAmount(item), 0),
        expenses: transactions
          .filter((item) => monthKey(item.date) === key && getType(item.type) === "expense")
          .reduce((sum, item) => sum + getAmount(item), 0),
      };
    });

    const categoryMap = currentMonthTransactions
      .filter((item) => getType(item.type) === "expense")
      .reduce((map, item) => {
        const category = item.category || "Other";
        map[category] = (map[category] || 0) + getAmount(item);
        return map;
      }, {});

    const spendingCategories = Object.entries(categoryMap)
      .map(([name, value]) => ({
        name,
        value,
        percent: monthExpense > 0 ? Math.round((value / monthExpense) * 100) : 0,
      }))
      .sort((a, b) => b.value - a.value);

    return {
      balance,
      monthIncome,
      monthExpense,
      savingsRate,
      expenseChange,
      balanceGrowth,
      incomeVsExpense,
      spendingCategories,
      recentTransactions: sortedTransactions.slice(0, 5),
      activeMonthName: anchorDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    };
  }, [transactions]);

  const exportToCSV = () => {
    if (transactions.length === 0) return;

    const headers = ["Date", "Type", "Category", "Note", "Amount"];
    const rows = [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((t) => [
        formatDate(t.date),
        t.type,
        t.category || "",
        t.note || "",
        Number(t.amount || 0).toFixed(2),
      ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transactions_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 p-6">
        <div className="mx-auto max-w-7xl space-y-5">
          <div className="h-32 animate-pulse rounded-3xl bg-base-300/50" />
          <div className="h-96 animate-pulse rounded-3xl bg-base-300/50" />
          <div className="h-80 animate-pulse rounded-3xl bg-base-300/50" />
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-base-100 px-4 py-6 text-primary sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ── Header ── */}
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

        {/* ── Error / Auth banners ── */}
        {error && (
          <div className="mb-6 rounded-2xl border border-error/20 bg-error/10 p-4 text-sm text-error">
            {error}
          </div>
        )}

        {!uid && (
          <div className="mb-6 rounded-2xl border border-warning/20 bg-warning/10 p-4 text-sm text-warning">
            Please login first. The overview needs your user ID to load transaction data.
          </div>
        )}

        {/* ── Stat Cards ── */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
          style
            title="Total Balance"
            value={money(dashboard.balance)}
            note={dashboard.balance >= 0 ? "Your net balance is positive" : "Your expenses are higher"}
            icon={<FaWallet />}
            danger={dashboard.balance < 0}
          />
          <StatCard
          style
            title={`${dashboard.activeMonthName} Income`}
            value={money(dashboard.monthIncome)}
            note="Income tracked from transactions"
            icon={<FaMoneyBillWave />}
          />
          <StatCard
          style
            title={`${dashboard.activeMonthName} Expenses`}
            value={money(dashboard.monthExpense)}
            note={`${dashboard.expenseChange >= 0 ? "+" : ""}${dashboard.expenseChange.toFixed(1)}% vs avg`}
            icon={<FaReceipt />}
            danger={dashboard.expenseChange > 0}
          />
          <StatCard
          style
            title="Savings Rate"
            value={`${dashboard.savingsRate.toFixed(1)}%`}
            note={dashboard.savingsRate >= 20 ? "Healthy savings position" : "Needs tighter spending control"}
            icon={<FaPiggyBank />}
            danger={dashboard.savingsRate < 0}
          />
        </div>

        {/* ── Balance Growth Chart ── */}
        <div className="mb-6 rounded-3xl border border-base-300 bg-base-200/50 p-5 shadow-2xl backdrop-blur-xl">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-primary">Balance Growth</h2>
              <p className="mt-1 text-sm text-secondary/70">Asset performance over the last 12 months</p>
            </div>
            <div className="rounded-full bg-accent/10 px-4 py-2 text-xs font-bold text-accent">
              1Y
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboard.balanceGrowth}>
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.55} />
                    <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-base-300)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--color-secondary)", fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip
                  formatter={(value) => [money(value), "Balance"]}
                  contentStyle={tooltipStyle}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="var(--color-accent)"
                  strokeWidth={4}
                  fill="url(#balanceGradient)"
                  dot={{ r: 4, strokeWidth: 2, fill: "var(--color-base-100)", stroke: "var(--color-accent)" }}
                  activeDot={{ r: 7 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Income vs Expenses + Spending Categories ── */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">

          {/* Income vs Expenses */}
          <div className="rounded-3xl border border-base-300 bg-base-200/50 p-5 shadow-xl backdrop-blur-xl">
            <h2 className="mb-1 text-xl font-bold text-primary">Income vs Expenses</h2>
            <p className="mb-6 text-sm text-secondary/70">Last 3 months comparison</p>

            <div className="h-75">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboard.incomeVsExpense}>
                  <CartesianGrid stroke="var(--color-base-300)" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--color-secondary)", fontSize: 12 }}
                  />
                  <YAxis hide />
                  <Tooltip
                    formatter={(value) => money(value)}
                    contentStyle={tooltipStyle}
                  />
                  <Bar dataKey="income" fill="var(--color-accent)" radius={[10, 10, 0, 0]} />
                  <Bar dataKey="expenses" fill="#7C3AED" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex justify-center gap-6 text-sm">
              <span className="flex items-center gap-2 text-secondary">
                <span className="h-3 w-3 rounded-full bg-accent" />
                Income
              </span>
              <span className="flex items-center gap-2 text-secondary">
                <span className="h-3 w-3 rounded-full bg-error" />
                Expenses
              </span>
            </div>
          </div>

          {/* Spending Categories */}
          <div className="rounded-3xl border border-base-300 bg-base-200/50 p-5 shadow-xl backdrop-blur-xl">
            <h2 className="mb-1 text-xl font-bold text-primary">Spending Categories</h2>
            <p className="mb-6 text-sm text-secondary/70">Expense split for {dashboard.activeMonthName}</p>

            {dashboard.spendingCategories.length === 0 ? (
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
                        data={dashboard.spendingCategories}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={105}
                        paddingAngle={4}
                      >
                        {dashboard.spendingCategories.map((entry, index) => (
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
                        {shortMoney(dashboard.monthExpense)}
                      </p>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary/60">
                        Total
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {dashboard.spendingCategories.map((item, index) => (
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
        </div>

        {/* ── Recent Activity Table ── */}
        <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-200/50 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col justify-between gap-3 border-b border-base-300 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-primary">Recent Activity</h2>
              <p className="mt-1 text-sm text-secondary/70">
                {lastUpdated ? `Last updated ${lastUpdated.toLocaleTimeString()}` : "Waiting for live data"}
              </p>
            </div>
            <a href="/dashboard/transactions" className="text-sm font-bold text-accent hover:text-accent/70">
              View All Transactions
            </a>
          </div>

          {dashboard.recentTransactions.length === 0 ? (
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
                  {dashboard.recentTransactions.map((item) => {
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

      </div>
    </section>
  );
};

export default OverviewPage;