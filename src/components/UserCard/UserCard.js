import React from "react";
import styles from './UserCard.module.css'

function UserCard() {
  return (
    <div className={styles.card}>
      <div className={styles.card_row}>
        <div className={styles.image_wrapper}>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
            alt=""
          />
        </div>
        <div className={styles.user_details}>
          <div className={styles.user_name}>Dadda Hicham</div>
          <div className={styles.user_time}>4 Mins Ago</div>
        </div>
      </div>
      <div className={styles.user_content}>
        We are facing a serious business dilemma, with Facebook taking away a
        good chunk of traffic to news and content sites, and ad blockers .
      </div>
      <div className={styles.user_footer}>
        <div className={styles.user_time}>40 Likes</div>
        <div className={styles.user_time}>10 Comments</div>
        <div className={styles.user_time}>5 Shared</div>
      </div>
    </div>
  );
}

export default UserCard;
