import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase.config";
import Link from "next/link";
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
    const collectionRef = collection(db, "users");
    if (!user) {
      router.push("/login");
    }
    console.log(user);
    if (user?.email === "mkg@admin.in") {
      console.log("Welcome Admin");
    } else {
      router.push("/login");
      console.log("else");
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
    const userRef = doc(collection(db, "users"), id);
    await deleteDoc(userRef);
  };
  const updateUser = async (id, updatedUser) => {
    const userRef = doc(collection(db, "users"), id);
    await updateDoc(userRef, updatedUser);
    setEditingUser(null);
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
                <th className="px-4 py-2">Member Id</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">WAPP Balance</th>
                <th className="px-4 py-2">Active</th>
                <th className="px-4 py-2">Details</th>
                <th className="px-4 py-2">Delete / Edit</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border">{user.id}</td>
                  {editingUser?.id === user.id ? (
                    <>
                      <td className="px-4 py-2 border">
                        <input
                          type="text"
                          className="w-24"
                          defaultValue={user.name}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              name: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          type="text"
                          defaultValue={user.phone}
                          className="w-24"
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              phone: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          type="text"
                          className="w-24"
                          defaultValue={user.WhatsAppBalance}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              WhatsAppBalance: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <select
                          name="status"
                          id="status"
                          defaultValue={user.status ? "yes" : "no"}
                          onChange={(e) => {
                            setEditingUser({
                              ...editingUser,
                              status: e.target.value == "yes" ? true : false,
                            });
                          }}
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 border">
                        <Link
                          href={`admin-dashboard/member/${user.id}`}
                          className="px-4 py-2 mr-2 font-bold text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
                        >
                          view
                        </Link>
                      </td>
                      <td className="px-4 py-2 border">
                        <button
                          className="px-4 py-2 mr-2 text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
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
                      <td className="px-4 py-2 border">{user.name}</td>
                      <td className="px-4 py-2 border">{user.phone}</td>
                      <td className="px-4 py-2 border">
                        {user.WhatsAppBalance}
                      </td>
                      <td className="px-4 py-2 font-bold border ">
                        {user.status ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2 border">
                        <Link
                          href={`admin-dashboard/member/${user.id}`}
                          className="px-4 py-2 mr-2 font-bold text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
                        >
                          view
                        </Link>
                      </td>

                      <td className="px-4 py-2 border ">
                        <button
                          className="px-4 py-2 mr-2 font-bold text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
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
    </div>
  );
};

export default Dashboard;
