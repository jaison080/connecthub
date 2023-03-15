import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

function ProtectedRoute({ children }) {
  const { profile, loading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!profile && !loading) {
      router.push("/");
    }
  }, [profile, router, loading]);

  if (!profile) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
