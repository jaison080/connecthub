import {
  About,
  AdditionalDetails,
  Details,
  Hero,
  MoreDetails,
} from "@/components";
import CustomTitle from "@/utils/customTitle";

export default function Home() {
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
