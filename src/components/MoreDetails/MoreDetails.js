import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import details from "../../assets/moredetails.png";
import styles from "./MoreDetails.module.css";

function MoreDetails() {
  const router = useRouter();
  return (
    <>
      <div className={styles.more_details}>
        <div className={styles.more_details__left__title} data-aos="fade-up">
          Share Your Thoughts and Ideas
        </div>
        <div className={styles.more_details__right} data-aos="fade-up">
          <div className={styles.more_details__right__image}>
            <Image src={details} alt="logo" />
          </div>
        </div>
        <div className={styles.more_details__left} data-aos="fade-up">
          <div className={styles.more_details__left__subtitle}>
            {" "}
            ConnectHub provides a space for users to share their thoughts and
            ideas with others. Users can create posts, share articles, and
            engage in discussions with other users. This feature helps users to
            stay informed about the latest news and trends in their areas of
            interest.
          </div>
          <div className={styles.more_details__left__buttons}>
            <div
              className={styles.more_details__left__button}
              onClick={() => router.push("/users")}
            >
              View Users
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoreDetails;
