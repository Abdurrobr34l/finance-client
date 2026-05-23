import React from "react";
import { Link } from "react-router";
import { FiPlus } from "react-icons/fi";

const TransactionsHeader = () => {
  return (
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
  );
};

export default TransactionsHeader;
