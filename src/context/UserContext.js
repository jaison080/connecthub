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
import { toast } from "react-hot-toast";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [profile, setProfile] = useState();
  const [signedInUser, setSignedInUser] = useState();
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
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
    } catch (error) {}
  }

  //Login Function to be Executed After Google SIgn In
  async function handleLogin() {
    if (signedInUser) {
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
              toast.success("Logged In Successfully");

              await fetchProfile();
            }
          });
      } catch (error) {
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
              toast.success("User Registered Successfully");
              await fetchProfile();
            }
          });
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
    const response = await axios.get("/api/post");
    if (response.status === 200) {
      setPosts(response.data);
    }
  }

  //Get All Users
  async function getAllUsers() {
    const response = await axios.get("/api/user");
    if (response.status === 200) {
      setUsers(response.data);
      setAllUsers(response.data);
      return response.data;
    }
  }

  //Get Mutual Friends
  async function getMutualFriends(id) {
    if (signedInUser) {
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
        return response.data.data;
      }
    }
  }

  //Get Posts By User Id
  async function getPostsbyUserId(id) {
    let temp = [];
    posts.find((post) => {
      if (post.creator._id === id) {
        temp.push(post);
      }
    });
    setUserPosts(temp);
    return;
  }

  //Check if User is Friend
  function isFriend(id) {
    if (signedInUser) {
      const friends = profile?.friends;
      if (friends) {
        const friend = friends.find((friend) => friend._id === id);
        if (friend) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  //Add Friend Function
  async function addFriend(id) {
    if (signedInUser) {
      const accessToken = await signedInUser.getIdToken();
      const response = await axios.post(
        "/api/user/friends/add",
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
        toast.success("Friend Added");
        getAllUsers();
        fetchProfile();

        return response.data;
      }
    }
    return false;
  }

  //Remove Friend Function
  async function removeFriend(id) {
    if (signedInUser) {
      const accessToken = await signedInUser.getIdToken();
      const response = await axios.post(
        "/api/user/friends/remove",
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
        toast.success("Friend Removed");
        getAllUsers();
        fetchProfile();

        return response.data;
      }
    }
    return false;
  }

  //Like Posts Function
  async function likePost(id) {
    if (signedInUser) {
      const accessToken = await signedInUser.getIdToken();
      const response = await axios.post(
        "/api/post/like/add",
        {
          postId: id,
        },
        {
          headers: {
            "x-auth-token": accessToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Post Liked");
        getAllUsers();
        getAllPosts();
        fetchProfile();
        return response.data;
      }
    }
    return false;
  }

  //Unlike Posts Function
  async function unlikePost(id) {
    if (signedInUser) {
      const accessToken = await signedInUser.getIdToken();
      const response = await axios.post(
        "/api/post/like/remove",
        {
          postId: id,
        },
        {
          headers: {
            "x-auth-token": accessToken,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Unliked Post");
        getAllUsers();
        getAllPosts();
        fetchProfile();

        return response.data;
      }
    }
    return false;
  }

  //Create Post
  async function createPost(title, content, image) {
    if (signedInUser) {
      const accessToken = await signedInUser.getIdToken();
      const response = await axios.post(
        "/api/post/create",
        {
          title,
          content,
          image,
        },
        {
          headers: {
            "x-auth-token": accessToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Post Created Successfully");
        getAllPosts();
        fetchProfile();
        return response.data;
      }
    }
    return false;
  }

  //Update Post
  async function updatePost(id, title, content, image) {
    if (signedInUser) {
      const accessToken = await signedInUser.getIdToken();
      const response = await axios.put(
        "/api/post/edit",
        {
          id,
          title,
          content,
          image,
        },
        {
          headers: {
            "x-auth-token": accessToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Post Edited Successfully");
        getAllPosts();
        fetchProfile();
        return response.data;
      }
    }
    return false;
  }

  //Update Profile
  async function updateProfile(id, name, bio, image) {
    if (signedInUser) {
      const accessToken = await signedInUser.getIdToken();
      const response = await axios.put(
        "/api/user/profile/edit",
        {
          id,
          name,
          bio,
          image,
        },
        {
          headers: {
            "x-auth-token": accessToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Profile Edited Successfully");
        fetchProfile();
        return response.data;
      }
    }
    return false;
  }

  //Delete Post
  async function deletePost(id) {
    if (signedInUser) {
      const accessToken = await signedInUser.getIdToken();
      const response = await axios.delete("/api/post/delete", {
        headers: {
          "x-auth-token": accessToken,
        },
        data: {
          id,
        },
      });
      if (response.status === 200) {
        toast.success("Post Deleted Successfully");
        getAllPosts();
        fetchProfile();
        return response.data;
      }
    }
    return false;
  }

  return (
    <UserContext.Provider
      value={{
        profile,
        posts,
        users,
        allUsers,
        setAllUsers,
        setUsers,
        userPosts,
        signedInUser,
        mutualFriends,
        signInWithGoogle,
        signOutOfGoogle,
        getMutualFriends,
        getPostsbyUserId,
        isFriend,
        addFriend,
        removeFriend,
        createPost,
        updatePost,
        updateProfile,
        deletePost,
        likePost,
        unlikePost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
