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
  // This is a change
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
                href={"/admin-dashboard"}
                className={"hover:text-primary h-full flex items-center"}
              >
                Members
              </Link>
            </li>

            <li>
              <Link
                href={"/admin-dashboard/campaigns"}
                className={"hover:text-primary h-full flex items-center"}
              >
                Campaigns
              </Link>
            </li>
            <li>
              <Link
                href={"/admin-dashboard/products"}
                className={"hover:text-primary h-full flex items-center"}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href={"/admin-dashboard/orders"}
                className={"hover:text-primary h-full flex items-center"}
              >
                Orders
              </Link>
            </li>

            <li className="flex items-center ">
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
          </ul>
        </nav>
      </header>{" "}
    </div>
  );
};

export default Header;
