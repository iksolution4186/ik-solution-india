import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase.config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link.js";
import { MyContext } from "@/assets/userContext.js";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const user = useContext(MyContext);
  console.log(user);

  const handleLogin = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("sign up");
        if (user?.email == "mkg@admin.in") {
          console.log("if");
          router.push("admin-dashboard");
        } else {
          router.push("member-dashboard");
        }
      })
      .catch((error) => {
        console.log("from error");
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8 bg-gradient-to-l from-primary to-tertiary">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Log In
            </h2>
          </div>
          <form className="mt-8 space-y-6 " onSubmit={handleLogin}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-[25%] text-[1.2rem]"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="p-4 mt-4 rounded-md bg-red-50">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v5a1 1 0 102 0v-5zm-1-2a1 1 0 011 1v.09l-.117.007a1 1 0 00-.876.876L9.09 7H9a1 1 0 110-2h2zm-1 12a1 1 0 110-2 1 1 0 010 2z"
                        clipRule="evenodd"
                      />{" "}
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Authentication Error
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      {errorMessage}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border rounded-md bg-secondary group hover:text-secondary hover:bg-gradient-to-l from-primary to-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-tertiary group-hover:text-secondary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm3.707 10.293a1 1 0 00-1.414-1.414l-2.293 2.293V6a1 1 0 10-2 0v5.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
            <div className="flex justify-between gap-4">
              <p>
                Not a member?{" "}
                <Link
                  href={"/signup"}
                  className="font-bold underline hover:opacity-80"
                >
                  Sign Up
                </Link>{" "}
              </p>
              <p className="">
                <Link
                  href="/password-reset"
                  className="font-medium hover:opacity-80"
                >
                  Forgot your password?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>{" "}
    </>
  );
};

export default LoginPage;
