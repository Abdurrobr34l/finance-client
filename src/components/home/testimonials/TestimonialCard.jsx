import React from "react";
import { FaStar } from "react-icons/fa6";

const TestimonialCard = ({ item }) => {
  return (
    <div className="rounded-[28px] bg-base-200 p-6 shadow-sm">
      <p className="text-lg leading-9 text-primary">
        {item.review}
      </p>

      <div className="mt-8 flex items-center justify-between gap-4">
        <h4 className="text-2xl font-bold text-primary">
          {item.name}
        </h4>

        <div className="flex items-center gap-1 text-[#ff4d5a]">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={18} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;