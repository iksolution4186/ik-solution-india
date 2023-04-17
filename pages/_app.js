import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const pathname = router.pathname;
  const hideHeaderFooter = router.pathname === "/get-quote";
  return (
    <>
      <Head>
        <title>Ik Solution - USA</title>
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
      {!hideHeaderFooter && <Header />}
      <Component {...pageProps} />
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
