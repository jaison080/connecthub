import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import styles from "./UserCard.module.css";

function UserCard({ user }) {
  const { isFriend, addFriend, removeFriend, profile } =
    useContext(UserContext);

  const router = useRouter();

  return (
    <div
      className={styles.card}
      style={{ cursor: "pointer" }}
     
    >
      <div className={styles.first_row}>
        <div
          className={styles.profile_image_wrapper}
          onClick={() => {
            profile && user?._id === profile._id
              ? router.push("/profile")
              : router.push(`/users/${user?._id}`);
          }}
        >
          <img src={user?.image} alt="" />
        </div>
        {profile && user?._id === profile._id ? null : (
          <div
            className={styles.follow_btn}
            onClick={() => {
              if (!profile) {
                toast.error("Please login to add friends");
                return;
              }
              isFriend(user?._id)
                ? removeFriend(user?._id)
                : addFriend(user?._id);
            }}
          >
            {isFriend(user?._id) ? "Unfriend" : "Friend"}
          </div>
        )}
      </div>
      <div
        className={styles.user_details}
        onClick={() => {
          profile && user?._id === profile._id
            ? router.push("/profile")
            : router.push(`/users/${user._id}`);
        }}
      >
        <div className={styles.user_name}>{user?.name}</div>
        <div className={styles.user_username}>
          @{user?.email?.split("@")[0]}
        </div>
      </div>
      <div
        className={styles.bio}
        onClick={() => {
          profile && user?._id === profile._id
            ? router.push("/profile")
            : router.push(`/users/${user?._id}`);
        }}
      >
        {user?.bio}
      </div>
      <div
        className={styles.footer}
        onClick={() => {
          profile && user?._id === profile._id
            ? router.push("/profile")
            : router.push(`/users/${user?._id}`);
        }}
      >
        <div className={styles.footer_text}>
          <b>{user?.friends?.length}</b> Friends
        </div>
        <div className={styles.footer_text}>
          Since{" "}
          {new Date(user?.createdAt).toLocaleDateString().substring(0, 2) +
            ", " +
            new Date(user?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
