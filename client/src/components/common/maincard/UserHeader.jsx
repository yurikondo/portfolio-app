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

const UserHeader = ({ postUserId, postId }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [postUser, setPostUser] = useState([]);
  const posts = useSelector((state) => state.post.value);
  const loginUser = useSelector((state) => state.user.value);
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPostUser = async () => {
      try {
        const res = await userApi.getOne(postUserId);
        setPostUser(res);
        setIsFollowing(res.followers.includes(loginUser._id));
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
      const res = await userApi.follow(postUserId);
      if (res.isFollow) {
        setIsFollowing(true);
        console.log("フォロー成功🎉");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      const res = await userApi.unfollow(postUserId);
      if (!res.isFollow) {
        setIsFollowing(false);
        console.log("フォロー解除🎉");
      }
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
          cursor: postUserId === loginUser._id && "auto",
          textDecoration: "none",
          color: "inherit",
        }}
        component={Link}
        to={postUserId !== loginUser._id ? `/user-profile/${postUser._id}` : ""}
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
      {postUserId === loginUser._id && (
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
      )}
      {postUserId !== loginUser._id &&
        !isFollowing && (
          <Button
            sx={{
              mr: 2,
            }}
            variant="contained"
            startIcon={<NotificationsNoneIcon />}
            onClick={handleFollow}
          >
            フォローする
          </Button>
        )}

      {postUserId !== loginUser._id &&
        isFollowing && (
          <Button
            sx={{
              mr: 2,
            }}
            variant="outlined"
            startIcon={<NotificationsNoneIcon />}
            onClick={handleUnfollow}
          >
            フォロー解除
          </Button>
        )}
    </Box>
  );
};

export default UserHeader;
