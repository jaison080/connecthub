import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import styles from "./MutualFriendCard.module.css";

function MutualFriendCard({ user }) {
  const { isFriend, addFriend, removeFriend, profile } =
    useContext(UserContext);
  const router = useRouter();
  return (
    <>
      <div
        className={styles.card}
        style={{
          cursor: "pointer",
        }}
        data-aos="zoom-in"
      >
        <div
          className={styles.profile_image_wrapper}
          onClick={() => router.push(`/users/${user._id}`)}
        >
          <img src={user.image} alt="" />
        </div>
        <div
          className={styles.user_name}
          onClick={() => router.push(`/users/${user._id}`)}
        >
          {user.name}
        </div>
        {profile && user._id === profile._id ? null : (
          <div
            className={styles.follow_btn}
            onClick={() => {
              isFriend(user._id) ? removeFriend(user._id) : addFriend(user._id);
            }}
          >
            {isFriend(user._id) ? "Unfriend" : "Friend"}
          </div>
        )}
      </div>
    </>
  );
}

export default MutualFriendCard;
