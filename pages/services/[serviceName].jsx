import React from "react";

import { AiFillCheckCircle } from "react-icons/ai";
import Link from "next/link";
import Engage from "@/components/Engage";
import ProgressCard from "@/components/ProgressCard";
import serviceDescription from "@/assets/serviceDescription";
const ServiceDetail = ({ currentService }) => {
  if (!currentService) {
    return <p>loading...</p>;
  } else {
    return (
        <>
          {currentService.map((service) => {
            return (
                <div className="service_detail" key={service.title}>
                  <div className="flex items-center justify-center min-h-[70vh] mt-20 landing bg-gradient-to-r from-primary to-tertiary ">
                    <div className="flex flex-col items-center w-[70vw] h-full gap-8 text-center landing_inside sm:w-[95vw] xs:w-full ">
                      <h2 className="text-5xl font-bold leading-[3.75rem]  md:text-3xl ">
                        {service.title}
                      </h2>
                      <p className="text-1xl w-[80%] sm:w-[90%]">
                        {service.subTitle}
                      </p>
                      <Link
                          href={"/get-quote"}
                          className="w-32 p-2 transition-all duration-300 border rounded hover:scale-110 border-secondary hover:bg-gradient-to-r from-primary to-tertiary hover:border-primary"
                      >
                        Let&apos;s Start
                      </Link>
                    </div>
                  </div>
                  {service.path.map((path) => {
                    return (
                        <section
                            className="flex flex-col justify-center min-h-screen gap-4 px-16 max-w-[1535px] m-auto py-10 bg-gradient-to-r from-gray-100 to-gray-300 services_path lg:px-8 sm:px-4 sm:py-10"
                            key={path.title}
                        >
                          <strong className="text-2xl font-normal">
                            {path.title}
                          </strong>
                          <strong className="w-10/12 text-4xl sm:w-full md:text-3xl">
                            {path.subTitle}
                          </strong>
                          <p>{path.desc}</p>
                          <div className="grid grid-cols-3 gap-8 mt-6 services_progress_cards md:grid-cols-2 sm:grid-cols-1">
                            {path.cardsData.map((cardData) => {
                              return (
                                  <ProgressCard
                                      key={cardData.id}
                                      step={cardData.id}
                                      desc={cardData.desc}
                                      title={cardData.title}
                                  />
                              );
                            })}
                          </div>
                        </section>
                    );
                  })}
                  {service.products.map((product) => {
                    return (
                        <section
                            className="min-h-[400px] flex justify-center items-center flex-col max-w-[1535px] m-auto   px-16 py-10 gap-8 tech_those_can_be_created bg-gradient-to-r from-gray-300 to-gray-100 lg:px-8  sm:px-4 sm:py-10"
                            key={product.title}
                        >
                          <div className="flex flex-col flex-1 gap-4 text-center top_section ">
                            <strong className="m-auto text-4xl sm:w-full md:text-3xl">
                              {product.title}
                            </strong>
                            <p>{product.desc}</p>
                          </div>
                          <div className="grid flex-1 grid-cols-3 gap-8 right_section md:grid-cols-2 sm:grid-cols-1 ">
                            {product.cardsData.map((cardData) => {
                              return (
                                  <div
                                      key={cardData.title}
                                      className="flex flex-col items-center gap-4 p-8 text-center bg-gray-100 shadow-lg lg:p-4 sm:px-4 sm:py-8"
                                  >
                                    <AiFillCheckCircle className="text-5xl text-gray-600" />
                                    <strong className="text-2xl ">
                                      {cardData.title}{" "}
                                    </strong>
                                    <p className="sm:text-justify ">{cardData.desc}</p>
                                  </div>
                              );
                            })}
                          </div>
                        </section>
                    );
                  })}
                  <Engage />
                </div>
            );
          })}
        </>
    );
  }
};

export default ServiceDetail;

export async function getStaticPaths() {
  const paths = [
    {
      params: { serviceName: "web-development" },
    },
    {
      params: { serviceName: "app-development" },
    },
    {
      params: { serviceName: "digital-marketing" },
    },
    {
      params: { serviceName: "seo-sem-smm" },
    },
    {
      params: { serviceName: "graphic-designing" },
    },
    {
      params: { serviceName: "erp-sf" },
    },
    {
      params: { serviceName: "erp-zoho" },
    },
  ];

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { params } = context;

  const currentServiceFinder = serviceDescription
      .filter((service) => {
        return service.for === params.serviceName;
      })
      .map((service) => service);

  return {
    props: {
      currentService: currentServiceFinder,
    },
  };
}
