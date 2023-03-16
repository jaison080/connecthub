import { PostCard } from "@/components";
import MutualFriendCard from "@/components/MutualFriendCard/MutualFriendCard";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import styles from "../styles/Profile.module.css";
import { IoCreate } from "react-icons/io5";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";

function Profile() {
  const router = useRouter();
  const { profile, loading } = useContext(UserContext);

  console.log(profile);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.user_card}>
          <BsFillArrowLeftCircleFill
            color="#a6432d"
            style={{
              cursor: "pointer",
            }}
            size={40}
            onClick={() => router.back()}
          />
          <div className={styles.user_header}>
            <div className={styles.user_image}>
              <img src={profile?.image} alt="" />
              <div className={styles.user_details}>
                <div className={styles.user_name}>{profile?.name}</div>
                <div className={styles.user_email}>
                  @{profile?.email.split("@")[0]}
                </div>
                <div className={styles.user_bio}>{profile?.bio}</div>
              </div>
            </div>
            <div className={styles.user_controls}>
              <div
                className={styles.follow_btn}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <IoCreate color="#fff" size={20} />
                <div>Create Post</div>
              </div>
              <div
                className={styles.follow_btn}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <FaUserEdit color="#fff" size={20} />
                <div>Edit Profile</div>
              </div>
            </div>
          </div>
          <div
            className={styles.user_email}
            style={{
              textAlign: "center",
              paddingTop: "10px",
              fontSize: "1.2rem",
            }}
          >
            <b>{profile?.friends?.length}</b> Friends
          </div>
        </div>
        <div className={styles.user_info}>
          {profile?.posts?.length === 0 && profile?.friends?.length === 0 ? (
            <div className={styles.no_info_text}>
              No Posts or Friends to show
            </div>
          ) : null}
          <div
            className={styles.mutual_friends}
            style={{
              display: profile?.friends?.length === 0 ? "none" : "block",
            }}
          >
            <div className={styles.mutual_friends_header}>Friends</div>
            <div className={styles.mutual_friends_list}>
              {profile?.friends?.map((user) => (
                <MutualFriendCard key={user._id} user={user} />
              ))}
            </div>
          </div>
          <div className={styles.user_posts}>
            <div
              className={styles.user_posts_header}
              style={{
                display: profile?.posts?.length === 0 ? "none" : "block",
              }}
            >
              Posts
            </div>
            <div className={styles.user_posts_list}>
              {profile?.posts?.map((post) => {
                return (
                  <PostCard
                    key={post._id}
                    post={post}
                    name={profile?.name}
                    image={profile?.image}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
