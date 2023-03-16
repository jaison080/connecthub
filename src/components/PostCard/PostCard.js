import { UserContext } from "@/context/UserContext";
import { Button } from "@mui/material";
import React, { useContext } from "react";
import EditPostModal from "../EditPostModal/EditPostModal";
import styles from "./PostCard.module.css";

function PostCard({ post, name, image }) {
  const { profile, deletePost } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <EditPostModal open={open} handleClose={handleClose} post={post} />
      <div className={styles.card}>
        <div className={styles.card_row}>
          <div className={styles.image_wrapper}>
            <img src={post.creator.image ? post.creator.image : image} alt="" />
          </div>
          <div className={styles.user_details}>
            <div className={styles.user_name}>
              {post.creator.name ? post.creator.name : name}
            </div>
            <div className={styles.user_time}>4 Days Ago</div>
          </div>
          {post.creator === profile?._id ? (
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={()=>deletePost(post._id)}
              >
                Delete
              </Button>
            </div>
          ) : null}
        </div>
        <div className={styles.content_wrapper}>
          <div className={styles.user_title}>{post.title}</div>
          <div className={styles.user_content}>{post.content}</div>
          <img src={post.image} alt="" />
        </div>
        <div className={styles.user_footer}>
          <div className={styles.user_time}>40 Likes</div>
          <div className={styles.user_time}>10 Comments</div>
          <div className={styles.user_time}>5 Shared</div>
        </div>
      </div>
    </>
  );
}

export default PostCard;
