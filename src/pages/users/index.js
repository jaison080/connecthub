import { UserCard } from "@/components";
import { UserContext } from "@/context/UserContext";
import React, { useContext } from "react";
import styles from "../../styles/Users.module.css";

function Users() {
  const { users, loading } = useContext(UserContext);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.header_title}>Users</div>
        <div className={styles.users_container}>
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Users;
