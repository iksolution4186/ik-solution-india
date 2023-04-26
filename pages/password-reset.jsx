import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase.config.js";
import { useRouter } from "next/router.js";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
      router.push("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-l from-primary to-tertiary">
      <div className="px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-semibold">Password Reset</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg outline-none"
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <button className="px-4 py-2 mr-2 text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
