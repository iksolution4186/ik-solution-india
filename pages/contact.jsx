import React, { useState } from "react";
import Image from "next/image";
import logo from "../assets/ik_logo.webp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    sendEmail();
  }
  async function sendEmail() {
    const data = {
      firstName,
      lastName,
      email,
      message,
    };
    try {
      const res = await axios.post("/api/contact", data);
      console.log(res);
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
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
    <div className=" bg-gradient-to-r from-tertiary to-primary  px-16 py-24 mt-20  md:pt-36 sm:px-4 sm:pb-16  max-w-[1535px] xlmin:mx-auto lg:px-8 lg:py-16 ">
      <ToastContainer />
      <div className="flex items-center justify-center gap-8 md:flex-col">
        <div className="flex-1 left_section md:w-[90vw]  w-full h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3412.29343744183!2d76.14569697480034!3d31.212598762284745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391ab91d8232262f%3A0x6fd6e57c3c8284!2sIK%20SOLUTION%20%7C%20Web%20Development%20%7C%20Digital%20Marketing%20%7C%20Bulk%20SMS%20%7C%20Print%20Media%20Services%20%7C%20E-Media%20Services!5e0!3m2!1sen!2sin!4v1682663210230!5m2!1sen!2sin"
            className="w-full  md:h-[300px] border-none h-[95vh]"
            loading="lazy"
          ></iframe>
        </div>
        <div className="flex-1 right_section md:w-[90vw] sm:w-full bg-white rounded-lg shadow-md p-4">
          <form
            className="flex flex-col gap-4 px-4 py-8 md:p-0"
            onSubmit={handleSubmit}
          >
            <strong className="text-3xl font-normal ">Contact Us</strong>
            <p>
              We’re waiting on standby to elevate your business in the digital
              world. Share with us your questions.
            </p>
            <div className="flex flex-1 gap-4 first_last_name sm:flex-col">
              <label
                htmlFor="first-name"
                className="flex flex-col flex-1 gap-2"
              >
                First Name
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  placeholder="e.g. Karan"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="p-2 border border-gray-300 "
                />
              </label>
              <label htmlFor="last-name" className="flex flex-col flex-1 gap-2">
                Last Name
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  placeholder="e.g. Badhan"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="p-2 border border-gray-300 "
                />
              </label>
            </div>
            <label htmlFor="email" className="flex flex-col gap-2">
              Email Address
              <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. example@gmail.com"
                className="p-2 border border-gray-300 "
              />
            </label>

            <label htmlFor="message" className="flex flex-col gap-2">
              Message
              <textarea
                name="message"
                id="message"
                required
                cols="30"
                rows="5"
                placeholder="Tell us about your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-2 border border-gray-300 "
              ></textarea>{" "}
            </label>
            <button
              type="submit"
              className="w-32 p-2 transition-all duration-300 border rounded text-tertiary bg-secondary border-secondary hover:text-secondary hover:border-primary hover:bg-gradient-to-l from-primary to-tertiary"
            >
              SEND
            </button>
          </form>
        </div>{" "}
      </div>
    </div>
  );
};

export default Contact;
