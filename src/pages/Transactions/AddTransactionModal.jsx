import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { FiX } from "react-icons/fi";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

const CATEGORIES = ["Work", "Housing", "Food", "Transport", "Shopping", "Entertainment", "Freelance", "Other"];
const PAYMENT_METHODS = ["Bank Transfer", "Debit Card", "Credit Card", "Cash", "PayPal"];

const AddTransactionModal = ({ isOpen, onClose, onSaved, uid, editing }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Pre-fill form when editing, clear when adding
  useEffect(() => {
    if (!isOpen) return;
    reset(
      editing
        ? {
            title: editing.title || "",
            amount: editing.amount || "",
            type: editing.type || "Expense",
            category: editing.category || "Food",
            date: editing.date
              ? editing.date.split("T")[0]
              : new Date().toISOString().split("T")[0],
            paymentMethod: editing.paymentMethod || "Bank Transfer",
            note: editing.note || "",
          }
        : {
            title: "",
            amount: "",
            type: "Expense",
            category: "Food",
            date: new Date().toISOString().split("T")[0],
            paymentMethod: "Bank Transfer",
            note: "",
          }
    );
  }, [isOpen, editing, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      const body = {
        uid,
        title: data.title,
        type: data.type,
        category: data.category,
        amount: Number(data.amount),
        date: data.date,
        paymentMethod: data.paymentMethod,
        note: data.note || "",
      };

      if (editing) {
        await axios.patch(`${API}/transactions/${editing._id}`, body);
        toast.success("Transaction updated!");
      } else {
        await axios.post(`${API}/transactions`, body);
        toast.success("Transaction added!");
      }

      onSaved?.();
      onClose();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-base-200/60 border border-base-300 text-primary placeholder:text-secondary outline-none focus:ring-2 focus:ring-accent transition backdrop-blur";

  const errClass = "text-error text-xs mt-1 ml-1";

  return (
    <div className="modal modal-open">
      {/* Background blur */}
      <div className="absolute size-70 bg-accent/20 blur-[120px] rounded-full top-10 left-10 pointer-events-none" />
      <div className="absolute size-70 bg-primary/10 blur-[120px] rounded-full bottom-10 right-10 pointer-events-none" />

      <div className="modal-box w-full max-w-2xl bg-base-200/40 backdrop-blur-2xl border border-base-300 rounded-3xl p-6 sm:p-8 shadow-2xl mx-4">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-primary">
              {editing ? "Edit transaction" : "Add transaction"}
            </h3>
            <p className="text-secondary text-sm mt-1">
              {editing
                ? "Update the details below"
                : "Record your income or expense in seconds"}
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Example: Grocery shopping"
              className={inputClass}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className={errClass}>{errors.title.message}</p>}
          </div>

          {/* Amount + Type */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                className={inputClass}
                {...register("amount", {
                  required: "Amount is required",
                  min: { value: 0.01, message: "Must be greater than 0" },
                })}
              />
              {errors.amount && <p className={errClass}>{errors.amount.message}</p>}
            </div>

            <select className={inputClass} {...register("type")}>
              <option>Income</option>
              <option>Expense</option>
            </select>
          </div>

          {/* Category + Date */}
          <div className="grid gap-4 sm:grid-cols-2">
            <select className={inputClass} {...register("category")}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <div>
              <input
                type="date"
                className={inputClass}
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && <p className={errClass}>{errors.date.message}</p>}
            </div>
          </div>

          {/* Payment Method */}
          <select className={inputClass} {...register("paymentMethod")}>
            {PAYMENT_METHODS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          {/* Note */}
          <textarea
            placeholder="Optional note..."
            className={`${inputClass} min-h-28 resize-none`}
            {...register("note")}
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
              disabled={isSubmitting}
              className="btn btn-primary shadow-none transition-colors duration-300 ease-linear hover:bg-transparent hover:text-primary rounded-lg"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : editing ? (
                "Update transaction"
              ) : (
                "Save transaction"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;