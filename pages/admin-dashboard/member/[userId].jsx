import React, { useContext, useEffect } from "react";
import { db } from "@/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { MyContext } from "@/assets/userContext";
import { useRouter } from "next/router";
const User = (props) => {
  const user = useContext(MyContext);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    if (user?.email === "mkg@admin.in") {
      console.log("Welcome Admin");
    } else {
      router.push("/login");
      setTimeout(() => {
        alert("unauthorised");
      }, 2000);
    }
  }, []);
  return (
    <div className="min-h-screen pt-24 bg-gradient-to-l from-primary to-tertiary">
      <div className="max-w-lg px-4 py-6 mx-auto mt-8 bg-white rounded-lg shadow-lg bg-gradient-to-l from-primary to-tertiary ">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{props.name}&apos;s Account</h2>
          <p className="text-gray-600">Registered on {props.RegisteredDate}</p>
        </div>
        <div className="py-4 border-t border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Email</p>
            <p className="text-gray-800">{props.email}</p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Phone Number</p>
            <p className="text-gray-800">{props.phone}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">WhatsApp Balance</p>
            <p className="text-gray-800">{props.WhatsAppBalance}</p>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default User;

export async function getServerSideProps(context) {
  const { userId } = context.query;
  try {
    const docRef = doc(db, "users", userId);
    const currentDoc = await getDoc(docRef);
    return {
      props: currentDoc.data(),
    };
  } catch (error) {
    console.log(error);
  }
}
