import { useEffect, useState } from "react";
import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "@/firebase.config"; // import your Firebase config file here
import Loading from "@/components/Loading";
import Link from "next/link";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersData = ordersSnapshot?.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(ordersData[0].orders);
      setOrders(ordersData);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  async function savaStatus(id, index) {
    const orderRef = doc(collection(db, "orders"), id);
    const ordersSnapshot = await getDoc(orderRef);
    const ordersData = ordersSnapshot.data();

    // Update the specific array element at the given index
    ordersData.orders[index].status = status;

    // Update the document in Firestore
    await setDoc(orderRef, ordersData);
    alert("update Successfully");
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-l from-primary to-tertiary">
      <div className="container px-4 py-4 pt-24 mx-auto">
        <h1 className="mb-4 text-2xl font-bold text-center">Orders</h1>
        <div className="grid grid-cols-3 gap-4">
          {orders?.map((ordersArr) => (
            <div key={ordersArr.id}>
              {ordersArr.orders.map((order, index) => {
                return (
                  <div
                    key={order.id}
                    className="flex flex-col gap-4 p-4 bg-black shadow-md"
                  >
                    <p className="text-gray-200">Order ID: {order.id}</p>
                    <p className="text-lg font-bold text-white">
                      Product: WhatsApp package
                    </p>
                    <p className="text-gray-200">
                      Quantity: {order.messageCount}
                    </p>
                    <p className="text-gray-200">Price: ₹{order.price}</p>
                    <p className="text-gray-200">
                      Status:{" "}
                      <select
                        defaultValue={order.status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                        className="px-2 py-1 text-black rounded"
                      >
                        <option value="pending">Pending</option>
                        <option value="fulfilled">Fulfilled</option>
                      </select>
                      {status && (
                        <button
                          onClick={() => savaStatus(ordersArr.id, index)}
                          className="px-2 py-1 ml-4 mr-2 font-bold text-white border border-white rounded hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
                        >
                          Save Status
                        </button>
                      )}
                    </p>
                    <Link
                      href={`/admin-dashboard/member/${ordersArr.id}`}
                      className="px-4 py-2 mr-2 font-bold text-white border border-white rounded w-fit hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
                    >
                      View Member
                    </Link>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default Orders;
