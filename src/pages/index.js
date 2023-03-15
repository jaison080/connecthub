import { UserContext } from "@/context/UserContext";
import { Inter } from "next/font/google";
import { useContext } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { signInWithGoogle, profile, loading, signOutOfGoogle } =
    useContext(UserContext);
  return (
    <>
      {profile ? (
        <>
          <h2>{profile.email}</h2>
          <button onClick={signOutOfGoogle}>Sign Out</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
      {loading ? <h3>Loading....</h3> : ""}
    </>
  );
}
