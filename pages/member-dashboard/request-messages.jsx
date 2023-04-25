import { useContext, useEffect, useState } from "react";
import {
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@/firebase.config";
import { MyContext } from "@/assets/userContext";

const OrderForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [notes, setNotes] = useState("");

  const user = useContext(MyContext);

  function generateRegistrationId() {
    // Generate a random 6-digit number between 100000 and 999999
    return Math.floor(Math.random() * 9000000000) + 1000000000;
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    let uid = generateRegistrationId().toString();
    let docRef = doc(db, "orders", uid);
    let docSnap = await getDoc(docRef);

    while (docSnap.exists()) {
      uid = generateRegistrationId().toString();
      docRef = doc(db, "orders", uid);
      docSnap = await getDoc(docRef);
    }
    handleDataSubmission(uid);
  }

  const handleDataSubmission = async (uid) => {
    const price = (messageCount / 100000) * 20000;
    const order = {
      id: uid,
      name,
      email,
      phone,
      messageCount,
      notes,
      price,
      status: "pending",
      // createdAt: serverTimestamp(),
    };

    try {
      const orderRef = doc(db, "orders", user.uid);
      const docSnap = await getDoc(orderRef);

      if (docSnap.exists()) {
        await updateDoc(orderRef, {
          orders: arrayUnion(order),
        });
      } else {
        await setDoc(orderRef, {
          orders: [order],
        });
      }
      // const orderDocRef = doc(db, "orders", user.uid);
      // await updateDoc(orderDocRef, {
      //   orders: arrayUnion(order),
      // });
      alert("Your order has been placed!");
      setName("");
      setEmail("");
      setPhone("");
      setMessageCount(0);
      setNotes("");
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while placing your order. Please try again later."
      );
    }
  };

  return (
    <div className="bg-gradient-to-l from-primary to-tertiary">
      <form
        onSubmit={handleFormSubmit}
        className="max-w-md pt-24 pb-32 mx-auto "
      >
        <caption className="block mb-4 text-3xl font-bold ">
          Order Messages
        </caption>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-bold text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-bold text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 font-bold text-gray-700">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="messageCount"
            className="block mb-2 font-bold text-gray-700"
          >
            Message Count:
          </label>
          <input
            type="number"
            id="messageCount"
            name="messageCount"
            value={messageCount}
            onChange={(event) => setMessageCount(parseInt(event.target.value))}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="notes" className="block mb-2 font-bold text-gray-700">
            Additional Notes/Instructions:
          </label>
          <textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        <div className="flex">
          <button
            type="submit"
            className="p-3 transition-all duration-300 border rounded w-fit text-tertiary bg-secondary border-secondary hover:text-secondary hover:border-primary hover:bg-gradient-to-l from-primary to-tertiary"
          >
            Place Order
          </button>
        </div>
      </form>{" "}
    </div>
  );
};

export default OrderForm;
