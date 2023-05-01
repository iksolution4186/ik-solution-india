import IndustrailCard from "@/components/IndustrailCard";
import React from "react";
import courses from "@/assets/courses";

const IndustrialTraining = () => {
  return (
    <div className="min-h-screen pt-32 pb-16 sm:pt-44 xlmin:m-auto max-w-[1535px] gradient-primary">
      {" "}
      <h2 className="pb-12 text-3xl font-bold text-center">
        {" "}
        IndustrialTraining (With Live Projects)
      </h2>
      <div className="grid grid-cols-4 gap-4 sm:w-auto sm:p-2 w-[90%] m-auto place-items-center courses lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
        {courses.map((course) => {
          return (
            <IndustrailCard
              key={course.id}
              courseName={course.courseName}
              courseDuration={course.courseDuration}
              courseDesc={course.courseDesc}
              courseImage={course.courseImage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default IndustrialTraining;
