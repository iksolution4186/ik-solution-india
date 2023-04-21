import { useContext, useState } from "react";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { arrayUnion, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase.config";
import { useRouter } from "next/router";
import { MyContext } from "@/assets/userContext";

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mobileNumbers, setMobileNumbers] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const user = useContext(MyContext);
  const router = useRouter();

  const handleDataSubmission = async (uid) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // note that getMonth() returns 0 for January, 1 for February, etc.
    let day = currentDate.getDate();
    const numLines = mobileNumbers.split("\n").length;
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const imageUrl = await getDownloadURL(storageRef);
        const form = {
          id: uid,
          title,
          description,
          url,
          mobileNumbers,
          RegisteredDate: day + "/" + month + "/" + year,
          imageUrl,
          Messages: numLines,
          CampaignStatus: "pending",
        };
        // You can save the form data to Firestore or Realtime Database
        try {
          const formRef = doc(db, "wapps", user.uid);
          const docSnap = await getDoc(formRef);
          // await updateDoc()
          if (docSnap.exists()) {
            await updateDoc(formRef, {
              campaigns: arrayUnion(form),
            });
          } else {
            await setDoc(formRef, {
              campaigns: [form],
            });
          }
          router.push("/member-dashboard");
          // console.log("Form data saved successfully with ID: ", docRef.id);
        } catch (error) {
          alert(error.message);
          console.log(error);
        }
      }
    );
  };

  async function handleSubmit(event) {
    event.preventDefault();

    let uid = generateRegistrationId().toString();
    let docRef = doc(db, "users", uid);
    let docSnap = await getDoc(docRef);

    while (docSnap.exists()) {
      uid = generateRegistrationId().toString();
      docRef = doc(db, "users", uid);
      docSnap = await getDoc(docRef);
    }
    handleDataSubmission(uid);
  }

  function generateRegistrationId() {
    // Generate a random 6-digit number between 100000 and 999999
    return Math.floor(Math.random() * 900000) + 100000;
  }

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen mx-5 mt-24 mb-32">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-bold text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="mobile-numbers"
          className="block mb-2 font-bold text-gray-700"
        >
          Mobile Numbers
        </label>
        <textarea
          id="mobile-numbers"
          value={mobileNumbers}
          onChange={(e) => setMobileNumbers(e.target.value)}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          required
          placeholder="Enter Mobile Numbers like
          8872960014 
          7973994038
          9888610086"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="url" className="block mb-2 font-bold text-gray-700">
          URL
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block mb-2 font-bold text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block mb-2 font-bold text-gray-700">
          Image
        </label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus :shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <progress value={progress} max="100" className="w-full"></progress>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
