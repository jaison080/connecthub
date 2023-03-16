import { useRouter } from "next/router";
import React from "react";
import styles from "./UserCard.module.css";

function UserCard({ user }) {
  const router = useRouter();
  return (
    <div
      className={styles.card}
      style={{ cursor: "pointer" }}
      onClick={() => {
        router.push(`/users/${user._id}`);
      }}
    >
      <div className={styles.first_row}>
        <div className={styles.profile_image_wrapper}>
          <img src={user.image} alt="" />
        </div>
        <div className={styles.follow_btn}>Follow</div>
      </div>
      <div className={styles.user_details}>
        <div className={styles.user_name}>{user.name}</div>
        <div className={styles.user_username}>@{user.email.split("@")[0]}</div>
      </div>
      <div className={styles.bio}>
        {user.bio
          ? user.bio
          : "Product Designer @company.Working on another @company in my free time."}
      </div>
      <div className={styles.footer}>
        <div className={styles.footer_text}>
          <b>{user.friends.length}</b> Friends
        </div>
        <div className={styles.footer_text}>Since April 30, 2017</div>
      </div>
    </div>
  );
}

export default UserCard;
