import * as React from "react";
import { useState } from "react";
import MenuBtn from "./MenuBtn";
import postApi from "../../api/postApi";
import { useSelector, useDispatch } from "react-redux";
import { format } from "timeago.js";
import AvatarList from "./AvatarList";
import { setPost } from "../../redux/features/postSlice";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import HideImageIcon from "@mui/icons-material/HideImage";

const MainCard = ({ postId, desc, itemImgURL, user, createdAt }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const loginUser = useSelector((state) => state.user.value);
  const posts = useSelector((state) => state.post.value);
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

  const handleLike = async () => {
    try {
      await postApi.like(postId, { userId: loginUser._id });
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <Card sx={{ width: "100%", mb: 2 }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "30%", height: 250, flexShrink: 0 }}>
          <Box
            sx={{
              width: "100%",
              backgroundColor: grey[900],
              borderRadius: "3px",
              height: 250,
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              image={itemImgURL}
              alt="商品の画像"
              sx={{
                p: 2,
                width: "100%",
                height: 250,
                objectFit: "contain",
              }}
            />
            <HideImageIcon
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: -100,
              }}
              fontSize="large"
            />
          </Box>
        </Box>
        <Box
          sx={{
            // flexGrow: 1,
            width: "70%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    fontSize: 24,
                  }}
                  aria-label="recipe"
                >
                  😝
                </Avatar>
              }
              action={
                <>
                  <IconButton
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
              }
              title="ゆりです"
            />
            <CardContent sx={{ py: 0 }}>
              <Typography variant="body" color="text.secondary">
                {desc}
              </Typography>
            </CardContent>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CardActions disableSpacing>
              <IconButton aria-label="この投稿をシェアする">
                <ShareIcon />
              </IconButton>
              <IconButton
                aria-label="お気に入りに追加"
                onClick={() => handleLike()}
              >
                <FavoriteIcon />
              </IconButton>
              <AvatarList />
            </CardActions>
            <Typography sx={{ mr: 3 }}>{format(createdAt)}</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default MainCard;
