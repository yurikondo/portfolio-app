import React, { useState } from "react";
import postApi from "../../../api/postApi";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import AvatarList from "./AvatarList";
import UserHeader from "./UserHeader";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import HideImageIcon from "@mui/icons-material/HideImage";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

const MainCard = ({ post }) => {
  const {
    _id: postId,
    user: userId,
    desc,
    itemURL,
    itemImgURL,
    likes: likeUserIds, // ログインしているユーザーのidが入っていたらいいね中
    createdAt,
  } = post;
  const loginUser = useSelector((state) => state.user.value);
  const [isLiked, setIsLiked] = useState(likeUserIds.includes(loginUser._id));

  const handleLike = async () => {
    try {
      const res = await postApi.like(postId, { userId: loginUser._id });
      if (res.isLiked) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openItemURL = () => {
    window.open(itemURL, "_blank");
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
                cursor: "pointer",
              }}
              onClick={openItemURL}
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
            width: "70%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <UserHeader postUserId={userId} postId={postId} />
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
              <a
                href={`https://twitter.com/share?url=${itemURL}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton aria-label="この投稿をシェアする">
                  <ShareIcon />
                </IconButton>
              </a>
              {loginUser._id && (
                <IconButton
                  aria-label="お気に入りに追加"
                  onClick={() => handleLike()}
                >
                  <FavoriteIcon
                    sx={{
                      color: isLiked ? "hotpink" : "inherit",
                    }}
                  />
                </IconButton>
              )}
              {/* <AvatarList likeUserIds={likeUserIds} /> */}
            </CardActions>
            <Typography sx={{ mr: 3 }}>{format(createdAt)}</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
export default MainCard;
