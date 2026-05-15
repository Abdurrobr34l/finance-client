import React from "react";
import Container from "../../shared/Container";
import SectionTitles from "../../ui/SectionTitles";
import SectionSubTitle from "../../ui/SectionSubTitle";
import { testimonials } from "../../../data/testimonials";
import TestimonialCard from "./TestimonialCard";
import * as MarqueeModule from "react-fast-marquee";

const Testimonials = () => {
  const Marquee = MarqueeModule.default;
  const column1 = testimonials.slice(0, 3);
  const column2 = testimonials.slice(3, 6);
  const column3 = testimonials.slice(6, 9);

  return (
    <section className="sectionPadding overflow-hidden">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          
          {/* LEFT SIDE */}
          <div className="max-w-2xl">
            <SectionTitles customCss="max-w-xl">
              Feel the love
            </SectionTitles>

            <SectionSubTitle customCss="mt-6 max-w-lg text-xl leading-10">
              No need to take our word for it! Here’s just a few of our
              thousands of 5 star reviews*
            </SectionSubTitle>

            <div className="mt-8 flex items-center gap-3 text-[#ff4d5a]">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-5xl">
                  ★
                </span>
              ))}
            </div>

            <p className="mt-5 text-sm text-secondary">
              *Reviews may have been edited for clarity and/or conciseness.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative h-175 overflow-hidden">
            
            {/* fade top */}
            <div className="pointer-events-none absolute top-0 z-20 h-32 w-full bg-linear-to-b from-base-300 to-transparent" />

            {/* fade bottom */}
            <div className="pointer-events-none absolute bottom-0 z-20 h-32 w-full bg-linear-to-t from-base-300 to-transparent" />

            <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3">
              
              {/* COLUMN 1 */}
              <Marquee
                direction="up"
                speed={30}
                gradient={false}
                pauseOnHover
                className="overflow-hidden"
              >
                <div className="space-y-6 pr-6">
                  {[...column1, ...column1].map((item, i) => (
                    <TestimonialCard key={i} item={item} />
                  ))}
                </div>
              </Marquee>

              {/* COLUMN 2 */}
              <Marquee
                direction="up"
                speed={40}
                gradient={false}
                pauseOnHover
                className="overflow-hidden hidden md:block"
              >
                <div className="space-y-6 pr-6 pt-20">
                  {[...column2, ...column2].map((item, i) => (
                    <TestimonialCard key={i} item={item} />
                  ))}
                </div>
              </Marquee>

              {/* COLUMN 3 */}
              <Marquee
                direction="up"
                speed={32}
                gradient={false}
                pauseOnHover
                className="overflow-hidden hidden md:block"
              >
                <div className="space-y-6">
                  {[...column3, ...column3].map((item, i) => (
                    <TestimonialCard key={i} item={item} />
                  ))}
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;