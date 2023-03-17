import { UserCard } from "@/components";
import { UserContext } from "@/context/UserContext";
import CustomTitle from "@/utils/customTitle";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import styles from "../../styles/Users.module.css";

function Users() {
  const { users, setUsers, loading, allUsers } = useContext(UserContext);
  const [query, setQuery] = React.useState("");

  const searchUsers = async (query) => {
    console.log(allUsers);
    if (query === "") {
      setUsers(allUsers);
      return;
    }
    await axios.get(`/api/user/search/${query}`).then((res) => {
      setUsers(res.data);
    });
  };

  return (
    <>
      <CustomTitle title={"Users"} />
      <div className={styles.main_container}>
        <div className={styles.header_title}>Users</div>
        <input
          type="text"
          placeholder="Search Users"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            searchUsers(e.target.value);
          }}
        />
        <div className={styles.users_container}>
          {users.length === 0 ? (
            <div className={styles.no_users}>No users found</div>
          ) : (
            users.map((user) => <UserCard key={user._id} user={user} />)
          )}
        </div>
      </div>
    </>
  );
}

export default Users;
