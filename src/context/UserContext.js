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
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [mutualFriends, setMutualFriends] = useState([]);
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

  useEffect(() => {
    getAllPosts();
    getAllUsers();
  }, []);

  //Google Sign In Of Firebase
  async function signInWithGoogle() {
    signInWithPopup(auth, provider).catch((error) => {
      return error;
    });
  }

  //Get All Posts
  async function getAllPosts() {
    setLoading(true);
    const response = await axios.get("/api/post");
    if (response.status === 200) {
      setPosts(response.data);
      setLoading(false);
    }
  }

  //Get All Users
  async function getAllUsers() {
    setLoading(true);
    const response = await axios.get("/api/user");
    if (response.status === 200) {
      setUsers(response.data);
      setLoading(false);
      return response.data;
    }
  }

  async function getMutualFriends(id) {
    if (signedInUser) {
      setLoading(true);
      const accessToken = await signedInUser.getIdToken();
      const response = await axios.post(
        "/api/user/friends/mutual",
        {
          friendId: id,
        },
        {
          headers: {
            "x-auth-token": accessToken,
          },
        }
      );
      if (response.status === 200) {
        setMutualFriends(response.data.data);
        setLoading(false);
        return response.data.data;
      }
    }
  }
  async function getPostsbyUserId(id) {
    setLoading(true);
    let temp = [];
    posts.find((post) => {
      if (post.creator._id === id) {
        temp.push(post);
      }
    });
    setUserPosts(temp);
    setLoading(false);
    return;
  }

  return (
    <UserContext.Provider
      value={{
        profile,
        loading,
        posts,
        users,
        userPosts,
        signedInUser,
        mutualFriends,
        signInWithGoogle,
        signOutOfGoogle,
        getMutualFriends,
        getPostsbyUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
