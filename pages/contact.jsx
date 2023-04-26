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
    <div className="flex items-center justify-center bg-gradient-to-r from-tertiary to-primary gap-8 px-16 py-24 mt-20 md:flex-col sm:px-4 sm:pb-16 sm:pt-6 max-w-[1535px] xlmin:mx-auto lg:px-8 lg:py-16 ">
      <ToastContainer />
      <div className="flex-1 left_section md:w-[90vw]  sm:w-full h-full">
        <Image src={logo} alt="company logo" className="w-full h-full" />
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
            <label htmlFor="first-name" className="flex flex-col flex-1 gap-2">
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
      </div>
    </div>
  );
};

export default Contact;
