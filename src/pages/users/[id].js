import { MutualFriendCard, PostCard } from "@/components";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/User.module.css";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import CustomTitle from "@/utils/customTitle";
import Loader from "@/components/Loader/Loader";
import Masonry from "react-masonry-css";

function User() {
  const router = useRouter();
  const {
    users,
    profile,
    isFriend,
    addFriend,
    removeFriend,
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
  const breakpointColumnsObj = {
    default: 2,
    900: 1,
  };

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
    return <Loader />;
  }

  return (
    <>
      <CustomTitle title="User Details" />
      <div className={styles.container}>
        <div className={styles.user_card}>
          <BsFillArrowLeftCircleFill
            color="#a6432d"
            style={{
              cursor: "pointer",
            }}
            size={40}
            onClick={() => router.back()}
          />
          <div className={styles.user_header}>
            <div className={styles.user_image}>
              <img src={user?.image} alt="" />
              <div className={styles.user_details}>
                <div className={styles.user_name}>{user?.name}</div>
                <div className={styles.user_email}>
                  @{user?.email.split("@")[0]}
                </div>
                <div className={styles.user_bio}>{user?.bio}</div>
              </div>
            </div>
            {profile && user?._id === profile._id ? null : (
              <div
                className={styles.follow_btn}
                onClick={() => {
                  isFriend(user?._id)
                    ? removeFriend(user?._id)
                    : addFriend(user?._id);
                }}
              >
                {isFriend(user?._id) ? "Remove Friend" : "Add Friend"}
              </div>
            )}
          </div>
          <div
            className={styles.user_email}
            style={{
              textAlign: "center",
              paddingTop: "10px",
              fontSize: "1.2rem",
            }}
          >
            <b>{user?.friends?.length}</b> Friends
          </div>
        </div>
        <div
          className={styles.user_info}
          style={{
            display:
              mutualFriends.length === 0 && userPosts.length === 0
                ? "block"
                : "flex",
          }}
        >
          {mutualFriends.length === 0 && userPosts.length === 0 ? (
            <div
              className={styles.no_info_text}
              style={{
                paddingTop: "20px",
              }}
            >
              No mutual friends or posts
            </div>
          ) : null}
          <div
            className={styles.mutual_friends}
            style={{
              display: mutualFriends.length === 0 ? "none" : "block",
            }}
          >
            <div className={styles.mutual_friends_header}>Mutual Friends</div>
            <div className={styles.mutual_friends_list}>
              {mutualFriends.map((user) => (
                <MutualFriendCard key={user._id} user={user} />
              ))}
            </div>
          </div>
          <div className={styles.user_posts}>
            <div
              className={styles.user_posts_header}
              style={{
                display: userPosts.length === 0 ? "none" : "block",
              }}
            >
              Posts
            </div>
            <div className={styles.user_posts_list}>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {userPosts
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
              </Masonry>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
