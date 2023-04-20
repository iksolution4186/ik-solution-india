import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MyContext } from "@/assets/userContext";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config.js";
import "@/styles/globals.css";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const pathname = router.pathname;
  const hideHeaderFooter = router.pathname === "/get-quote";
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    console.log(user, "wrapper");

    return () => unsubscribe();
  }, []);
  return (
    <>
      <Head>
        <title>Ik Solution </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="We are a company of talented professionals
            dedicated to providing top-notch services in web development, app
            development, SEO, digital marketing, and graphic designing."
        />
        <meta
          name="keyword"
          content="web development, app
            development, SEO, digital marketing, and graphic designing"
        />
      </Head>
      <MyContext.Provider value={user}>
        {!hideHeaderFooter && <Header />}
        <Component {...pageProps} />
        {!hideHeaderFooter && <Footer />}
      </MyContext.Provider>
    </>
  );
}
