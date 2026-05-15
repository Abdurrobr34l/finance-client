import React from "react";
import Container from "../../shared/Container";
import SectionTitles from "../../ui/SectionTitles";
import SectionSubTitle from "../../ui/SectionSubTitle";
import { testimonials } from "../../data/testimonials";
// import { testimonials } from "../../../data/testimonials";
import TestimonialCard from "./TestimonialCard";
import { FaStar } from "react-icons/fa6";
import "./testimonailAnimation.css"

const Testimonials = () => {
  const column1 = testimonials.slice(0, 4);
  const column2 = testimonials.slice(3, 9);
  // const column3 = testimonials.slice(6, 9);

  const renderColumn = (items, speed = "28s", extraClass = "") => {
    const repeatedItems = [...items, ...items];

    return (
      <div className={`relative h-full overflow-hidden ${extraClass}`}>
        <div
          className="testimonial-scroll space-y-6"
          style={{ "--scroll-speed": speed }}
        >
          {repeatedItems.map((item, index) => (
            <TestimonialCard key={`${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="sectionPadding relative overflow-hidden bg-base-100">
      <div className="pointer-events-none absolute left-0 top-40 h-80 w-80 rounded-full bg-accent/15 blur-[120px]" />
      {/* <div className="pointer-events-none absolute bottom-10 right-0 h-96 w-96 rounded-full bg-info/15 blur-[130px]" /> */}

      <Container>
        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[0.9fr_1.25fr] xl:gap-16">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-accent">
              Testimonials
            </p>

            <SectionTitles customCss="max-w-xl">
              Feel the love from WealthWise users
            </SectionTitles>

            <SectionSubTitle customCss="mt-6 max-w-xl text-lg leading-6! md:text-xl md:leading-9">
              No need to take our word for it. Here are a few reviews from
              people using WealthWise to understand their money better.
            </SectionSubTitle>

            <div className="mt-8 flex items-center gap-3 text-yellow-500">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="text-4xl md:text-5xl" />
              ))}
            </div>

            <p className="mt-5 max-w-md text-sm leading-6 text-secondary">
              *Reviews may have been edited for clarity and conciseness.
            </p>
          </div>

          <div className="relative h-155 overflow-hidden md:h-170">
            <div className="pointer-events-none absolute top-0 z-20 h-32 w-full bg-linear-to-b from-base-100 via-base-100/80 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 z-20 h-32 w-full bg-linear-to-t from-base-100 via-base-100/80 to-transparent" />

            <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
              {renderColumn(column1, "30s")}
              {renderColumn(column2, "38s", "hidden md:block pt-20")}
              {/* {renderColumn(column3, "34s", "hidden xl:block pt-8")} */}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;