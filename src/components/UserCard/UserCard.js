import React from "react";
import styles from "./UserCard.module.css";

function UserCard() {
  return (
    <div className={styles.card}>
      <div className={styles.first_row}>
        <div className={styles.profile_image_wrapper}>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            alt=""
          />
        </div>
        <div className={styles.follow_btn}>Follow</div>
      </div>
      <div className={styles.user_details}>
        <div className={styles.user_name}>Sally Ramos</div>
        <div className={styles.user_username}>@sallytheramos</div>
      </div>
      <div className={styles.bio}>
        Product Designer @company.Working on another @company in my free time.
      </div>
      <div className={styles.footer}>
        <div className={styles.footer_text}>
          <b>15K</b> Followers
        </div>
        <div className={styles.footer_text}>
          <b>7K</b> Following
        </div>
        <div className={styles.footer_text}>Since April 30, 2017</div>
      </div>
    </div>
  );
}

export default UserCard;
