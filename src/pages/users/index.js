import { UserCard } from "@/components";
import { UserContext } from "@/context/UserContext";
import CustomTitle from "@/utils/customTitle";
import { debounce } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import styles from "../../styles/Users.module.css";

function Users() {
  const { users, setUsers, allUsers } = useContext(UserContext);
  const [initial, setInitial] = React.useState([]);
  const searchFun = (queryParam, setUsers) => {
    axios
      .get(`/api/user/search/${queryParam}`)
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setInitial(allUsers);
  }, []);

  const debouncedSearch = debounce(searchFun, 500);

  const onSearch = (v) => {
    const search = debouncedSearch;
    if (!v) {
      // when the user clear the field we don't want to perform a search, we need to clear the state and do nothing else
      // debouncedSearch.clear();
      setUsers(initial);
    } else {
      search(v, setUsers);
    }
  };
  return (
    <>
      <CustomTitle title={"Users"} />
      <div className={styles.main_container}>
        <div className={styles.header_title}>Users</div>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
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
