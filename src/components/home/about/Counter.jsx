import React, { useEffect, useRef, useState } from "react";

const Counter = ({
  end,
  duration = 2000,
  suffix = "",
  decimals = 0,
  className = "",
}) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const ref = useRef(null);

  // VIEWPORT DETECTION
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // COUNTER ANIMATION
  useEffect(() => {
    if (!started) return;

    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const currentValue = progress * end;

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [started, end, duration]);

  return (
    <span
      ref={ref}
      className={`number-font ${className}`}
    >
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default Counter;