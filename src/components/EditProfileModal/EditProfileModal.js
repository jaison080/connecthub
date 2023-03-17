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
import styles from "./EditProfileModal.module.css";

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
    <Dialog
      open={open}
      PaperProps={{
        style: {
          backgroundColor: "#f9f6ed",
          color: "#a6432d",
          borderRadius: "1rem",
          padding: "1rem",
          fontFamily: "Poppins",
        },
      }}
      BackdropProps={{
        style: {
          opacity: 0.5,
          background:
            "linear-gradient(90deg, #0C4C82 -13.51%, #0D4F84 -12.59%, #187BA2 5.14%, #1F9BB8 20.99%, #24AFC5 34.24%, #26B6CA 43.28%, #30B9C7 50.27%, #4DBFBE 62.37%, #7ACBAF 78.1%, #B1D89E 94.53%)",
        },
      }}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="sm"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            padding: "1rem",
            justifyContent: "center",
          }}
        >
          <div className={styles.title}>Edit Profile</div>
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
              fontSize: "1.2rem",
              fontWeight: "400",
            }}
          >
            Profile Image (Optional)
          </div>
          <input
            type="file"
            accept="image/*"
            style={{
              fontFamily: "Poppins",
            }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <img
            src={file ? URL.createObjectURL(file) : image}
            style={{
              width: "150px",
              height: "150px",
              alignSelf: "center",
              objectFit: "cover",
              borderRadius: "1rem",
            }}
            alt=""
          />

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
