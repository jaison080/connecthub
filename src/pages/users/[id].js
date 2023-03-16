import { PostCard, UserCard } from "@/components";
import MutualFriendCard from "@/components/MutualFriendCard/MutualFriendCard";
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
    <div className={styles.container}>
      <div className={styles.user_card}>
        <div className={styles.user_header}>
          <div className={styles.user_image}>
            <img src={user.image} alt="" />
          </div>
          <div>
            <div className={styles.user_name}>{user.name}</div>
            <div className={styles.user_email}>{user.email}</div>
            <div className={styles.user_bio}>{user.bio}</div>
          </div>
          <div className={styles.follow_button}>Follow</div>
        </div>
        <div className={styles.user_details_item_count}>
          <b>{user.followers.length}</b> Followers
        </div>
      </div>
      <div className={styles.user_info}>
        <div className={styles.mutual_friends}>
          <h2>Mutual Friends</h2>
          <div className={styles.mutual_friends_list}>
            {mutualFriends.map((user) => (
              <MutualFriendCard key={user._id} user={user} />
            ))}
          </div>
        </div>
        <div className={styles.user_posts}>
          <h2>Posts</h2>
          <div className={styles.user_posts_list}>
            {userPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
