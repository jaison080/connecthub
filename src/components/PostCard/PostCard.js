import React from "react";
import styles from "./PostCard.module.css";

function PostCard({ post }) {
  return (
    <div className={styles.card}>
      <div className={styles.card_row}>
        <div className={styles.image_wrapper}>
          <img src={post.creator.image} alt="" />
        </div>
        <div className={styles.user_details}>
          <div className={styles.user_name}>{post.creator.name}</div>
          <div className={styles.user_time}>4 Days Ago</div>
        </div>
      </div>
      <div className={styles.content_wrapper}>
        <div className={styles.user_title}>{post.title}</div>
        <div className={styles.user_content}>{post.content}</div>
      </div>
      <div className={styles.user_footer}>
        <div className={styles.user_time}>40 Likes</div>
        <div className={styles.user_time}>10 Comments</div>
        <div className={styles.user_time}>5 Shared</div>
      </div>
    </div>
  );
}

export default PostCard;
