import { UserContext } from "@/context/UserContext";
import { Button, Dialog, DialogContent } from "@mui/material";
import React, { useContext } from "react";

function DeletePostModal({ open, handleClose, post }) {
  const { deletePost } = useContext(UserContext);

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
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            Are you sure you want to delete this post?
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                deletePost(post?._id);
                handleClose();
              }}
              sx={{ mt: 2 }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={() => {
                handleClose();
              }}
            >
              No
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeletePostModal;
