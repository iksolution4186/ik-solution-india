import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase.config";
import Image from "next/image";
import {
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { MyContext } from "@/assets/userContext";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const user = useContext(MyContext);
  const router = useRouter();

  useEffect(() => {
    const collectionRef = collection(db, "wapps");
    if (!user) {
      router.push("/login");
    }
    console.log(user, "from campaingns");
    if (user?.email == "mkg@admin.in") {
      console.log("Welcome Admin");
    } else {
      router.push("/login");
      setTimeout(() => {
        alert("unauthorised");
      }, 2000);
    }
    onSnapshot(collectionRef, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      console.log("Current users in collection:", users);
      setUsers(users);
    });
  }, [user, router]);

  const deleteUser = async (id) => {
    const userRef = doc(collection(db, "wapps"), id);
    await deleteDoc(userRef);
  };
  const updateUser = async (id, updatedUser) => {
    const userRef = doc(collection(db, "wapps"), id);
    await updateDoc(userRef, updatedUser);
    setEditingUser(null);
  };

  return (
    <div className="container mx-auto mt-32 mb-10 w-fit">
      <h2 className="mb-4 text-2xl font-medium text-center">Admin Dashboard</h2>
      <nav className="text-center">i AM NAV</nav>
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
            {users.map((user) => (
              <tr key={user.caption}>
                {editingUser?.id === user.id ? (
                  <>
                    <td className="px-4 py-2 border"> {user.RegisteredDate}</td>
                    <td className="px-4 py-2 border">{user.title}</td>
                    <td className="px-4 py-2 border">{user.Messages}</td>
                    <td className="px-4 py-2 border">
                      <select
                        name="campaign status"
                        id="campaign status"
                        defaultValue={user.CampaignStatus}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            CampaignStatus: e.target.value,
                          })
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="pending">Rejected</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 border">
                      download file / download img
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                        onClick={() => updateUser(user.id, editingUser)}
                      >
                        Save
                      </button>
                      <button
                        className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
                        onClick={() => setEditingUser(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2 border"> {user.RegisteredDate}</td>
                    <td className="px-4 py-2 border">{user.title}</td>
                    <td className="px-4 py-2 border">{user.Messages}</td>
                    <td className="px-4 py-2 border">{user.CampaignStatus}</td>
                    <td className="px-4 py-2 border">
                      download file / download img
                    </td>

                    <td className="px-4 py-2 border ">
                      <button
                        className="px-4 py-2 mr-2 font-bold text-white rounded bg-secondary hover:bg-primary hover:text-secondary"
                        onClick={() => setEditingUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
