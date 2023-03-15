import { Inter } from "next/font/google";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { app } from "../utils/firebaseFront";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  async function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        //console.log(result);
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // console.log(token);
        const user = result.user;
        console.log(user);
        console.log(user.accessToken);
        return result;
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        return error;
      });
  }
  return (
    <>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  );
}
