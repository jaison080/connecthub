import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { UserProvider } from "@/context/UserContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
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
