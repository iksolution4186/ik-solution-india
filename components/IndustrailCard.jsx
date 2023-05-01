import Image from "next/image";
import React from "react";

const IndustrailCard = ({
  courseName,
  courseDuration,
  courseDesc,
  courseImage,
}) => {
  return (
    <div className="flex flex-col  gap-2 mb-4 h-96 sm:w-[90vw]  bg-white p-2 rounded shadow-lg">
      <Image src={courseImage} alt="Course Image" className="h-[50%]" />
      <h3 className="font-bold ">{courseName}</h3>
      <p>{courseDuration}</p>
      <p>{courseDesc}</p>
      <a href="tel:+919915552880" className="p-2 mb-4 btn-primary">
        Register Now!
      </a>
    </div>
  );
};

export default IndustrailCard;
