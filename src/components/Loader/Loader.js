import React from "react";
import { HashLoader } from "react-spinners";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loader_container}>
      <HashLoader color={"#a6432d"} loading={true} size={150} />
    </div>
  );
}

export default Loader;
