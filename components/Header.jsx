import Link from "next/link";
import { useRouter } from "next/router";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdArrowRight,
} from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config.js";
import { MyContext } from "@/assets/userContext.js";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import logo from "../assets/ik_croped_logo.webp";

const Header = () => {
  const [hovered, setHovered] = useState(false);
  const [barToggle, setBarToggle] = useState(false);
  const [innerWidth, setInnerWidth] = useState();
  const router = useRouter();
  const path = router.asPath;
  const user = useContext(MyContext);
  function logOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("signed out");
        router.push("/login");
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  }
  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleInnerWidth() {
      setInnerWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleInnerWidth);

    return () => {
      window.removeEventListener("resize", handleInnerWidth);
    };
  }, [innerWidth]);

  useEffect(() => {
    setBarToggle(false);
    setHovered(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [path]);

  return (
    <div className="fixed top-0 z-10 w-full h-20 bg-secondary">
      <header className=" flex justify-between w-full h-20 px-16 md:p-8 lg:px-8 bg-secondary text-tertiary md:items-center sm:px-4 m-auto max-w-[1535px]  ">
        <div className="flex items-center logo">
          <Link href={"/"} className="flex ">
            <Image src={logo} alt="comapany logo" className="h-10 w-14 " />
            <strong className="mt-2 text-2xl font-normal uppercase text-tertiary">
              Solution
            </strong>
          </Link>
        </div>
        {barToggle ? (
          <RxCross1
            onClick={() => setBarToggle(!barToggle)}
            className={"scale-150 hidden md:block"}
          />
        ) : (
          <RxHamburgerMenu
            onClick={() => setBarToggle(!barToggle)}
            className={"scale-150 hidden md:block"}
          />
        )}

        <nav
          className={`md:absolute md:border-b-primary md:border-b-4 md:top-20 md:left-0 md:w-full md:py-8 md:px-6 md:bg-secondary md:h-auto ${
            barToggle ? "md:block" : "md:hidden"
          } `}
        >
          <ul className="flex h-full gap-8 md:flex-col md:gap-4">
            <li>
              <Link
                href={"/"}
                className={"hover:text-primary h-full flex items-center"}
              >
                Home
              </Link>
            </li>

            <div
              className={
                " flex items-center gap-1 h-full relative md:static md:flex-col md:items-start "
              }
              onMouseEnter={() => innerWidth >= 822 && setHovered(true)}
              onMouseLeave={() => innerWidth >= 822 && setHovered(false)}
              onClick={() => innerWidth <= 822 && setHovered(!hovered)}
            >
              <span className="flex items-center gap-1 hover:text-primary">
                {" "}
                Services
                {hovered ? (
                  <MdOutlineKeyboardArrowDown className="text-lg" />
                ) : (
                  <MdOutlineKeyboardArrowUp className="text-lg" />
                )}{" "}
              </span>
              <>
                <div
                  className={`services_nav  ${
                    hovered
                      ? " py-6 px-5 absolute top-16 flex left-[-6vw]  flex-col w-64 gap-4 border-primary border-l-2 border-r-2 border-b-2 bg-secondary  rounded-lg md:static md:border md:ml-4 md:my-4 "
                      : "hidden"
                  }`}
                  onMouseEnter={() => innerWidth >= 822 && setHovered(true)}
                  onMouseLeave={() => innerWidth >= 822 && setHovered(false)}
                >
                  <li>
                    <Link
                      href={"/services/web-development"}
                      className="flex items-center transition-all duration-300 hover:text-primary hover:scale-110 md:hover:transform-none "
                    >
                      {" "}
                      {innerWidth > 822 && (
                        <MdArrowRight className="text-2xl" />
                      )}{" "}
                      Web Development
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/services/app-development"}
                      className="flex items-center transition-all duration-300 hover:text-primary hover:scale-110 md:hover:transform-none "
                    >
                      {" "}
                      {innerWidth > 822 && (
                        <MdArrowRight className="text-2xl" />
                      )}{" "}
                      App Development
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/services/digital-marketing"}
                      className="flex items-center transition-all duration-300 hover:text-primary hover:scale-110 md:hover:transform-none "
                    >
                      {" "}
                      {innerWidth > 822 && (
                        <MdArrowRight className="text-2xl" />
                      )}{" "}
                      Digital Marketing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/services/seo-sem-smm"}
                      className="flex items-center transition-all duration-300 hover:text-primary hover:scale-110 md:hover:transform-none "
                    >
                      {" "}
                      {innerWidth > 822 && (
                        <MdArrowRight className="text-2xl" />
                      )}{" "}
                      SEO/SEM/SMM
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/services/graphic-designing"}
                      className="flex items-center transition-all duration-300 hover:text-primary hover:scale-110 md:hover:transform-none "
                    >
                      {" "}
                      {innerWidth > 822 && (
                        <MdArrowRight className="text-2xl" />
                      )}{" "}
                      Graphic/Logo Designing
                    </Link>
                  </li>
                </div>
              </>
            </div>

            <li>
              <Link
                href={"/about-us"}
                className={"hover:text-primary h-full flex items-center"}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href={"/contact"}
                className={"hover:text-primary h-full flex items-center"}
              >
                Contact Us
              </Link>
            </li>
            <li className="flex items-center ">
              <a
                href={"#footer"}
                onClick={() => setBarToggle(false)}
                className={
                  " w-fit border border-tertiary p-2 rounded hover:text-secondary transition-all duration-300 hover:bg-primary"
                }
              >
                Quick Message
              </a>
            </li>
            <li className="flex items-center md:hidden">
              {user ? (
                <button
                  className={
                    " flex items-center w-fit border border-tertiary p-2 rounded hover:text-secondary transition-all duration-300 hover:bg-primary"
                  }
                  onClick={logOut}
                >
                  Log Out
                </button>
              ) : (
                <Link
                  href={"/login"}
                  className={
                    " flex items-center w-fit border border-tertiary p-2 rounded hover:text-secondary transition-all duration-300 hover:bg-primary"
                  }
                >
                  Log In
                </Link>
              )}
            </li>
            <li className="flex items-center md:hidden ">
              {user?.email == "mkg@admin.in" ? (
                <Link
                  className={
                    " flex items-center w-fit border border-tertiary p-2 rounded hover:text-secondary transition-all duration-300 hover:bg-primary"
                  }
                  href={"/admin-dashboard"}
                >
                  Dashboard
                </Link>
              ) : (
                user && (
                  <Link
                    className={
                      " flex items-center w-fit border border-tertiary p-2 rounded hover:text-secondary transition-all duration-300 hover:bg-primary"
                    }
                    href={"/member-dashboard"}
                  >
                    Dashboard
                  </Link>
                )
              )}
            </li>
          </ul>
        </nav>
      </header>{" "}
      <div className="hidden w-full bg-black border-t border-white md:py-4 md:px-8 sm:p-4 md:flex md:gap-4">
        <li className="text-white list-none ">
          {user ? (
            <button
              className={
                " flex items-center w-fit border border-tertiary p-2 rounded hover:text-secondary transition-all duration-300 hover:bg-primary"
              }
              onClick={logOut}
            >
              Log Out
            </button>
          ) : (
            <Link
              href={"/login"}
              className={
                " flex items-center w-fit border border-tertiary p-2 rounded hover:text-secondary transition-all duration-300 hover:bg-primary"
              }
            >
              Log In
            </Link>
          )}
        </li>{" "}
        <li className="hidden text-white list-none md:block ">
          {user?.email == "mkg@admin.in" ? (
            <Link
              className={
                " flex items-center w-fit border border-tertiary p-2 rounded hover:text-secondary transition-all duration-300 hover:bg-primary"
              }
              href={"/admin-dashboard"}
            >
              Dashboard
            </Link>
          ) : (
            user && (
              <Link
                className={
                  " flex items-center w-fit border border-tertiary p-2 rounded hover:text-secondary transition-all duration-300 hover:bg-primary"
                }
                href={"/member-dashboard"}
              >
                Dashboard
              </Link>
            )
          )}
        </li>
      </div>
    </div>
  );
};

export default Header;
