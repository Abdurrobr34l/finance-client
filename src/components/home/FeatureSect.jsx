import React from "react";
import {
  HiOutlineChartBar,
  HiOutlineBell,
  HiOutlineShieldCheck,
  HiOutlineCurrencyDollar,
  HiOutlineFlag,
} from "react-icons/hi2";
import SectionTitles from "../ui/SectionTitles";
import SectionSubTitle from "../ui/SectionSubTitle";

const FeatureCard = ({ children, className = "" }) => (
  <div
    className={`rounded-3xl border border-slate-300/70 dark:border-white/10 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] ${className}`}
    style={{
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
    }}
  >
    {children}
  </div>
);

const IconBox = ({ icon }) => (
  <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent">
    {icon}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-base font-bold text-primary mb-1.5">{children}</h3>
);

const CardDesc = ({ children }) => (
  <p className="text-sm leading-6 text-secondary">{children}</p>
);

const Feature = () => {
  return (
    <section className="sectionPadding bg-base-100">
      <div className="max-w-6xl mx-auto px-4">

        {/* SECTION TITLE */}
        <div className="text-center mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Features
          </p>
          <SectionTitles>
            Built around how you
            <br className="hidden sm:block" /> actually spend money
          </SectionTitles>
          <SectionSubTitle customCss={"mx-auto max-w-xl"}>
            No fluff, no overwhelming dashboards. Just the tools you need to understand, control, and grow your finances.
          </SectionSubTitle>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">

          {/* CARD 1 — Expense Tracking (large) */}
          <FeatureCard className="lg:col-span-7">
            <IconBox icon={<HiOutlineChartBar size={22} />} />
            <CardTitle>Expense tracking that actually works</CardTitle>
            <CardDesc>
              Every purchase is automatically sorted into categories. No manual
              entry, no guesswork — just a clear picture of where your money
              went this month.
            </CardDesc>

            {/* Mock transaction list */}
            <div className="mt-5 space-y-2">
              {[
                { label: "Housing", amount: "1,200", color: "bg-accent", pct: "w-full" },
                { label: "Food & Dining", amount: "340", color: "bg-info", pct: "w-4/6" },
                { label: "Transport", amount: "180", color: "bg-accent/50", pct: "w-3/6" },
                { label: "Entertainment", amount: "95", color: "bg-accent/30", pct: "w-2/6" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="w-24 text-xs text-secondary shrink-0">
                    {item.label}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-base-300 overflow-hidden">
                    <div className={`h-full rounded-full ${item.color} ${item.pct}`} />
                  </div>
                  <span className="number-font text-xs font-semibold text-primary w-14 text-right">
                    ${item.amount}
                  </span>
                </div>
              ))}
            </div>
          </FeatureCard>

          {/* CARD 2 — Smart Alerts (small, accent) */}
          <FeatureCard className="lg:col-span-5">
            <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 text-white">
              <HiOutlineBell size={22} />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">
              Smart alerts, before it's too late
            </h3>
            <p className="text-sm leading-6 text-indigo-200">
              Get notified the moment you're approaching a budget limit — so
              you can adjust before you overspend, not after.
            </p>

            {/* Mock alert pills */}
            <div className="mt-5 space-y-2">
              {[
                { text: "Groceries at 85% of budget", dot: "bg-warning" },
                { text: "Rent due in 3 days", dot: "bg-error" },
                { text: "Savings goal reached ✓", dot: "bg-success" },
              ].map((a) => (
                <div
                  key={a.text}
                  className="flex items-center gap-2.5 bg-white/10 rounded-xl px-3 py-2.5"
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${a.dot}`} />
                  <span className="text-xs text-white/90">{a.text}</span>
                </div>
              ))}
            </div>
          </FeatureCard>

          {/* CARD 3 — Net Worth (small) */}
          <FeatureCard className="lg:col-span-4">
            <IconBox icon={<HiOutlineCurrencyDollar size={22} />} />
            <CardTitle>Net worth at a glance</CardTitle>
            <CardDesc>
              See your total financial picture — assets minus liabilities — updated every time you log in.
            </CardDesc>

            {/* Mock stat */}
            <div className="mt-5 flex items-end gap-2">
              <span className="number-font text-4xl font-extrabold text-accent leading-none">
                $24,830
              </span>
              <span className="number-font text-sm text-success font-semibold mb-1">
                ↑ 8.2%
              </span>
            </div>
            <p className="text-xs text-secondary mt-1.5">vs last month</p>
          </FeatureCard>

          {/* CARD 4 — Bank-grade Security (small) */}
          <FeatureCard className="lg:col-span-4">
            <IconBox icon={<HiOutlineShieldCheck size={22} />} />
            <CardTitle>Your data stays yours</CardTitle>
            <CardDesc>
              Your personal finances are protected with bank-grade security and{" "}
              <span className="number-font font-semibold text-primary">256</span>
              -bit AES encryption on every entry.
            </CardDesc>

            {/* Mock badge */}
            <div className="mt-5 inline-flex items-center gap-2 bg-success/10 text-success text-xs font-semibold px-3 py-2 rounded-xl border border-success/20">
              <HiOutlineShieldCheck size={14} />
              All connections encrypted
            </div>
          </FeatureCard>

          {/* CARD 5 — Savings Goals (wide) */}
          <FeatureCard className="lg:col-span-4">
            <IconBox icon={<HiOutlineFlag size={22} />} />
            <CardTitle>Save with a reason, not just a habit</CardTitle>
            <CardDesc>
              Set goals for anything — emergency fund, vacation, new device.
              See exactly how long it'll take based on what you actually save.
            </CardDesc>

            {/* Mock progress bars */}
            <div className="mt-5 space-y-3">
              {[
                { label: "Emergency Fund", pct: 68 },
                { label: "Vacation", pct: 41 },
              ].map((g) => (
                <div key={g.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-secondary">{g.label}</span>
                    <span className="number-font text-xs font-semibold text-primary">
                      {g.pct}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-base-300 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${g.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </FeatureCard>

        </div>
      </div>
    </section>
  );
};

export default Feature;