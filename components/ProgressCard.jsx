import React from "react";

const ProgressCard = ({ step, title, desc }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-100 shadow-lg service_card ">
      <strong className="text-5xl text-gray-700">{step}</strong>
      <h2 className="text-2xl text-bold">{title}</h2>
      <p className="text-sm">{desc}</p>
    </div>
  );
};

export default ProgressCard;
