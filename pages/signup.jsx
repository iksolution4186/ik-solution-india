import React, { useState } from "react";
import { db } from "../firebase.config";
import { auth } from "../firebase.config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // note that getMonth() returns 0 for January, 1 for February, etc.
    let day = currentDate.getDate();

    let uid = generateRegistrationId().toString();
    let docRef = doc(db, "users", uid);
    let docSnap = await getDoc(docRef);

    while (docSnap.exists()) {
      uid = generateRegistrationId().toString();
      docRef = doc(db, "users", uid);
      docSnap = await getDoc(docRef);
    }

    const signUpData = {
      name,
      email,
      phone,
      password,
      status: true,
      RegisteredDate: day + "/" + month + "/" + year,
      WhatsAppBalance: 0,
    };
    handleDataSubmission(uid, signUpData);

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
  };

  const handleDataSubmission = async (uid, signUpData) => {
    try {
      const userRef = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userRef.user.uid;
      console.log(uid);
      await setDoc(doc(db, "users", uid), signUpData);

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      alert("User signed up successfully");
      router.push("/member-dashboard");
    } catch (error) {
      alert(error.message);
    }
  };
  function generateRegistrationId() {
    // Generate a random 6-digit number between 100000 and 999999
    return Math.floor(Math.random() * 900000) + 100000;
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-4 pt-24 pb-12 md:mt-24 bg-gradient-to-l from-primary to-tertiary ">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md sm:p-4">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Sign Up
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                  placeholder="Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
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
                  autoComplete="new-password"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
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
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            </div>

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
                Sign Up
              </button>
            </div>
            <div>
              <p>
                Already a member?{" "}
                <Link
                  href={"/login"}
                  className="font-bold underline hover:opacity-50"
                >
                  Log In
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>{" "}
    </>
  );
};

export default SignUpPage;
