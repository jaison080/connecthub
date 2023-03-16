import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import hero from "../../assets/details.jpg";
import styles from "./Hero.module.css";

function Hero() {
  const router = useRouter();
  const { signInWithGoogle, profile } = useContext(UserContext);
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.hero__left} data-aos="fade-up">
          <div className={styles.hero__left__title}>ConnectHub</div>
          <div className={styles.hero__left__subtitle}>
            Where Connections Flourish
          </div>

          <div className={styles.hero__left__buttons}>
            {profile ? (
              <div
                className={styles.hero__left__button}
                onClick={() => router.push("/profile")}
              >
                My Profile
              </div>
            ) : (
              <div
                className={styles.hero__left__button}
                onClick={() => signInWithGoogle()}
              >
                Get Started
              </div>
            )}
          </div>
        </div>
        <div className={styles.hero__right} data-aos="fade-up">
          <div className={styles.hero__right__image}>
            <Image src={hero} alt="hero" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
