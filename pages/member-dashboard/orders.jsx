import { useContext, useEffect, useState } from "react";
import { collection, query, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase.config"; // import your Firebase config file here
import Loading from "@/components/Loading";
import { MyContext } from "@/assets/userContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useContext(MyContext);
  useEffect(() => {
    const fetchOrders = async () => {
      const ordersDoc = doc(db, "orders", user.uid);

      const ordersSnapshot = await getDoc(ordersDoc);
      const ordersData = ordersSnapshot.data()?.orders?.map((order) => ({
        id: doc.id,
        ...order,
      }));
      console.log(ordersData);
      setOrders(ordersData);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container px-4 py-4 mx-auto mt-24">
      <h1 className="mb-4 text-2xl font-bold">Orders</h1>
      <div className="grid grid-cols-3 gap-4">
        {orders?.map((order) => (
          <div key={order} className="p-4 bg-white shadow-md">
            <p className="text-gray-500">Order ID: {order.id}</p>
            <p className="text-lg font-bold">Product: WhatsApp package</p>
            <p className="text-gray-500">Quantity: {order.messageCount}</p>
            <p className="text-gray-500">Price: ₹{order.price}</p>
            <p className="text-gray-500">Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
