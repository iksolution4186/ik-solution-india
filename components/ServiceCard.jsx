import React from "react";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

const ServiceCard = ({ Logo, title, desc, serviceUrl }) => {
  return (
    <div className="flex flex-col gap-3 p-4 transition-all duration-300 bg-gray-100 shadow-lg service_card hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r from-tertiary to-primary">
      <div className="p-2 text-4xl bg-gray-200 text-pri w-fit ">{Logo}</div>
      <h2 className="text-[1.2rem] font-bold">{title}</h2>
      <p className="text-1xl ">{desc}</p>
      <Link
        href={serviceUrl}
        className="flex items-center gap-1 py-1 pl-2 transition-all duration-300 border rounded w-fit text-tertiary bg-secondary border-secondary hover:text-secondary hover:border-primary hover:bg-gradient-to-r from-tertiary to-primary"
      >
        Read More <MdKeyboardArrowRight className="text-[1.2rem]" />
      </Link>
    </div>
  );
};

export default ServiceCard;
