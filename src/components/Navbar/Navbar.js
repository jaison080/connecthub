import React, { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import { HiMenuAlt2 } from "react-icons/hi";
import { useRouter } from "next/router";
import { Drawer } from "@mui/material";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { UserContext } from "@/context/UserContext";
import { IoCreate } from "react-icons/io5";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import AddPostModal from "../AddPostModal/AddPostModal";

function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const { profile, signOutOfGoogle, signInWithGoogle } =
    useContext(UserContext);
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AddPostModal open={open1} handleClose={handleClose1} />
      <div className={styles.navbar}>
        <div className={styles.navbar__left}>
          <div
            className={styles.navbar__menu_container}
            onClick={() => {
              setOpen(true);
            }}
          >
            <HiMenuAlt2
              className={styles.navbar__menu}
              onClick={() => {
                setOpen(true);
              }}
            />
          </div>
          <div
            className={styles.navbar__logo}
            onClick={() => {
              router.push("/");
            }}
            style={{ cursor: "pointer" }}
          >
            ConnectHub
          </div>
        </div>
        <div className={styles.navbar__links}>
          <div
            className={styles.navbar__link}
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </div>
          <div
            className={styles.navbar__link}
            onClick={() => {
              router.push("/users");
            }}
          >
            Users
          </div>
          <div
            className={styles.navbar__link}
            onClick={() => {
              router.push("/posts");
            }}
          >
            Posts
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {profile ? (
            <Menu
              menuButton={
                <MenuButton
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                  }}
                >
                  <img
                    src={profile?.image}
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  />
                </MenuButton>
              }
              transition
            >
              <MenuItem
                onClick={() => {
                  router.push(`/profile`);
                }}
                style={{
                  color: "#a6432d",
                }}
              >
                {" "}
                My Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  signOutOfGoogle();
                }}
                style={{
                  color: "#a6432d",
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          ) : null}
          <div className={styles.navbar__links}>
            {profile ? (
              <>
                <div
                  className={styles.login_btn}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  onClick={handleClickOpen1}
                >
                  <IoCreate color="#fff" size={20} />
                  Add Post
                </div>
              </>
            ) : (
              <div
                className={styles.login_btn}
                onClick={() => signInWithGoogle()}
              >
                Sign In
              </div>
            )}
          </div>
        </div>
      </div>
      <Drawer
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleDrawerClose();
          } else if (reason !== "escapeKeyDown") {
            handleDrawerClose();
          }
        }}
        anchor="left"
      >
        <div className={styles.nav__drawer}>
          <div className={styles.navbar__drawer_header}>
            <div
              className={styles.navbar__logo}
              data-aos="fade-right"
              data-aos-duration="600"
            >
              ConnectHub
            </div>
            <div
              className={styles.navbar__items_mob}
              data-aos="fade-right"
              data-aos-duration="600"
            >
              <div
                className={styles.navbar__link}
                onClick={() => {
                  router.push("/");
                  handleDrawerClose();
                }}
              >
                About
              </div>
              <div
                className={styles.navbar__link}
                onClick={() => {
                  router.push("/users");
                  handleDrawerClose();
                }}
              >
                Users
              </div>
              <div
                className={styles.navbar__link}
                onClick={() => {
                  router.push("/posts");
                  handleDrawerClose();
                }}
              >
                Posts
              </div>
              <div className={styles.navbar__links_1}>
                {profile ? (
                  <>
                    <div
                      className={styles.login_btn}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                      onClick={handleClickOpen1}
                    >
                      <IoCreate color="#fff" size={20} />
                      Add Post
                    </div>
                  </>
                ) : (
                  <div
                    className={styles.login_btn}
                    onClick={() => signInWithGoogle()}
                  >
                    Sign In
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default Navbar;
