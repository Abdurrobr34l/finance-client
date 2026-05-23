import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaMoneyBillWave, FaPiggyBank, FaReceipt, FaWallet } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";
import {
  money,
  monthKey,
  monthLabel,
  getLastMonths,
  getType,
  getAmount,
  formatDate,
} from "./helpers";

import StatCard from "./StatCard";
import OverviewHeader from "./OverviewHeader";
import BalanceGrowthChart from "./BalanceGrowthChart";
import IncomeVsExpensesChart from "./IncomeVsExpensesChart";
import SpendingCategoriesChart from "./SpendingCategoriesChart";
import RecentActivityTable from "./RecentActivityTable";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

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
    <>
      <title>WealthWise | Overview</title>

      <section className="min-h-screen bg-base-100 px-4 py-6 text-primary sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <OverviewHeader
            user={user}
            transactions={transactions}
            exportToCSV={exportToCSV}
          />

          {/* Error / Auth banners */}
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

          {/* Stat Cards */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Balance"
              value={money(dashboard.balance)}
              note={dashboard.balance >= 0 ? "Your net balance is positive" : "Your expenses are higher"}
              icon={<FaWallet />}
              danger={dashboard.balance < 0}
            />
            <StatCard
              title={`${dashboard.activeMonthName} Income`}
              value={money(dashboard.monthIncome)}
              note="Income tracked from transactions"
              icon={<FaMoneyBillWave />}
            />
            <StatCard
              title={`${dashboard.activeMonthName} Expenses`}
              value={money(dashboard.monthExpense)}
              note={`${dashboard.expenseChange >= 0 ? "+" : ""}${dashboard.expenseChange.toFixed(1)}% vs avg`}
              icon={<FaReceipt />}
              danger={dashboard.expenseChange > 0}
            />
            <StatCard
              title="Savings Rate"
              value={`${dashboard.savingsRate.toFixed(1)}%`}
              note={dashboard.savingsRate >= 20 ? "Healthy savings position" : "Needs tighter spending control"}
              icon={<FaPiggyBank />}
              danger={dashboard.savingsRate < 0}
            />
          </div>

          {/* Balance Growth Chart */}
          <BalanceGrowthChart balanceGrowth={dashboard.balanceGrowth} />

          {/* Income vs Expenses + Spending Categories */}
          <div className="mb-6 grid gap-6 lg:grid-cols-2">
            <IncomeVsExpensesChart incomeVsExpense={dashboard.incomeVsExpense} />
            <SpendingCategoriesChart
              spendingCategories={dashboard.spendingCategories}
              activeMonthName={dashboard.activeMonthName}
              monthExpense={dashboard.monthExpense}
            />
          </div>

          {/* Recent Activity Table */}
          <RecentActivityTable
            recentTransactions={dashboard.recentTransactions}
            lastUpdated={lastUpdated}
          />
        </div>
      </section>
    </>
  );
};

export default OverviewPage;
