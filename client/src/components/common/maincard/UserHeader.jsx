import React from "react";
import MenuBtn from "../MenuBtn";
import { useState } from "react";
import { setPost } from "../../../redux/features/postSlice";
import { useSelector, useDispatch } from "react-redux";
import postApi from "../../../api/postApi";
import CardHeader from "@mui/material/CardHeader";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UserHeader = ({ userId, postId }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const posts = useSelector((state) => state.post.value);
  const loginUser = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <CardHeader
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
            😝
          </Avatar>
        }
        title="ゆりです"
      />
      {userId === loginUser._id && (
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
    </Box>
  );
};

export default UserHeader;
