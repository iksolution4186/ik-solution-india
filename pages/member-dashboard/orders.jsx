import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "@/firebase.config"; // import your Firebase config file here

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, "orders");
      const ordersQuery = query(ordersCollection);

      const ordersSnapshot = await getDocs(ordersQuery);
      const ordersData = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(ordersData);
    };

    fetchOrders();
  }, []);

  return (
    <div className="container px-4 py-4 mx-auto mt-24">
      <h1 className="mb-4 text-2xl font-bold">Orders</h1>
      <div className="grid grid-cols-3 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="p-4 bg-white shadow-md">
            <p className="text-gray-500">Order ID: </p>
            <p className="text-lg font-bold">name</p>
            <p className="text-gray-500">desc</p>
            <p className="text-gray-500">Quantity: </p>
            <p className="text-gray-500">Price: </p>
            {/* <p className="text-gray-500">Order ID: {order.id}</p>
            <p className="text-lg font-bold">{order.productName}</p>
            <p className="text-gray-500">{order.description}</p>
            <p className="text-gray-500">Quantity: {order.quantity}</p>
            <p className="text-gray-500">Price: {order.price}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
