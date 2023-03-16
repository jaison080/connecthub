import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import details from "../../assets/hero.svg";
import styles from "./AdditionalDetails.module.css";

function AdditionalDetails() {
  const router = useRouter();
  return (
    <>
      <div className={styles.more_details}>
        <div className={styles.more_details__left__title} data-aos="fade-up">
          Stay Connected
        </div>
        <div className={styles.more_details__right} data-aos="fade-up">
          <div className={styles.more_details__right__image}>
            <Image src={details} alt="logo" />
          </div>
        </div>
        <div className={styles.more_details__left} data-aos="fade-up">
          <div className={styles.more_details__left__subtitle}>
            {" "}
            ConnectHub provides a way for users to stay connected with their
            network. Users can receive notifications when someone likes or
            comments on their posts, and they can also see what their
            connections are up to. The platform also has a messaging feature
            that allows users to communicate with their connections directly.
          </div>
          <div className={styles.more_details__left__buttons}>
            <div
              className={styles.more_details__left__button}
              onClick={() => router.push("/posts")}
            >
              View Posts
            </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default AdditionalDetails;
