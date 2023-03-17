import {
  About,
  AdditionalDetails,
  Details,
  Hero,
  MoreDetails,
} from "@/components";
import Loader from "@/components/Loader/Loader";
import { UserContext } from "@/context/UserContext";
import CustomTitle from "@/utils/customTitle";
import { useContext } from "react";

export default function Home() {
  const { loading } = useContext(UserContext);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <CustomTitle title={"Home"} />
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
