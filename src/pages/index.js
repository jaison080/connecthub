import About from "@/components/About/About";
import AdditionalDetails from "@/components/AdditionalDetails/AdditionalDetails";
import Details from "@/components/Details/Details";
import Hero from "@/components/Hero/Hero";
import MoreDetails from "@/components/MoreDetails/MoreDetails";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Home() {
  const { signInWithGoogle, profile, loading, signOutOfGoogle } =
    useContext(UserContext);
  return (
    <>
      <div>
        <Hero />
        <About />
        <Details />
        <MoreDetails />
        <AdditionalDetails />
      </div>
    </>
  );
}
