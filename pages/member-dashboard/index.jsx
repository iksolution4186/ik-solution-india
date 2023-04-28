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
import ImageDownloadButton from "@/components/ImageDownloadImage";
import { CSVLink } from "react-csv";

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const user = useContext(MyContext);

  console.log(user);

  useEffect(() => {
    const docRef = doc(db, "wapps", user?.uid);
    const userRef = doc(db, "users", user?.uid);
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
          console.log(docSnap.data());
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

  // const deleteUser = async (id) => {
  //   const userRef = doc(collection(db, "products"), id);
  //   await deleteDoc(userRef);
  // };
  // const updateUser = async (id, updatedUser) => {
  //   const userRef = doc(collection(db, "products"), id);
  //   await updateDoc(userRef, updatedUser);
  //   setEditingUser(null);
  // };

  return (
    <>
      {!campaigns && !userData ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-gradient-to-l from-primary to-tertiary xlmin:m-auto max-w-[1535px]">
          <div className="container w-full pt-32 pb-10 mx-auto ">
            <h2 className="mb-4 text-2xl font-medium text-center">
              Member Dashboard
            </h2>

            <div className="overflow-x-scroll mt-10  w-[95vw] mx-auto  ">
              <table className="w-full ">
                <caption className="mb-16">
                  <div className="max-w-lg px-4 py-6 mx-auto bg-white rounded-lg shadow-lg bg-gradient-to-l from-primary to-tertiary ">
                    <div className="flex items-center justify-between mb-4 text-center">
                      <p className="w-full font-bold text-gray-900 ">
                        Your Whatsapp balance is -{" "}
                        <span className="text-[1.2rem] text-black">
                          {" "}
                          {userData?.WhatsAppBalance}
                        </span>
                      </p>
                    </div>
                    <div className="py-4 border-t border-b border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <Link
                          href={"/member-dashboard/request-messages"}
                          className="p-[5px] transition-all duration-300 border rounded w-fit text-tertiary bg-secondary border-secondary hover:text-secondary hover:border-primary hover:bg-gradient-to-l from-primary to-tertiary"
                        >
                          Request More Messages
                        </Link>
                        <div>
                          <Link
                            href="/member-dashboard/wapp-send"
                            className="p-[7px] transition-all duration-300 border rounded w-fit text-tertiary bg-secondary border-secondary hover:text-secondary hover:border-primary hover:bg-gradient-to-l from-primary to-tertiary"
                          >
                            Add New Campaigns
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </caption>
                <thead>
                  <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Caption</th>
                    <th className="px-4 py-2">Total Message</th>
                    <th className="px-4 py-2">Campaign Status</th>
                    <th className="px-4 py-2 ">Download Details</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!campaigns ? (
                    <div className="absolute flex items-center justify-center w-full text-center h-[100px]">
                      <strong className="p-2 text-2xl rounded">
                        No Campaigns
                      </strong>
                    </div>
                  ) : (
                    <>
                      {campaigns?.campaigns?.map((campaign, index) => (
                        <tr key={campaign}>
                          <td className="px-4 py-2 border">
                            {" "}
                            {campaign.RegisteredDate}
                          </td>
                          <td className="px-4 py-2 capitalize border">
                            {campaign.title}
                          </td>
                          <td className="px-4 py-2 border">
                            {campaign.Messages}
                          </td>
                          <td className="px-4 py-2 font-bold capitalize border">
                            {campaign.CampaignStatus}
                          </td>
                          <td className=" px-4 py-2 border w-[300px] ">
                            <CSVLink
                              data={[campaigns.campaigns[index]]}
                              className="p-[7px] transition-all duration-300 border rounded w-fit text-tertiary bg-secondary border-secondary hover:text-secondary hover:border-primary hover:bg-gradient-to-l from-primary to-tertiary"
                            >
                              Export data
                            </CSVLink>{" "}
                            <ImageDownloadButton
                              imageUrl={campaign.imageUrl}
                              fileName={"Campaign Picture"}
                            />
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>{" "}
        </div>
      )}
    </>
  );
};

export default Dashboard;
