import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const currentYear = new Date().getFullYear();

  function handleSubmit(e) {
    e.preventDefault();
    sendEmail();
  }
  async function sendEmail() {
    const data = {
      email,
      message,
    };
    try {
      const res = await axios.post("/api/quick-message", data);
      console.log(res);
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
    <footer
      id="footer"
      className="flex flex-col gap-8 px-16 py-10 bg-secondary text-tertiary lg:px-8 sm:px-4"
    >
      <ToastContainer />
      <div className="grid grid-cols-4 gap-8 top md:grid-cols-2 sm:grid-cols-1 sm:gap-8 sm:m-0 m-auto max-w-[1535px] ">
        <div className="contact_us ">
          <strong className="text-lg font-medium">Contact Us</strong>
          <ul className="flex flex-col gap-3 pt-5">
            <li>
              1st floor near Orobite , Bela - Behrampur road, Garhshankar, Distt. Hoshiarpur, Punjab, Pin – 144527
            </li>
            <li>Email: iksolution4186@gmail.com</li>
            <li>Tel: +91 83604-74290</li>
            <li>Tel: 01884501838</li>
          </ul>
        </div>
        <div className="services">
          <strong className="text-lg font-medium">Services</strong>
          <ul className="flex flex-col gap-3 pt-5 ">
            <li>
              <Link
                className="transition-all duration-300 hover:text-primary"
                href={"/services/web-development"}
              >
                Web Development
              </Link>
            </li>
            <li>
              <Link
                className="transition-all duration-300 hover:text-primary"
                href={"/services/app-development"}
              >
                App Development
              </Link>
            </li>
            <li>
              <Link
                className="transition-all duration-300 hover:text-primary"
                href={"/services/digital-marketing"}
              >
                Digital Marketing
              </Link>
            </li>
            <li>
              <Link
                href={"/services/seo-sem-smm"}
                className=" hover:text-primary"
              >
                SEO/SEM/SMM
              </Link>
            </li>
            <li>
              <Link
                href={"/services/graphic-designing"}
                className=" hover:text-primary"
              >
                {" "}
                Graphic/Logo Designing
              </Link>
            </li>
          </ul>
        </div>
        <div className="others ">
          <strong className="text-lg font-medium ">Others</strong>
          <ul className="flex flex-col gap-3 pt-5 ">
            <li>
              <Link
                className="transition-all duration-300 hover:text-primary"
                href={"/about-us"}
              >
                About Company
              </Link>
            </li>
            <li>
              <Link
                className="transition-all duration-300 hover:text-primary"
                href={"/contact"}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md Quick Message md:row-start-1 md:row-end-2 md:col-start-2 md:col-end-3 sm:col-auto">
          <strong className="text-lg font-medium text-black ">
            Quick Message
          </strong>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 pt-5 text-black sm:max-w-xs"
          >
            <input
              type="email"
              placeholder="Email"
              className="p-2 border border-gray-300 rounded"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              name="message"
              id="message"
              value={message}
              cols={10}
              rows={4}
              placeholder="Message "
              className="p-2 border border-gray-300 rounded"
              required
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="px-4 py-2 mr-2 font-bold text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
            >
              Send
            </button>
          </form>
        </div>
      </div>
      <div className="text-center bottom m-auto max-w-[1535px] text-primary">
        <p>© {currentYear} Ik Solution. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
