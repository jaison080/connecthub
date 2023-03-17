import { Footer, Navbar } from "@/components";
import { UserProvider } from "@/context/UserContext";
import "@/styles/globals.css";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
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
  const theme = createTheme({
    palette: {
      primary: {
        main: "#a6432d",
      },
      secondary: {
        main: "#f5f5f5",
      },
    },
    typography: {
      allVariants: {
        fontFamily: "Poppins",
        textTransform: "none",
        color: "#a6432d",
      },
    },
  });

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Toaster />
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
      </ThemeProvider>
    </UserProvider>
  );
}
