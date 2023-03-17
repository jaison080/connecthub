import { UserContext } from "@/context/UserContext";
import { storage } from "@/utils/firebaseFront";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect } from "react";
import styles from "./EditPostModal.module.css";

function EditPostModal({ open, handleClose, post }) {
  const { updatePost } = useContext(UserContext);
  const [title, setTitle] = React.useState(post.title);
  const [content, setContent] = React.useState(post.content);
  const [image, setImage] = React.useState(post.image);
  const [file, setFile] = React.useState(null);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
    setImage(post.image);
  }, [post]);

  const handleUploadFile = async (file) => {
    const storageRef = ref(
      storage,
      `postPhoto/${
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      }`
    );
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

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
      <DialogContent sx={{ "&::-webkit-scrollbar": { display: "none" } }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            padding: "1rem",
            justifyContent: "center",
          }}
        >
          <div className={styles.title}>Edit Post</div>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            fullWidth
            label="Content"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: "400",
            }}
          >
            Post Image (Optional)
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
            src={file ? URL.createObjectURL(file) : image ? image : ""}
            alt=""
            style={{
              width: "150px",
              height: "150px",
              alignSelf: "center",
              objectFit: "cover",
              borderRadius: "1rem",
            }}
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
                setTitle("");
                setContent("");
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
                if (file) {
                  handleUploadFile(file).then((url) => {
                    updatePost(post._id, title, content, url);
                  });
                } else {
                  updatePost(post._id, title, content, image);
                }
                setTitle("");
                setContent("");
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

export default EditPostModal;
