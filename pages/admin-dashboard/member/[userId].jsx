import React, { useContext, useEffect } from "react";
import { db } from "@/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { MyContext } from "@/assets/userContext";
import { useRouter } from "next/router";
const User = ({ name }) => {
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
  return <div className="h-screen mx-5 mt-32 mb-10">{name}</div>;
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
