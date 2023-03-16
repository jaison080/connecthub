import { UserContext } from "@/context/UserContext";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect } from "react";

function EditProfileModal({ open, handleClose, profile }) {
  const { updateProfile } = useContext(UserContext);
  const [name, setName] = React.useState(profile?.name);
  const [bio, setBio] = React.useState(profile?.bio);
  const [image, setImage] = React.useState(profile?.image);

  useEffect(() => {
    setName(profile?.name);
    setBio(profile?.bio);
    setImage(profile?.image);
  }, [profile]);

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>Update Profile</DialogTitle>
      <DialogContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "2rem",
          }}
        >
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Bio"
            multiline
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <Button variant="contained" component="label">
            Upload Image (Optional)
            <input type="file" hidden />
          </Button>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setName("");
                setBio("");
                setImage(null);
                handleClose();
              }}
              sx={{ mt: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => {
                updateProfile(profile._id, name, bio, image);
                setName("");
                setBio("");
                setImage(null);
                handleClose();
              }}
            >
              Update
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileModal;
