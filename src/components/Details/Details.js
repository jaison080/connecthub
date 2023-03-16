import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import details from "../../assets/details.png";
import styles from "./Details.module.css";

function Details() {
  const router = useRouter();
  return (
    <>
      <div className={styles.more_details}>
        <div className={styles.more_details__left__title} data-aos="fade-up">
          Connect with Anyone, Anywhere:
        </div>
        <div className={styles.more_details__right} data-aos="fade-up">
          <div className={styles.more_details__right__image}>
            <Image src={details} alt="logo" />
          </div>
        </div>
        <div className={styles.more_details__left} data-aos="fade-up">
          <div className={styles.more_details__left__subtitle}>
            {" "}
            ConnectHub makes it easy to connect with people from all over the
            world. Users can search for people based on their interests,
            location, or profession. The platform also has a feature that
            recommends people based on mutual connections, making it easy to
            expand your network.
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

export default Details;
