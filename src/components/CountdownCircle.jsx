import React from "react";

const CountdownCircle = ({ countdown }) => {
  const radius = 40; // radio del círculo
  const circumference = 2 * Math.PI * radius;
  const offset = (countdown / 5) * circumference;

  const bgColor =
    countdown >= 3
      ? "rgb(74 222 128)"
      : countdown >= 2
      ? "rgb(250 204 21)"
      : "rgb(239 68 68)";

  return (
    <svg className="w-full h-full rotate40">
      <circle
        cx="50%"
        cy="50%"
        r={radius}
        fill="none"
        stroke={`${bgColor}`} // color de fondo completo del círculo
        strokeWidth="8"
      />
      <circle
        className="transition-all duration-300 ease-in-out"
        cx="50%"
        cy="50%"
        r={radius}
        fill="none"
        stroke="white" // color del vaciado (lo que parece vaciarse)
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
};

export default CountdownCircle;
