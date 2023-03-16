import {
  About,
  AdditionalDetails,
  Details,
  Hero,
  MoreDetails,
} from "@/components";

export default function Home() {
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
