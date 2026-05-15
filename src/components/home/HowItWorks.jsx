import React from "react";
import { FiUserPlus, FiCreditCard, FiPieChart, FiTrendingUp, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import Container from "../shared/Container";
import SectionTitles from "../ui/SectionTitles";
import SectionSubTitle from "../ui/SectionSubTitle";

const steps = [
  {
    id: "01",
    icon: <FiUserPlus />,
    title: "Create your account",
    text: "Sign up in minutes and set up your personal WealthWise profile securely.",
    highlight: "Fast onboarding",
  },
  {
    id: "02",
    icon: <FiCreditCard />,
    title: "Add your money details",
    text: "Connect accounts, add budgets, and organize income and spending in one place.",
    highlight: "Accounts & budgets",
  },
  {
    id: "03",
    icon: <FiPieChart />,
    title: "Track every transaction",
    text: "See where your money goes with clear categories, spending patterns, and alerts.",
    highlight: "Live tracking",
  },
  {
    id: "04",
    icon: <FiTrendingUp />,
    title: "Improve your decisions",
    text: "Use simple insights to save more, reduce waste, and stay in control every month.",
    highlight: "Smarter habits",
  },
];

const HowItWorks = () => {
  return (
    <section className="sectionPadding relative overflow-hidden bg-base-100">
      <div className="pointer-events-none absolute left-0 top-20 h-80 w-80 rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-96 w-96 rounded-full bg-info/20 blur-[130px]" />

      <Container>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-accent">
            How It Works
          </p>

          <SectionTitles>
            Start managing your money in four simple steps
          </SectionTitles>

          <SectionSubTitle customCss="mx-auto max-w-2xl">
            WealthWise keeps the process simple. Set up your profile, connect
            your money details, track your spending, and make better financial
            decisions with confidence.
          </SectionSubTitle>
        </div>

        <div className="relative z-10 mt-14 grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-base-200/80 p-6 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:bg-base-200"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-2xl transition-all duration-300 group-hover:bg-accent/20" />

              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-2xl text-accent ring-1 ring-accent/20">
                    {step.icon}
                  </div>

                  <span className="number-font text-sm font-semibold text-secondary/70">
                    {step.id}
                  </span>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  <FiCheckCircle />
                  {step.highlight}
                </span>

                <h3 className="mt-5 text-2xl font-bold leading-tight text-primary">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-secondary">
                  {step.text}
                </p>

                {index !== steps.length - 1 && (
                  <div className="mt-7 hidden items-center gap-2 text-sm font-semibold text-accent xl:flex">
                    Next step
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 mx-auto mt-10 max-w-4xl rounded-3xl border border-white/10 bg-base-200/70 p-6 text-center shadow-xl shadow-black/10 md:p-8">
          <p className="text-sm leading-6 text-secondary md:text-base">
            No complex spreadsheets. No confusing finance terms. Just a simple
            flow that helps you understand, control, and grow your money.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;