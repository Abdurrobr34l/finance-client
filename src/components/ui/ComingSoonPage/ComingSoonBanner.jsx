import React from "react";
import { RiRocketLine } from "react-icons/ri";

const ComingSoonBanner = () => {
  return (
    <section className="sectionPadding bg-base-100">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="rounded-3xl border border-slate-300/70 dark:border-white/10 px-8 py-12 text-center flex flex-col items-center gap-4"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent/10 text-accent">
            <RiRocketLine size={24} />
          </div>

          {/* Label */}
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            More on the way
          </p>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-primary max-w-lg">
            Pricing, About Us & more pages are coming soon
          </h2>

          {/* Subtext */}
          <p className="text-secondary text-sm leading-relaxed max-w-md">
            We're actively building out the full WealthWise experience — pricing plans, team info, and more. Stay tuned.
          </p>

          {/* Pill badges */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {["Security Assurance", "FAQ", "Get Started"].map((label) => (
              <span
                key={label}
                className="badge badge-soft badge-accent text-xs px-3 py-2 rounded-full font-medium"
              >
                {label} — Coming Soon
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonBanner;