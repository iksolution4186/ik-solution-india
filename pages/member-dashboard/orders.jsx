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
    <div className="container min-h-screen px-4 py-4 pt-32 mx-auto bg-gradient-to-l from-primary to-tertiary">
      <h1 className="mb-4 text-3xl font-bold text-center">Your Orders</h1>
      {!orders ? (
        <div className="flex items-center justify-center h-[50vh] ">
          <strong className="p-4 text-2xl bg-white rounded">No Orders</strong>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 ">
          {orders?.map((order) => (
            <div key={order} className="p-4 bg-black rounded shadow-md">
              <p className="text-gray-200">Order ID: {order.id}</p>
              <p className="text-lg text-white ">
                Product: <span className="font-bold"> WhatsApp package</span>
              </p>
              <p className="text-gray-200">Quantity: {order.messageCount}</p>
              <p className="text-gray-200">Price: ₹{order.price}</p>
              <p className="text-primary">Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
