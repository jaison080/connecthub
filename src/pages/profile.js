import ProtectedRoute from "@/utils/protectedRoute";
import React from "react";

function Profile() {
  return (
    <>
      <ProtectedRoute>
        <div>Profile</div>
      </ProtectedRoute>
    </>
  );
}

export default Profile;
