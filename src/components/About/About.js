import Image from "next/image";
import React from "react";
import styles from "./About.module.css";
import logo from "../../assets/about.png";
import { useRouter } from "next/router";

function About() {
  const router = useRouter();
  return (
    <>
      <div className={styles.about}>
        <div className={styles.about__left} data-aos="fade-up">
          <div className={styles.about__left__title}>
            About ConnectHub
          </div>
          <div className={styles.about__left__subtitle}>
            ConnectHub is a social networking platform designed to help users
            connect with people from all walks of life. The platform allows
            users to create profiles, find and connect with people they know,
            and also discover new connections. The aim of ConnectHub is to
            create a community of like-minded people who can share their
            experiences, interests, and knowledge.
          </div>
          <div className={styles.about__left__buttons}>
            <div
              className={styles.about__left__button}
              onClick={() => router.push("/users")}
            >
              View Users
            </div>
          </div>
        </div>
        <div className={styles.about__right} data-aos="fade-up">
          <div className={styles.about__right__image}>
            <Image src={logo} alt="logo" />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
