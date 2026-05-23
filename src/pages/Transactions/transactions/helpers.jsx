import React from "react";
import {
  FiBriefcase,
  FiCoffee,
  FiCreditCard,
  FiHome,
  FiShoppingCart,
  FiTruck,
} from "react-icons/fi";

export const CATEGORY_ICONS = {
  Work: <FiBriefcase />,
  Housing: <FiHome />,
  Food: <FiCoffee />,
  Shopping: <FiShoppingCart />,
  Transport: <FiTruck />,
  Other: <FiCreditCard />,
};

export const CATEGORIES = ["All", "Work", "Housing", "Food", "Transport", "Shopping", "Other"];
