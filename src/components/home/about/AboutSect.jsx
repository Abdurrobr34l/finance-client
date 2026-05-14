import React from "react";
import { FaArrowRight } from "react-icons/fa";

import Container from "../../shared/Container";
import { Link } from "react-router";
import Counter from "./Counter";
import SectionTitles from "../../ui/SectionTitles";
import SectionSubTitle from "../../ui/SectionSubTitle";

const AboutSect = () => {
  return (
    <section className="sectionPadding overflow-hidden bg-base-200">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-0">

          {/* LEFT CONTENT */}
          <div className="relative max-w-2xl">
            {/* LABEL */}
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-accent">
              About WealthWise
            </p>

            {/* HEADING */}
            <SectionTitles >We built the tool we wished we had.</SectionTitles>

            {/* DESCRIPTION */}
            <SectionSubTitle>
              Most finance apps are either too simple or too overwhelming.
              WealthWise started as a side project to fix that — a clean,
              honest way to see where your money goes every month, without
              the noise.
            </SectionSubTitle>

            {/* STATS */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

              {/* CARD */}
              <div className="rounded-3xl bg-base-100 px-6 py-7 text-center shadow-sm border border-primary/5">
                <h3 className="text-3xl font-extrabold text-accent">
                  <Counter end={10} suffix="K+" />
                </h3>

                <p className="mt-2 text-sm text-secondary lg:text-[12px] xl:text-sm">
                  People tracking their money daily
                </p>
              </div>

              {/* CARD */}
              <div className="rounded-3xl bg-base-100 px-6 py-7 text-center shadow-sm border border-primary/5">
                <h3 className="text-3xl font-extrabold text-accent">
                  <Counter end={99.9} decimals={1} suffix="%" />
                </h3>

                <p className="mt-2 text-sm text-secondary lg:text-[12px] xl:text-sm">
                  Uptime since launch
                </p>
              </div>

              {/* CARD */}
              <div className="rounded-3xl bg-base-100 px-6 py-7 text-center shadow-sm border border-primary/5">
                <h3 className="text-3xl font-extrabold text-accent">
                  <Counter end={256} />
                </h3>

                <p className="mt-2 text-sm text-secondary lg:text-[12px] xl:text-sm">
                  Bit encryption on every entry
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <Link to={"about-us"} className="group mt-10 inline-flex items-center gap-2 text-base font-bold text-primary transition-all duration-300 hover:gap-3 hover:text-accent ease-linear z-10">
              Learn about us

              <FaArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative lg:translate-x-16 xl:translate-x-20">

            {/* IMAGE WRAPPER */}
            <div className="overflow-hidden rounded-4xl shadow-[0_20px_80px_rgba(0,0,0,0.15)]">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600"
                alt="Finance dashboard"
                className="h-80 w-full object-cover md:h-112.5 lg:h-130"
              />
            </div>

            {/* GLOW */}
            <div className="absolute -bottom-90 -left-80 -z-10 size-130 rounded-full bg-accent/20 blur-3xl animate-[pulse_5.5s_infinite]"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSect;