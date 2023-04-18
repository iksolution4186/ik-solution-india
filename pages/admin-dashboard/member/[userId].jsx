import React from "react";
import { db } from "@/firebase.config";
import { doc, getDoc } from "firebase/firestore";
const User = ({ name }) => {
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
