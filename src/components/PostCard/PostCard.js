import { UserContext } from "@/context/UserContext";
import { Button } from "@mui/material";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaHeart, FaShareAlt } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";
import EditPostModal from "../EditPostModal/EditPostModal";
import { CopyToClipboard } from "react-copy-to-clipboard";

import styles from "./PostCard.module.css";

function PostCard({ post, name, image }) {
  const { profile, deletePost, unlikePost, likePost } = useContext(UserContext);
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
      <div className={styles.card} data-aos="zoom-in">
        {post.creator === profile?._id || post.creator?._id === profile?._id ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              gap: "10px",
              justifyContent: "flex-end",
            }}
          >
            <FaEdit
              size={25}
              color="#a6432d"
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleClickOpen();
              }}
            />
            <RiDeleteBin7Line
              size={25}
              color="red"
              style={{ cursor: "pointer" }}
              onClick={() => {
                deletePost(post._id);
              }}
            />
          </div>
        ) : null}
        <div className={styles.card_1}>
          <div className={styles.card_row}>
            <div className={styles.image_wrapper}>
              <img
                src={post.creator?.image ? post.creator.image : image}
                alt=""
              />
            </div>
            <div className={styles.user_details}>
              <div className={styles.user_name}>
                {post.creator?.name ? post.creator.name : name}
              </div>
              <div className={styles.user_time}>
                {new Date(post?.createdAt)
                  .toLocaleDateString()
                  .substring(0, 2) +
                  ", " +
                  new Date(post?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
              </div>
            </div>
          </div>
          <div className={styles.content_wrapper}>
            <div className={styles.user_title}>{post.title}</div>
            <div className={styles.user_content}>{post.content}</div>
            <img src={post.image} alt="" />
          </div>
          <div className={styles.user_footer}>
            <div
              className={styles.user_time}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              {profile?.likedposts?.includes(post._id) ? (
                <FaHeart
                  color="red"
                  style={{
                    cursor: "pointer",
                  }}
                  size="1.5rem"
                  onClick={() => {
                    unlikePost(post._id);
                  }}
                />
              ) : (
                <FiHeart
                  style={{
                    cursor: "pointer",
                  }}
                  size="1.5rem"
                  onClick={() => {
                    if (!profile) {
                      toast.error("Please Login to Like a Post");
                      return;
                    }
                    likePost(post._id);
                  }}
                />
              )}
              <div>{post.likes.length === 0 ? 0 : post.likes.length} Likes</div>
            </div>
            <CopyToClipboard
              text={"https://connecthub.vercel.app/posts"}
              onCopy={() => toast.success("Sharing Link Copied")}
            >
              <FaShareAlt
                size="1.5rem"
                style={{
                  cursor: "pointer",
                }}
                color="rgba(104, 97, 97, 0.63)"
              />
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCard;
