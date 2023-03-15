import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import app from "../utils/firebaseFront";
import axios from "axios";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [profile, setProfile] = useState();
  const [signedInUser, setSignedInUser] = useState();
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  //On Auth State Changed Of Firebase
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedInUser(user);
        handleLogin();
      } else {
        setSignedInUser(null);
        setProfile(null);
        setLoading(false);
      }
    });
  }, [signedInUser]);


//Sign Out Function
  async function signOutOfGoogle() {
    signOut(auth)
      .then(() => {
        setSignedInUser(null);
        setProfile(null);
      })
      .catch((error) => {});
  }


//Fetch User Profile from DB
  async function fetchProfile() {
    try {
      if (signedInUser) {
        setLoading(true);
        const accessToken = await signedInUser.getIdToken();
        const response = await axios.get("/api/user/profile", {
          headers: {
            "x-auth-token": accessToken,
          },
        });
        if (response.status === 200) {
          setProfile(response.data.data);
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  //Login Function to be Executed After Google SIgn In
  async function handleLogin() {
    if (signedInUser) {
      setLoading(true);
      const accessToken = await signedInUser.getIdToken();
      try {
        await axios
          .get("/api/auth/login", {
            headers: {
              "x-auth-token": accessToken,
            },
          })
          .then(async (res) => {
            if (res.status === 200) {
              await fetchProfile();
            }
          });
      } catch (error) {
        //Have to fix this code
        await axios
          .post(
            "/api/auth/signup",
            {
              name: signedInUser.displayName,
            },
            {
              headers: {
                "x-auth-token": accessToken,
              },
            }
          )
          .then(async (res) => {
            if (res.status === 200) {
              await fetchProfile();
            }
          });
      } finally {
        setLoading(false);
      }
    }
  }

  //Google Sign In Of Firebase
  async function signInWithGoogle() {
    signInWithPopup(auth, provider).catch((error) => {
      return error;
    });
  }

  return (
    <UserContext.Provider
      value={{
        profile,
        loading,
        signInWithGoogle,
        signOutOfGoogle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
