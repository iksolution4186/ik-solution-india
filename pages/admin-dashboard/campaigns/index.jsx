import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase.config";
import Image from "next/image";
import { CSVLink } from "react-csv";

import {
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  arrayRemove,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { MyContext } from "@/assets/userContext";
import { useRouter } from "next/router";
import ImageDownloadButton from "@/components/ImageDownloadImage";
import Loading from "@/components/Loading";

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const user = useContext(MyContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = collection(db, "wapps");
    if (!user) {
      router.push("/login");
    }

    if (user?.email == "mkg@admin.in") {
      console.log("Welcome Admin");
    } else {
      router.push("/login");
      setTimeout(() => {
        alert("unauthorised");
      }, 2000);
    }

    onSnapshot(collectionRef, (querySnapshot) => {
      const campaignsDummyArr = [];
      querySnapshot.forEach((doc) => {
        campaignsDummyArr.push({ id: doc.id, ...doc.data() });
      });

      setCampaigns(campaignsDummyArr);
      setLoading(false);
    });
  }, [user, router]);

  if (loading) {
    return <Loading />;
  }

  const deleteCampaign = async (id, element_index) => {
    const campaignRef = doc(collection(db, "wapps"), id);
    const campaignSnapshot = await getDoc(campaignRef);
    const campaignData = campaignSnapshot.data();
    await updateDoc(campaignRef, {
      campaigns: arrayRemove(campaignData.campaigns[element_index]),
    });
  };
  const updateCampaign = async (id, updatedCampaign, index) => {
    const campaignRef = doc(collection(db, "wapps"), id);
    const campaignSnapshot = await getDoc(campaignRef);
    const campaignData = campaignSnapshot.data();

    // Update the specific array element at the given index
    campaignData.campaigns[index] = updatedCampaign;

    // Update the document in Firestore
    await setDoc(campaignRef, campaignData);
    setEditingCampaign(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-primary to-tertiary">
      <div className="container pt-32 pb-10 mx-auto w-fit ">
        <h2 className="mb-4 text-2xl font-medium text-center">
          Admin Dashboard
        </h2>

        <div className="overflow-x-scroll mt-10  w-[95vw]">
          <table className="w-full ">
            <thead>
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Caption</th>
                <th className="px-4 py-2">Total Message</th>
                <th className="px-4 py-2">Campaign Status</th>
                <th className="px-4 py-2">Download Details</th>
                <th className="px-4 py-2">Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {campaigns?.map((campaignArr) => (
                <>
                  {campaignArr.campaigns.map((campaign, index) => {
                    return (
                      <tr key={campaign.title}>
                        {editingCampaign?.id === campaign.id ? (
                          <>
                            <td className="px-4 py-2 border">
                              {" "}
                              {campaign.RegisteredDate}
                            </td>
                            <td className="px-4 py-2 border">
                              {campaign.title}
                            </td>
                            <td className="px-4 py-2 border">
                              {campaign.Messages}
                            </td>
                            <td className="px-4 py-2 border">
                              <select
                                name="campaign status"
                                id="campaign status"
                                defaultValue={campaign.CampaignStatus}
                                onChange={(e) =>
                                  setEditingCampaign({
                                    ...editingCampaign,
                                    CampaignStatus: e.target.value,
                                  })
                                }
                              >
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                                <option value="delivered">Delivered</option>
                              </select>
                            </td>
                            <td className="px-4 py-2 border">
                              <CSVLink
                                data={[campaignArr.campaigns[index]]}
                                className="px-4 py-2 mr-2 text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
                              >
                                Export data
                              </CSVLink>{" "}
                              <ImageDownloadButton
                                imageUrl={campaign.imageUrl}
                                fileName={"Campaign Picture"}
                                className="px-4 py-2 mr-2 font-bold text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
                              />
                            </td>
                            <td className="px-4 py-2 border">
                              <button
                                className="px-4 py-2 mr-2 text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
                                onClick={() =>
                                  updateCampaign(
                                    campaignArr.id,
                                    editingCampaign,
                                    index
                                  )
                                }
                              >
                                Save
                              </button>
                              <button
                                className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
                                onClick={() => setEditingCampaign(null)}
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
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
                            <td className="flex px-4 py-2 border">
                              <CSVLink
                                data={[campaignArr.campaigns[index]]}
                                className="px-4 py-2 mr-2 text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
                              >
                                Export data
                              </CSVLink>{" "}
                              <ImageDownloadButton
                                className="px-4 py-2 mr-2 font-bold text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
                                imageUrl={campaign.imageUrl}
                                fileName={"Campaign Picture"}
                              />
                            </td>

                            <td className="px-4 py-2 border ">
                              <button
                                className="px-4 py-2 mr-2 text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
                                onClick={() => setEditingCampaign(campaign)}
                              >
                                Edit
                              </button>
                              <button
                                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                                onClick={() =>
                                  deleteCampaign(campaignArr.id, index)
                                }
                              >
                                Delete
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>{" "}
    </div>
  );
};

export default Dashboard;
