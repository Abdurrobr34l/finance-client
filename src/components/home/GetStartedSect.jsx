import React, { useContext } from "react";
import { NavLink } from "react-router";
import { FiArrowRight, FiCheckCircle, FiShield, FiTrendingUp } from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";
import Container from "../shared/Container";
import SectionTitles from "../ui/SectionTitles";
import SectionSubTitle from "../ui/SectionSubTitle";

const GetStartedSect = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;
  if (user) return null;

  return (
    <section className="sectionPadding relative overflow-hidden bg-base-100">
      <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/20 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-info/15 blur-[120px]" />

      <Container>
        <div className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-4xl border border-white/10 bg-base-200/80 px-6 py-10 text-center shadow-2xl shadow-black/10 md:px-10 md:py-14 lg:px-16">

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-accent">
            Get Started
          </p>

          <SectionTitles customCss={"2xl:text-6xl!"}>
            Start tracking your finances today
          </SectionTitles>

          <SectionSubTitle customCss="m-auto max-w-2xl">
            Join thousands of people building healthier financial habits with
            WealthWise. Free forever for personal use.
          </SectionSubTitle>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <NavLink to="/register" className="btn btn-secondary transition-colors duration-300 ease-linear hover:bg-transparent hover:text-primary rounded-lg">
              Create free account
              <FiArrowRight/>
            </NavLink>

            <NavLink to="/pricing" className="btn btn-secondary bg-transparent text-primary transition-colors duration-300 ease-linear hover:bg-secondary hover:text-primary rounded-lg">
              View pricing
            </NavLink>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3 ">
            <div className="rounded-2xl border border-white/10 bg-base-100/70 p-5 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:bg-base-200">
              <FiCheckCircle className="mx-auto text-xl text-accent" />
              <p className="mt-2 text-sm font-semibold text-primary">
                No credit card needed
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-base-100/70 p-5 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:bg-base-200">
              <FiShield className="mx-auto text-xl text-accent" />
              <p className="mt-2 text-sm font-semibold text-primary">
                Secure by design
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-base-100/70 p-5 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:bg-base-200">
              <FiTrendingUp className="mx-auto text-xl text-accent" />
              <p className="mt-2 text-sm font-semibold text-primary">
                Built for daily habits
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GetStartedSect;