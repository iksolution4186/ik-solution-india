import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";

import { db } from "@/firebase.config";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Upload image to Firebase Storage
    const storageRef = ref(getStorage(), `images/${image.name}`);
    await uploadBytes(storageRef, image);

    // Add Download Url
    const downloadURL = await getDownloadURL(storageRef);

    // Add product to Firestore
    const productRef = doc(db, "products", name);
    const newProduct = {
      id: name,
      name,
      price,
      image: downloadURL,
    };
    await setDoc(productRef, newProduct);

    setLoading(false);
    // router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="mx-5 mt-32 mb-10">
      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700" htmlFor="name">
          Name
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
          Price
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
          Image
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
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        type="submit"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
