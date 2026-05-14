import React from "react";
import Container from "../shared/Container";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const HeroSect = () => {
  return (
    <section className="relative overflow-hidden sectionPadding 2xl:py-25!">
      {/* BLUR EFFECTS */}
      <div className="absolute left-0 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white/40 blur-3xl"></div>
      <div className="absolute top-10 right-0 h-52 w-52 rounded-full bg-white/30 blur-3xl"></div>
      <div className="absolute bottom-10 right-0 h-52 w-52 rounded-full bg-white/30 blur-3xl"></div>

      <Container className="relative z-10">
        {/* HERO CONTENT */}
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-base-100 px-4 py-1.5 shadow-sm">
            <div className="relative flex items-center">
              <span className="absolute h-2 w-2 rounded-full bg-success animate-[ping_1.5s_infinite]"></span>
              <span className="relative h-2 w-2 rounded-full bg-success"></span>
            </div>

            <span className="text-xs font-medium text-secondary">
              Trusted by 10,000+ users worldwide
            </span>
          </div>

          {/* HEADING */}
          <h1 className="mx-auto my-6 max-w-4xl text-[28px] font-extrabold leading-[1.05] tracking-tight text-primary md:text-5xl lg:text-7xl xl:text-8xl">
            Take control of your
            <br />
            money, <span className="text-accent">finally</span>.
          </h1>

          {/* DESCRIPTION */}
          <p className="mx-auto max-w-2xl text-sm leading-5 text-secondary md:text-base">
            WealthWise brings all your
            <span className="mx-1 font-bold text-primary">
              accounts
            </span>
            ,
            <span className="mx-1 font-bold text-primary">
              budgets
            </span>
            , and
            <span className="mx-1 font-bold text-primary">
              goals
            </span>
            into one beautifully simple dashboard — so you always
            know where your money is going.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="relative mx-auto mt-10 rounded-2xl bg-accent/10 p-5 pb-0! shadow-[0_20px_70px_rgba(56,189,248,0.35)] md:p-10 lg:px-15 lg:mt-15 xl:lg:px-20 xl:lg:pt-15 xl:rounded-3xl">
          <div className="overflow-hidden rounded-t-[18px] border border-black/5 bg-white shadow-lg">
            <img src="https://placehold.net/600x600.png" alt="It is hero banner image" className="w-full md:aspect-3/2 lg:aspect-3/1.5" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSect;