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
    <Dialog fullWidth={true} maxWidth="sm" open={open} onClose={handleClose}>
      <DialogTitle>Update Post</DialogTitle>
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
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <img
            src={file ? URL.createObjectURL(file) : image ? image : ""}
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
