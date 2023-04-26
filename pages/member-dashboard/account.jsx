import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/assets/userContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase.config";

const AccountDataDisplay = () => {
  const user = useContext(MyContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const userDocRef = doc(db, "users", user?.uid);
      const userDoc = await getDoc(userDocRef);
      setUserData(userDoc.data());
    }

    fetchUserData();
  }, [user]);

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-l from-primary to-tertiary">
      <div className="max-w-lg px-4 py-6 mx-auto mt-8 bg-white rounded-lg shadow-lg bg-gradient-to-l from-primary to-tertiary ">
        {userData && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                {userData.name}&apos;s Account
              </h2>
              <p className="text-gray-600">
                Registered on {userData.RegisteredDate}
              </p>
            </div>
            <div className="py-4 border-t border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600">Email</p>
                <p className="text-gray-800">{userData.email}</p>
              </div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600">Phone Number</p>
                <p className="text-gray-800">{userData.phone}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">WhatsApp Balance</p>
                <p className="text-gray-800">{userData.WhatsAppBalance}</p>
              </div>
            </div>
          </>
        )}
      </div>{" "}
    </div>
  );
};

export default AccountDataDisplay;
