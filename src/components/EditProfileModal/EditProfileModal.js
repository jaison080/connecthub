import { UserContext } from "@/context/UserContext";
import { storage } from "@/utils/firebaseFront";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useContext, useEffect } from "react";

function EditProfileModal({ open, handleClose, profile }) {
  const { updateProfile } = useContext(UserContext);
  const [name, setName] = React.useState(profile?.name);
  const [bio, setBio] = React.useState(profile?.bio);
  const [file, setFile] = React.useState(null);
  const [image, setImage] = React.useState(profile?.image);

  const handleUploadFile = async (file) => {
    const storageRef = ref(storage, `profilePhoto/${profile?._id}`);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  useEffect(() => {
    setName(profile?.name);
    setBio(profile?.bio);
    setImage(profile?.image);
    setFile(null);
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <img src={file ? URL.createObjectURL(file) : image} alt="" />
          </div>
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
                setFile(null);
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
                if (file)
                  handleUploadFile(file).then((url) => {
                    updateProfile(profile._id, name, bio, url);
                  });
                else updateProfile(profile._id, name, bio, image);
                setName("");
                setBio("");
                setImage(null);
                setFile(null);
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
