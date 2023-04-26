import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/ik_croped_logo.webp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Quote = () => {
  const [projectName, setProjectName] = useState("");
  const [projectBudget, setProjectBudget] = useState("");
  const [email, setEmail] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    sendEmail();
  }
  async function sendEmail() {
    const data = {
      projectName,
      projectBudget,
      email,
      projectDescription,
    };
    try {
      const res = await axios.post("/api/get-quote", data);
      console.log(res);
      setProjectName("");
      setProjectBudget("");
      setEmail("");
      setProjectDescription("");
      toast.success("Your message has been sent successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (err) {
      console.log(err);
      toast.error(
        "Sorry, we encountered an error while sending your message. Please email the message on support@iksoutionusa.com",
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        }
      );
    }
  }
  return (
    <div className="flex min-h-screen  gap-4 text-black get_quote md:flex-col max-w-[1535px] m-auto bg-gradient-to-l from-primary to-tertiary ">
      <div className="landing md:min-h-[40vh] p-4 bg-secondary text-tertiary flex flex-col gap-4 flex-[0.6] md:w-full lg:p-4 text-center ">
        <ToastContainer />
        <header className="top-0 left-0 xlmin:static md:fixed md:pl-4 md:py-4 md:pb-4 md:bg-black md:w-full">
          <div className="flex items-center logo">
            <Link href={"/"} className="flex ">
              <Image src={logo} alt="comapany logo" className="h-10 w-14 " />
              <strong className="mt-2 text-2xl font-normal uppercase text-tertiary">
                Solution
              </strong>
            </Link>
          </div>
        </header>

        <h2 className="mt-48 text-2xl md:mt-24">
          We are here to make your business grow
        </h2>
        <p className="text-1xl">
          Enhance your business with our smart digital solutions, which will
          make your business better stand out.
        </p>
      </div>
      <div className="flex flex-col flex-1 w-10/12 gap-3 m-auto my-8 mt-8 px-44 lg:px-8 xl:px-24 md:px-4 md:py-8 sm:w-full md:w-10/12 quote_form ">
        <h2 className="text-3xl font-bold">
          Please tell us about your project details
        </h2>
        <p>
          Give us the detail and we will change your imagination to reality{" "}
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 p-4 bg-white rounded-lg shadow-md"
        >
          <label htmlFor="project-name " className="flex flex-col gap-2">
            Project Name
            <input
              type="text"
              name="project-name"
              id="project-name"
              required
              className="p-2 border border-gray-300"
              placeholder="e.g. chat app"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </label>
          <label htmlFor="project-budget  " className="flex flex-col gap-2">
            Project Budget
            <input
              type="text"
              name="project-budget"
              id="project-budget"
              required
              className="p-2 border border-gray-300"
              placeholder="e.g. ₹10000"
              value={projectBudget}
              onChange={(e) => setProjectBudget(e.target.value)}
            />
          </label>
          <label htmlFor="project-budget  " className="flex flex-col gap-2">
            Email
            <input
              type="email"
              name="email"
              id="email"
              required
              className="p-2 border border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. example@example.com"
            />
          </label>
          <label htmlFor="project-details  " className="flex flex-col gap-2">
            Express your project
            <textarea
              name="project-detials"
              id="project-details"
              col={10}
              row={20}
              required
              className="p-2 border border-gray-300 h-[200px]"
              placeholder="Please describe your project"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="p-2 transition-all duration-300 border rounded w-fit text-tertiary bg-secondary border-secondary hover:text-secondary hover:border-primary hover:bg-gradient-to-l from-primary to-tertiary"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default Quote;
