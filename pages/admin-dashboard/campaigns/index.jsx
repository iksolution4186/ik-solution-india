import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase.config";
import * as XLSX from "xlsx";
import { CSVLink } from "react-csv";

import {
  onSnapshot,
  collection,
  doc,
  arrayRemove,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { MyContext } from "@/assets/userContext";
import { useRouter } from "next/router";
import ImageDownloadButton from "@/components/ImageDownloadImage";
import Loading from "@/components/Loading";

const generateExcel = (data) => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

  let maxLength = 0;
  const range = XLSX.utils.decode_range(worksheet["!ref"]);

  for (let row = range.s.r; row <= range.e.r; row++) {
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
      const cell = worksheet[cellAddress];

      if (cell && cell.v && cell.v.length > maxLength) {
        maxLength = cell.v.length;
      }
    }
  }

  const characterLimit = 200;

  if (maxLength > characterLimit) {
    const rowsToAdd = Math.ceil(maxLength / characterLimit) - 1;

    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        const cell = worksheet[cellAddress];

        if (cell && cell.v && cell.v.length > characterLimit) {
          const cellValue = cell.v;
          const rowSpan = Math.ceil(cellValue.length / characterLimit);
          const currentRowIndex = row + 1;

          // Shift existing rows down to accommodate the additional rows
          for (let i = 0; i < rowsToAdd; i++) {
            const newRow = currentRowIndex + i;
            XLSX.utils.sheet_shiftRows(
              worksheet,
              newRow,
              worksheet["!rows"].length,
              1,
              { origin: newRow }
            );
          }

          // Split the cell value into chunks and write them to the worksheet
          let rowIndex = currentRowIndex;
          for (let i = 0; i < rowSpan; i++) {
            const chunk = cellValue.substring(
              i * characterLimit,
              (i + 1) * characterLimit
            );
            const currentCellAddress = XLSX.utils.encode_cell({
              r: rowIndex,
              c: col,
            });
            worksheet[currentCellAddress] = { t: "s", v: chunk };
            rowIndex++;
          }

          // Clear the original cell value
          cell.v = "";
        }
      }
    }
  }

  const excelFile = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "buffer",
  });

  return excelFile;
};

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
      console.log(campaignsDummyArr);
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

  const handleDownload = (object) => {
    const excelFile = generateExcel([object]);
    const blob = new Blob([excelFile], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "campaign.xlsx";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-primary to-tertiary">
      <div className="container w-full pt-32 pb-10 mx-auto ">
        <h2 className="mb-4 text-2xl font-medium text-center">
          Admin Dashboard
        </h2>

        <div className="overflow-x-scroll mt-10  lg:w-[95vw] m-auto">
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
            <tbody className="bg-white">
              {campaigns?.map((campaignArr) => (
                <>
                  {campaignArr.campaigns.map((campaign, index) => {
                    return (
                      <tr key={campaign.id}>
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
                            <td className="flex gap-4 px-4 py-2 border sm:gap-2 ">
                              <CSVLink
                                // onClick={() =>
                                //   handleDownload(campaignArr.campaigns[index])
                                // }
                                data={[campaignArr.campaigns[index]]}
                                className="px-4 md:w-[120px] py-2 mr-2 text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
                              >
                                Export data
                              </CSVLink>{" "}
                              <ImageDownloadButton
                                imageUrl={campaign.imageUrl}
                                fileName={"Campaign Picture"}
                                className="px-4 py-2 mr-2 font-bold text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
                              />
                            </td>
                            <td className="px-4 py-2 border ">
                              <span
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
                              </span>
                              <span
                                className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
                                onClick={() => setEditingCampaign(null)}
                              >
                                Cancel
                              </span>
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
                            <td className="flex gap-4 px-4 py-2 border sm:gap-2">
                              <CSVLink
                                // onClick={() =>
                                // handleDownload(campaignArr.campaigns[index])
                                data={[campaignArr.campaigns[index]]}
                                // }
                                className="px-4 md:w-[120px] py-2 mr-2 text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
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
                              <span
                                className="px-4 py-2 mr-2 text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
                                onClick={() => setEditingCampaign(campaign)}
                              >
                                Edit
                              </span>
                              <span
                                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                                onClick={() =>
                                  deleteCampaign(campaignArr.id, index)
                                }
                              >
                                Delete
                              </span>
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
