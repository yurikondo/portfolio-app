import React, { useEffect, useState } from "react";
import MenuBtn from "../MenuBtn";
import { setPost } from "../../../redux/features/postSlice";
import { useSelector, useDispatch } from "react-redux";
import postApi from "../../../api/postApi";
import userApi from "../../../api/userApi";
import { Link } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import { Box, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const UserHeader = ({ userId, postId }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [postUser, setPostUser] = useState([]);
  const posts = useSelector((state) => state.post.value);
  const loginUser = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPostUser = async () => {
      try {
        const res = await userApi.getOne(userId);
        setPostUser(res);
      } catch (err) {
        console.log(err);
      }
    };
    getPostUser();
  }, []);

  const settings = [
    {
      text: "投稿を削除",
      onClick: async () => {
        try {
          await postApi.delete(postId);
          const newPosts = posts.filter((e) => e._id !== postId);
          dispatch(setPost(newPosts));
        } catch (err) {
          console.log(err);
        }
      },
    },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleFollow = async () => {
    try {
      await userApi.follow(userId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <CardHeader
        sx={{
          cursor: userId === loginUser._id && "auto",
          textDecoration: "none",
          color: "inherit",
        }}
        component={Link}
        to={userId !== loginUser._id ? `/user-profile/${postUser._id}` : ""}
        avatar={
          <Avatar
            sx={{
              width: 48,
              height: 48,
              fontSize: 24,
            }}
            aria-label="ユーザーネーム"
            variant="body1"
          >
            {postUser.icon}
          </Avatar>
        }
        title={postUser.username}
      />
      {userId === loginUser._id ? (
        <>
          <IconButton
            sx={{
              width: 48,
              height: 48,
              fontSize: 24,
              mr: 1,
            }}
            aria-label="settings"
            onClick={handleOpenUserMenu}
          >
            <MoreVertIcon />
          </IconButton>
          <MenuBtn
            settings={settings}
            anchorElUser={anchorElUser}
            setAnchorElUser={setAnchorElUser}
          />
        </>
      ) : (
        <Button
          sx={{
            mr: 2,
          }}
          variant="outlined"
          startIcon={<NotificationsNoneIcon />}
          onClick={handleFollow}
        >
          フォロー
        </Button>
      )}
    </Box>
  );
};

export default UserHeader;
