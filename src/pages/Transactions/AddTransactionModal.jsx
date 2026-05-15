import React from "react";
import { FiX } from "react-icons/fi";

const AddTransactionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-base-200/60 border border-base-300 text-primary placeholder:text-secondary outline-none focus:ring-2 focus:ring-accent transition backdrop-blur";

  return (
    <div className="modal modal-open">
      {/* Background blur */}
      <div className="absolute size-70 bg-accent/20 blur-[120px] rounded-full top-10 left-10" />
      <div className="absolute size-70 bg-primary/10 blur-[120px] rounded-full bottom-10 right-10" />

      <div className="modal-box w-full max-w-2xl bg-base-200/40 backdrop-blur-2xl border border-base-300 rounded-3xl p-8 shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-primary">
              Add transaction
            </h3>
            <p className="text-secondary text-sm mt-1">
              Record your income or expense in seconds
            </p>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost btn-circle hover:bg-base-300"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Example: Grocery shopping"
              className={inputClass}
            />
          </div>

          {/* Amount + Type */}
          <div className="grid gap-4 md:grid-cols-2">

            <input
              type="number"
              placeholder="0.00"
              className={inputClass}
            />

            <select className={inputClass}>
              <option className="bg-secondary">Income</option>
              <option className="bg-secondary">Expense</option>
            </select>

          </div>

          {/* Category + Date */}
          <div className="grid gap-4 md:grid-cols-2">

            <select className={inputClass}>
              <option className="bg-secondary">Work</option>
              <option className="bg-secondary">Housing</option>
              <option className="bg-secondary">Food</option>
              <option className="bg-secondary">Transport</option>
              <option className="bg-secondary">Shopping</option>
              <option className="bg-secondary">Other</option>
            </select>

            <input type="date" className={inputClass} />

          </div>

          {/* Payment Method */}
          <select className={inputClass}>
            <option className="bg-secondary">Bank Transfer</option>
            <option className="bg-secondary">Debit Card</option>
            <option className="bg-secondary">Credit Card</option>
            <option className="bg-secondary">Cash</option>
            <option className="bg-secondary">PayPal</option>
          </select>

          {/* Note */}
          <textarea
            placeholder="Optional note..."
            className={`${inputClass} min-h-28`}
          />

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary shadow-none transition-colors duration-300 ease-linear hover:bg-transparent hover:text-primary rounded-lg"
            >
              Save transaction
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;