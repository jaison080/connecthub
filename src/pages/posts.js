import { PostCard } from "@/components";
import { UserContext } from "@/context/UserContext";
import CustomTitle from "@/utils/customTitle";
import React, { useContext } from "react";
import styles from "../styles/Posts.module.css";
import Masonry from "react-masonry-css";

function Posts() {
  const { posts, loading } = useContext(UserContext);
  const breakpointColumnsObj = {
    default: 3,
    1200: 2,
    900: 1,
  };
  return (
    <>
      <CustomTitle title={"Posts"} />
      <div className={styles.main_container}>
        <div className={styles.header_title}>Posts</div>
        <div className={styles.posts_container}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </Masonry>
        </div>
      </div>
    </>
  );
}

export default Posts;
