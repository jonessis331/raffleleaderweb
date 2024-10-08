// src/components/CounterDraggable.js
import React, { useState, useEffect } from "react";

const CounterDraggable = ({ endDate, props }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate) - Date.now();
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

  return (
    <div
      style={{
        fontSize: `${props.fontSize}px`,
        color: props.color,
        fontWeight: props.fontWeight,
        fontStyle: props.fontStyle,
        textDecoration: props.textDecoration,
        fontFamily: props.fontFamily,
        letterSpacing: `${props.letterSpacing}px`,
        lineHeight: `${props.lineHeight}px`,
        textAlign: props.textAlign,
        display: "flex",
        alignItems: "center",
        justifyContent: props.textAlignMap?.[props.textAlign] || "flex-start",
        width: "100%",
        height: "100%",
        wordBreak: "break-word",
        overflowWrap: "break-word",
        whiteSpace: "pre-wrap",
      }}
    >
      {timeLeft}
    </div>
  );
};

export default CounterDraggable;
