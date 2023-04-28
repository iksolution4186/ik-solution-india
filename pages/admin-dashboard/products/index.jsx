import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase.config";
import Image from "next/image";
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
    const collectionRef = collection(db, "products");
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
    onSnapshot(collectionRef, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      console.log("Current users in collection:", users);
      setUsers(users);
    });
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
    <div className="min-h-screen bg-gradient-to-l from-primary to-tertiary">
      <div className="container w-full pt-32 pb-10 mx-auto">
        <h2 className="mb-4 text-2xl font-medium text-center">
          Admin Dashboard
        </h2>
        <div className="text-center">
          <Link
            href="/admin-dashboard/products/add-new-product"
            className="px-4 py-2 mr-2 text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
          >
            Add New Products
          </Link>
        </div>
        <div className="overflow-x-scroll mt-10  lg:w-[95vw] m-auto">
          <table className="w-full ">
            <thead>
              <tr>
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Delete / Edit</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border">{user.id}</td>
                  {editingUser?.id === user.id ? (
                    <>
                      <td className="px-4 py-2 border">
                        <Image
                          src={user.image}
                          alt="product image"
                          width={"100"}
                          height={"100"}
                        />
                      </td>
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
                          defaultValue={user.price}
                          className="w-24"
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              price: e.target.value,
                            })
                          }
                        />
                      </td>

                      <td className="flex gap-4 px-4 py-2 border sm:gap-2 ">
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
                      <td className="px-4 py-2 border">
                        {" "}
                        <Image
                          src={user.image}
                          alt="product image"
                          width={"100"}
                          height={"100"}
                        />
                      </td>
                      <td className="px-4 py-2 border">{user.name}</td>
                      <td className="px-4 py-2 border">{user.price}</td>

                      <td className="flex gap-4 px-4 py-2 border sm:gap-2 ">
                        <button
                          className="px-4 py-2 mr-2 text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
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
      </div>{" "}
    </div>
  );
};

export default Dashboard;
