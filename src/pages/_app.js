import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { UserProvider } from "@/context/UserContext";
import "@/styles/globals.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);
  return (
    <UserProvider>
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
