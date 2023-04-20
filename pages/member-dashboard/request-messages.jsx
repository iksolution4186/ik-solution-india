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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const order = {
      name,
      email,
      phone,
      messageCount,
      notes,
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
    <form onSubmit={handleFormSubmit} className="max-w-md mx-auto mt-32 mb-4">
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

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Place Order
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
