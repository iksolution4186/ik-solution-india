import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MyContext } from "@/assets/userContext";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config.js";
import "@/styles/globals.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading.jsx";
import AdminHeader from "@/components/AdminHeader.jsx";
import DashboardFooter from "@/components/DashboardFooter.jsx";
import MemberHeader from "@/components/MemberHeader.jsx";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const hideHeaderFooter = router.pathname === "/get-quote";
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const AdminHeaderPages = [
    "/admin-dashboard",
    "/admin-dashboard/products",
    "/admin-dashboard/campaigns",
    "/admin-dashboard/products/add-new-product",
  ];
  const MemberHeaderPages = [
    "/member-dashboard",
    "/member-dashboard/request-messages",
    "/member-dashboard/orders",
    "/member-dashboard/account",
  ];
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const showAdminHeader = AdminHeaderPages.includes(router.pathname);
  const showMemberHeader = MemberHeaderPages.includes(router.pathname);
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
      {isLoading ? (
        <Loading />
      ) : (
        <MyContext.Provider value={user}>
          {!hideHeaderFooter && !showAdminHeader && !showMemberHeader && (
            <Header />
          )}
          {showAdminHeader && <AdminHeader />}
          {showMemberHeader && <MemberHeader />}
          <Component {...pageProps} />
          {!hideHeaderFooter && !showAdminHeader && !showMemberHeader && (
            <Footer />
          )}
          {showAdminHeader || showMemberHeader ? <DashboardFooter /> : null}
        </MyContext.Provider>
      )}
    </>
  );
}
