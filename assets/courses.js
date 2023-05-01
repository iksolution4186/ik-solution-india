import htmlcss from "../assets/webp_images/html-css.webp";
import cpp from "../assets/webp_images/cpp.webp";
import js from "../assets/webp_images/js.webp";
import next_js from "../assets/webp_images/next-js.webp";
import node_js from "../assets/webp_images/node-js.webp";
import python from "../assets/webp_images/python.webp";
import react_js from "../assets/webp_images/react-js.webp";
import java from "../assets/webp_images/java.webp";

const courses = [
  {
    id: 1,
    courseName: "Html, Css",
    courseDuration: "3 Months",
    courseDesc:
      "It covers all the fundamentals that is needed to start your web development journey",
    courseImage: htmlcss,
  },
  {
    id: 2,
    courseName: "Javascript",
    courseDuration: "3 Months",
    courseDesc: "It covers all the basics and numerous advanced concepts ",
    courseImage: js,
  },
  {
    id: 3,
    courseName: "Frontend Development (ReactJs)",
    courseDuration: "4 - 6 Months",
    courseDesc:
      "It covers all the essentials of React we will take you from zero to industry ready",
    courseImage: react_js,
  },
  {
    id: 4,
    courseName: "C, C++",
    courseDuration: "3 Months",
    courseDesc:
      "This course focuses on the foundation and aims to build problem solving skills ",
    courseImage: cpp,
  },
  {
    id: 5,
    courseName: "Java",
    courseDuration: "3 Months",
    courseDesc:
      "Write once use everywhere, we will teach you all you need to get started with Java",
    courseImage: java,
  },
  {
    id: 6,
    courseName: "Python",
    courseDuration: "3 - 4  Months",
    courseDesc:
      "It covers all the fundamentals of this language and we will do various live projects",
    courseImage: python,
  },
  {
    id: 6,
    courseName: "Backend Devlopment (NodeJs)",
    courseDuration: "3 - 4 Months",
    courseDesc:
      "It covers backend html servers build using Express Js framework",
    courseImage: node_js,
  },
  {
    id: 6,
    courseName: "Frontend Devlopment (NextJs)",
    courseDuration: "3 - 5 Months",
    courseDesc:
      "We will learn about SSR,SSG which are essential for industry ready projects ",
    courseImage: next_js,
  },
];

export default courses;
