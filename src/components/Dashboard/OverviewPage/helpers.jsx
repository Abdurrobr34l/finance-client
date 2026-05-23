import React from "react";
import {
  FaBriefcase,
  FaCar,
  FaEllipsisH,
  FaHome,
  FaShoppingBag,
  FaUtensils,
} from "react-icons/fa";

// Chart colors using your theme's accent/secondary palette
export const chartColors = [
  "var(--color-accent)",       // #818cf8 (dark) / #4f46e5 (light)
  "#7c3aed",
  "#06b6d4",
  "#f59e0b",
  "#22c55e",
  "#ef4444",
  "var(--color-secondary)",    // #a5b4fc (dark) / #64748b (light)
];

// Tooltip shared style using theme variables
export const tooltipStyle = {
  background: "var(--color-base-200)",
  border: "1px solid var(--color-neutral, var(--color-base-300))",
  borderRadius: "18px",
  color: "var(--color-primary)",
};

export const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export const shortMoney = (value) => {
  const amount = Number(value || 0);
  if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}k`;
  return `$${amount.toFixed(0)}`;
};

export const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

export const monthKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth()}`;
};

export const monthLabel = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
  });

export const getLastMonths = (anchorDate, count) =>
  Array.from({ length: count }, (_, index) => {
    const date = new Date(anchorDate);
    date.setDate(1);
    date.setMonth(date.getMonth() - count + 1 + index);
    return date;
  });

export const getType = (type) => String(type || "").toLowerCase();

export const getAmount = (transaction) => Number(transaction?.amount || 0);

export const categoryIcon = (category = "") => {
  const value = category.toLowerCase();
  if (value.includes("income") || value.includes("salary") || value.includes("payroll")) return <FaBriefcase />;
  if (value.includes("food") || value.includes("dining") || value.includes("restaurant")) return <FaUtensils />;
  if (value.includes("rent") || value.includes("house") || value.includes("home")) return <FaHome />;
  if (value.includes("car") || value.includes("transport")) return <FaCar />;
  if (value.includes("shop") || value.includes("grocery")) return <FaShoppingBag />;
  return <FaEllipsisH />;
};
