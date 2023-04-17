import React from "react";
import Link from "next/link";
import ServiceCard from "../components/ServiceCard";
import Engage from "@/components/Engage";
import tagData from "@/assets/tagData";
import servicesData from "@/assets/services";
const Home = () => {
  return (
    <div>
      <section className="flex items-center justify-center min-h-screen px-16 lg:px-8 mt-20 md:py-10 xs:p-2 landing bg-secondary lg:min-h-[70vh]  bg-gradient-to-r from-primary to-tertiary">
        <div className="flex flex-col items-center w-[70vw] sm:w-[95vw] xs:w-full h-full gap-8 text-center  landing_inside text-black">
          <h2 className="text-5xl font-bold leading-[3.75rem]  md:text-3xl ">
            Innovative solutions for the Digital age
          </h2>
          <p className="text-1xl w-[80%] sm:w-[90%]">
            At our company, we believe that technology should work for you, not
            the other way around. That&apos;s why we create innovative solutions
            that simplify your digital world and help you achieve your goals
            with ease
          </p>
          <Link
            href={"/get-quote"}
            className="w-32 p-2 transition-all duration-300 border rounded hover:scale-110 border-secondary hover:bg-gradient-to-r from-primary to-tertiary hover:border-primary"
          >
            Let&apos;s Start
          </Link>
        </div>
      </section>
      <section className="flex flex-col justify-center max-w-[1535px] min-h-screen gap-4 px-16 py-10 bg-gradient-to-r from-gray-100 to-gray-300 m-auto home_services sm:px-4 sm:py-10 lg:px-8">
        <h1 className="text-2xl uppercase sm:text-[1.2rem]">
          We offer a range of tailored business solutions
        </h1>
        <strong className="w-10/12 text-3xl md:w-full sm:text-2xl ">
          Our customer centric approaches ensures that our solutions align with
          your business objectives and values.
        </strong>
        <div className="grid grid-cols-3 gap-8 mt-6 md:grid-cols-2 sm:grid-cols-1 services_cards">
          {servicesData.map((service) => {
            return (
              <ServiceCard
                key={service.title}
                Logo={service.serviceImg}
                desc={service.desc}
                title={service.title}
                serviceUrl={service.serviceUrl}
              />
            );
          })}
        </div>
      </section>
      <section className="min-h-[70vh] flex justify-center  max-w-[1535px] m-auto lg:px-8 items-center gap-8 bg-gradient-to-r from-gray-300 to-gray-100 md:flex-col md:gap-16 md:py-16  px-16 py-10 sm:px-4 sm:py-10 md:text-center ">
        <div className="flex flex-col flex-1 gap-4 left_section md:items-center ">
          <h3 className="text-2xl uppercase">Why IK Solution</h3>
          <strong className="text-[2.5rem] leading-[3.2rem] md:text-3xl">
            IK Solution provides Secure, efficient, and user-friendly software
            solutions
          </strong>
          <p>
            We know that choosing a software service provider can be a daunting
            task. That&apos;s why we&apos;re committed to making the process as
            easy and stress-free as possible.
          </p>
          <Link
            href={"/about-us"}
            className="p-2 transition-all duration-300 border rounded w-fit text-tertiary bg-secondary border-secondary hover:text-secondary hover:border-tertiary hover:bg-gradient-to-l from-gray-100 to-gray-300"
          >
            About Us
          </Link>{" "}
        </div>
        <div className="grid flex-1 grid-cols-2 gap-8 right_section md:items-center sm:grid-cols-1 ">
          {tagData.map((item) => {
            return (
              <div
                key={item.tabLine}
                className="flex flex-col items-center gap-4 p-8 text-center bg-gray-100 shadow-lg"
              >
                <div className="p-2 text-5xl bg-gray-200 text-pri w-fit">
                  {item.logo}
                </div>
                <p className="text-[17px] font-bold">{item.tabLine}</p>
              </div>
            );
          })}
        </div>
      </section>
      <Engage />
    </div>
  );
};

export default Home;
