import { PostCard } from "@/components";
import { UserContext } from "@/context/UserContext";
import CustomTitle from "@/utils/customTitle";
import React, { useContext } from "react";
import styles from "../styles/Posts.module.css";

function Posts() {
  const { posts, loading } = useContext(UserContext);
  return (
    <>
    <CustomTitle title={"Posts"}/>
      <div className={styles.main_container}>
        <div className={styles.header_title}>Posts</div>
        <div className={styles.posts_container}>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Posts;
