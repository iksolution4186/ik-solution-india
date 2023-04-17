import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Engage = () => {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    sendEmail();
  }
  async function sendEmail() {
    const data = {
      name,
      tel,
      email,
      message,
    };
    try {
      const res = await axios.post("/api/engage-message", data);
      console.log(res);
      setName("");
      setEmail("");
      setTel("");
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
    <section className="min-h-[70vh] bg-gradient-to-r from-tertiary to-primary hover:border-primary flex justify-center items-center md:flex-col  lg:px-8 px-16 py-10 gap-8 sm:px-4 m-auto max-w-[1535px] xlmin:h-fit">
      <div className="flex flex-col flex-1 gap-4 left_section md:w-[92vw] sm:w-auto  ">
        <ToastContainer />
        <h3 className="text-2xl">Message Us</h3>
        <strong className="w-10/12 text-4xl">
          Let&apos;s Transform your vision into reality
        </strong>
        <p>
          We believe that solution should be both powerful and need specific.
          That&apos;s why our team of experienced professionals works closely
          with clients to understand their specific needs and create custom
          solutions that are tailored to their business goals
        </p>
      </div>
      <div className="flex-[0.9]  right_section sm:flex-1 ">
        <form
          className="flex flex-col gap-4 px-8 py-12 bg-white border border-gray-300 md:w-[92vw] sm:w-[95vw] sm:px-5 sm:py-10 xs:w-[92vw] "
          onSubmit={handleSubmit}
        >
          <strong className="text-3xl font-normal text-center sm:text-2xl xs:text-[1.2rem]">
            Let&apos;s Talk
          </strong>
          <input
            type="text"
            name="full-name"
            id="full-name"
            placeholder="FULL NAME"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 placeholder:text-sm "
          />
          <input
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL ADDRESS"
            className="p-2 border border-gray-300 placeholder:text-sm "
          />
          <input
            type="tel"
            name="telephone-number"
            id="telephone-number"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            required
            placeholder="YOUR NUMBER"
            className="p-2 border border-gray-300 placeholder:text-sm "
          />
          <textarea
            name="project-detail"
            id="project-detail"
            required
            cols="30"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="TELL US ABOUT YOUR PROJECT"
            className="p-2 border border-gray-300 placeholder:text-sm "
          ></textarea>
          <button
            type="submit"
            className="p-3 transition-all duration-300 border rounded w-fit text-tertiary bg-secondary border-secondary hover:text-secondary hover:border-primary hover:bg-gradient-to-l from-primary to-tertiary"
          >
            Send The Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Engage;
