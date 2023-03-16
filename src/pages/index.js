import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Home() {
  const { signInWithGoogle, profile, loading, signOutOfGoogle } =
    useContext(UserContext);
  return (
    <>
     <div>
      
     </div>
    </>
  );
}
