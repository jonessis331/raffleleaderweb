// src/components/CounterDraggable.js
import React, { useState, useEffect } from "react";

const CounterDraggable = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate - Date.now();
      if (difference > 0) {
        const timeLeft = {
          Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          Minutes: Math.floor((difference / (1000 * 60)) % 60),
          Seconds: Math.floor((difference / 1000) % 60),
        };
        setTimeLeft(
          Object.entries(timeLeft)
            .map(([unit, value]) => `${value} ${unit}`)
            .join(" ")
        );
      } else {
        setTimeLeft("Time's up!");
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return <div>{timeLeft}</div>;
};

export default CounterDraggable;
