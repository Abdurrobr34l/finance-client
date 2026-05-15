import React from "react";
import { FaStar } from "react-icons/fa6";

const TestimonialCard = ({ item }) => {
  return (
    <div className="rounded-[28px] border border-white/10 bg-base-200/90 p-6 shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">

      <p className="text-base leading-7 text-primary md:text-lg md:leading-8">
        {item.review}
      </p>

      <div className="mt-7 flex items-center justify-between gap-4">

        <h4 className="text-lg font-bold text-primary">
          {item.name}
        </h4>

        <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(item.stars)].map((_, i) => (
            <FaStar key={i} size={17} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default TestimonialCard;