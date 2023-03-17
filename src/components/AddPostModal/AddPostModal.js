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
import React, { useContext } from "react";

function AddPostModal({ open, handleClose }) {
  const { createPost } = useContext(UserContext);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [file, setFile] = React.useState(null);

  const handleUploadFile = async (file) => {
    const storageRef = ref(
      storage,
      `postPhoto/${
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      }`
    );

    uploadBytes(storageRef, file).then(() => {
      getDownloadURL(storageRef)
        .then((url) => {
          setImage(url);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>Create a New Post</DialogTitle>
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

          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          {file && <img src={URL.createObjectURL(file)} alt="" />}

          <button onClick={() => handleUploadFile(file)}>Upload</button>

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
                createPost(title, content, image);
                setTitle("");
                setContent("");
                setImage(null);
                handleClose();
              }}
            >
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddPostModal;
