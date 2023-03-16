import Navbar from "@/components/Navbar/Navbar";
import { UserProvider } from "@/context/UserContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Navbar/>
      <Component {...pageProps} />
    </UserProvider>
  );
}
