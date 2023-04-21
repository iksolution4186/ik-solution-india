import React, { useEffect, useState, useContext } from "react";
import { db } from "../../firebase.config";
import { useRouter } from "next/router";
import { MyContext } from "@/assets/userContext";
import {
  collection,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import Link from "next/link";
import Loading from "@/components/Loading";

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const user = useContext(MyContext);

  console.log(user);

  useEffect(() => {
    const docRef = doc(db, "wapps", user.uid);
    const userRef = doc(db, "users", user.uid);
    console.log(user);
    if (!user) {
      router.push("/login");
    }
    async function getDocument() {
      try {
        const docSnap = await getDoc(docRef);
        const userSnap = await getDoc(userRef);
        if (docSnap.exists() || userSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setCampaigns(docSnap.data());
          console.log(userSnap.data());
          setUserData(userSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        alert(error.message);
      }
    }
    getDocument();
  }, []);

  const deleteUser = async (id) => {
    const userRef = doc(collection(db, "products"), id);
    await deleteDoc(userRef);
  };
  const updateUser = async (id, updatedUser) => {
    const userRef = doc(collection(db, "products"), id);
    await updateDoc(userRef, updatedUser);
    setEditingUser(null);
  };

  return (
    <>
      {!campaigns && !userData ? (
        <Loading />
      ) : (
        <div className="container mx-auto mt-32 mb-10 w-fit">
          <h2 className="mb-4 text-2xl font-medium text-center">
            Member Dashboard
          </h2>
          <div className="text-center">
            <Link href="/member-dashboard/wapp-send">Add New Campaigns</Link>
          </div>

          <div className="overflow-x-scroll mt-10  w-[95vw]">
            <table className="w-full ">
              <caption className="py-5 mb-4 text-2xl font-bold border border-secondary">
                Your Whatsapp balance is - {userData?.WhatsAppBalance}
                {"  "}{" "}
                <Link
                  href={"/member-dashboard/request-messages"}
                  className="font-normal"
                >
                  Request More Messages
                </Link>
              </caption>
              <thead>
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Caption</th>
                  <th className="px-4 py-2">Total Message</th>
                  <th className="px-4 py-2">Campaign Status</th>
                  <th className="px-4 py-2">Download Details</th>
                </tr>
              </thead>
              <tbody>
                {campaigns?.campaigns?.map((campaign) => (
                  <tr key={campaign}>
                    <td className="px-4 py-2 border">
                      {" "}
                      {campaign.RegisteredDate}
                    </td>
                    <td className="px-4 py-2 border">{campaign.title}</td>
                    <td className="px-4 py-2 border">{campaign.Messages}</td>
                    <td className="px-4 py-2 border">
                      {campaign.CampaignStatus}
                    </td>
                    <td className="px-4 py-2 border">
                      download file / download img
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
