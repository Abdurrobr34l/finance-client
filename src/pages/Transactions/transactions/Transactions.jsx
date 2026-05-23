import React, { useContext, useEffect, useState, useMemo } from "react";
import { FiCreditCard, FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import axios from "axios";
import Container from "../../../components/shared/Container";
import { AuthContext } from "../../../Context/AuthContext";

import TransactionsHeader from "./TransactionsHeader";
import TransactionsFilters from "./TransactionsFilters";
import TransactionsSummary from "./TransactionsSummary";
import TransactionsList from "./TransactionsList";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

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
  const income = useMemo(() => {
    return transactions
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
  }, [transactions]);

  const expense = useMemo(() => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
  }, [transactions]);

  const balance = useMemo(() => income - expense, [income, expense]);

  const summary = useMemo(() => {
    return [
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
  }, [income, expense, balance]);

  // Filter + sort
  const filtered = useMemo(() => {
    return [...transactions]
      .filter((t) => {
        const matchSearch =
          (t.note || "").toLowerCase().includes(search.toLowerCase()) ||
          (t.category || "").toLowerCase().includes(search.toLowerCase());
        const matchType = type === "all" || t.type === type;
        const matchCategory = category === "All" || t.category === category;
        return matchSearch && matchType && matchCategory;
      })
      .sort((a, b) =>
        sort === "amount" ? b.amount - a.amount : new Date(b.date) - new Date(a.date)
      );
  }, [transactions, search, type, category, sort]);

  return (
    <section className="min-h-screen bg-base-100 sectionPadding">
      <title>WealthWise | Transactions</title>

      <Container>
        {/* Header */}
        <TransactionsHeader />

        {/* Filters */}
        <TransactionsFilters
          search={search}
          setSearch={setSearch}
          type={type}
          setType={setType}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        {/* Summary cards */}
        <TransactionsSummary summary={summary} />

        {/* Transaction list */}
        <TransactionsList
          user={user}
          loading={loading}
          error={error}
          filtered={filtered}
          transactions={transactions}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </Container>
    </section>
  );
};

export default Transactions;