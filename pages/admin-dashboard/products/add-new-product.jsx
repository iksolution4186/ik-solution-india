import { useContext, useEffect, useState } from "react";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";

import { db } from "@/firebase.config";
import { MyContext } from "@/assets/userContext";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = useContext(MyContext);

  useEffect(() => {
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
  }, []);

  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

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
    setLoading(true);

    // Upload image to Firebase Storage
    const storageRef = ref(getStorage(), `images/${image.name}`);
    await uploadBytes(storageRef, image);

    // Add Download Url
    const downloadURL = await getDownloadURL(storageRef);

    // Add product to Firestore
    const productRef = doc(db, "products", uid);
    const newProduct = {
      id: uid,
      name,
      price,
      image: downloadURL,
    };
    await setDoc(productRef, newProduct);

    setLoading(false);
    router.push("/admin-dashboard/products");
  };

  return (
    <div className="min-h-screen pt-32 pb-10 bg-gradient-to-l from-primary to-tertiary">
      <form
        onSubmit={handleFormSubmit}
        className="w-64 p-8 m-auto bg-white rounded-lg shadow-md min-w-[300px] sm:p-4 sm:w-[92vw]"
      >
        <caption className="block mb-4 font-bold text-[1.3rem]">
          Add New Product
        </caption>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="name">
            Product Name
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="price">
            Product Price
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="price"
            type="text"
            placeholder="Enter product price"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700" htmlFor="image">
            Product Image
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button
          className="px-4 py-2 mr-2 text-white rounded bg-secondary hover:bg-gradient-to-l from-primary to-tertiary hover:text-secondary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>{" "}
    </div>
  );
}
