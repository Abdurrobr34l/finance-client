import React from "react";
import { FaReceipt } from "react-icons/fa";

const EmptyCard = ({ title, message }) => (
  <div className="flex min-h-70 flex-col items-center justify-center rounded-3xl border border-base-300 bg-base-200/45 p-6 text-center">
    <FaReceipt className="mb-4 text-3xl text-secondary/70" />
    <h3 className="text-lg font-bold text-primary">{title}</h3>
    <p className="mt-2 max-w-sm text-sm text-secondary/70">{message}</p>
  </div>
);

export default EmptyCard;
