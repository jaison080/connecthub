import { PostCard, UserCard } from "@/components";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/User.module.css";

function User() {
  const router = useRouter();
  const {
    users,
    loading,
    getMutualFriends,
    mutualFriends,
    signedInUser,
    userPosts,
    getPostsbyUserId,
    posts,
  } = useContext(UserContext);
  const [user, setUser] = useState();
  const { id } = router.query;
  async function fetchUser() {
    const user = users.find((user) => user._id === id);
    setUser(user);
  }
  useEffect(() => {
    fetchUser();
    getMutualFriends(id);
  }, [id, users, signedInUser]);

  useEffect(() => {
    getPostsbyUserId(id);
  }, [id, posts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user?.bio}</div>
        </div>
      ) : (
        <div>User Not Found</div>
      )}
      <div>{mutualFriends.length !== 0 ? <h3>Mutual Friends</h3>:<h3>No Mutual Friends</h3>}</div>
      <div>
        {mutualFriends.length !== 0 &&
          mutualFriends?.map((mutual) => (
            <UserCard key={mutual._id} user={mutual} />
          ))}
      </div>
      <div className={styles.follow_btn}>Friend</div>

      <div>{userPosts.length !== 0 ? <h3>User Posts</h3>:<h3>No User Posts</h3>}</div>
      <div>
        {userPosts.length !== 0 &&
          userPosts?.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
}

export default User;
