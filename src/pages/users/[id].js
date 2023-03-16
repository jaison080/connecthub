import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

function User() {
  const router = useRouter();
  const { users, loading, getMutualFriends, mutualFriends, signedInUser } =
    useContext(UserContext);
  const [user, setUser] = useState();
  const { id } = router.query;
  async function fetchUser() {
    const user = users.find((user) => user._id === id);
    setUser(user);
  }
  useEffect(() => {
    fetchUser();
    getMutualFriends(id);
  }, [id, users, signedInUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user?.bio}</div>
        </div>
      ) : (
        <div>User Not Found</div>
      )}
      <div>
        {mutualFriends.length!==0 &&
          mutualFriends?.map((mutual) => (
            <div key={mutual._id}>{mutual.name}</div>
          ))}
      </div>
    </div>
  );
}

export default User;
