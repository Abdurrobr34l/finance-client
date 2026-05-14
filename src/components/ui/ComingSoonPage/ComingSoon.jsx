import React from "react";
import { useNavigate } from "react-router";
import { RiArrowLeftLine, RiToolsFill } from "react-icons/ri";

const ComingSoon = ({
  title = "Coming Soon",
  subtitle = "We're building something great.",
  description = "This page is currently under construction. Check back soon!",
  showBackButton = true,
}) => {
  const navigate = useNavigate();

  return (
    <div className="sectionPadding min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* Decorative background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-125 h-125 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, #4f46e5 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 w-100 h-100 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, #818cf8 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Card */}
      <div className="relative z-10 bg-base-200 border border-base-300 rounded-3xl shadow-xl px-10 py-14 max-w-lg w-full text-center flex flex-col items-center gap-6">

        {/* Animated icon badge */}
        <div
          className="flex items-center justify-center w-20 h-20 rounded-2xl mb-2"
          style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%)",
            boxShadow: "0 8px 32px rgba(79,70,229,0.35)",
          }}
        >
          <RiToolsFill className="text-white text-4xl animate-[spin_4s_linear_infinite]" />
        </div>

        {/* Pill label */}
        <span className="badge badge-soft badge-accent text-xs font-semibold tracking-widest uppercase px-4 py-2">
          Under Construction
        </span>

        {/* Headings */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          <p className="text-accent font-semibold text-lg">{subtitle}</p>
        </div>

        {/* Description */}
        <p className="text-secondary text-sm leading-relaxed max-w-xs">
          {description}
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-base-300 rounded-full" />

        {/* Progress bar — decorative */}
        <div className="w-full">
          <div className="flex justify-between text-xs text-secondary mb-2">
            <span>Development Progress</span>
            <span>In Progress</span>
          </div>
          <div className="w-full bg-base-300 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 rounded-full"
              style={{
                width: "42%",
                background: "linear-gradient(90deg, #4f46e5, #818cf8)",
                animation: "progress-shine 2s ease-in-out infinite alternate",
              }}
            />
          </div>
        </div>

        {/* Back button */}
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-primary mt-2 gap-2 rounded-xl"
          >
            <RiArrowLeftLine className="text-lg" />
            Go Back
          </button>
        )}
      </div>

      {/* Footer note */}
      <p className="relative z-10 mt-8 text-xs text-secondary opacity-60">
        WealthWise — Building phase {new Date().getFullYear()}
      </p>

      {/* Inline keyframes for progress bar shine */}
      <style>{`
        @keyframes progress-shine {
          from { opacity: 0.7; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;