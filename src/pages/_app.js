
import { Footer, Navbar } from "@/components";
import { UserProvider } from "@/context/UserContext";
import "@/styles/globals.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);
  return (
    <UserProvider>
      <Toaster/>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "space-between",
        }}
      >
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </UserProvider>
  );
}
