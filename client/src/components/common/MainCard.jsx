import * as React from "react";
import assets from "../../assets/index";
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
import { AvatarGroup, Box } from "@mui/material";

const MainCard = () => {
  return (
    <>
      <Card sx={{ width: "100%" }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: 250, height: 250, flexShrink: 0 }}>
            <CardMedia
              component="img"
              image="https://images-fe.ssl-images-amazon.com/images/P/4763136739"
              alt="商品の画像"
              sx={{ p: 2, width: 250, height: 250, objectFit: "contain" }}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
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
                      bgcolor: assets.colors.secondary,
                      width: 56,
                      height: 56,
                    }}
                    aria-label="recipe"
                  >
                    😝
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="ゆりです"
              />
              <CardContent sx={{ py: 0 }}>
                <Typography variant="body" color="text.secondary">
                  読んだことないけど、めっちゃおすすめ！
                  読んだことないけど、めっちゃおすすめ！
                  読んだことないけど、めっちゃおすすめ！
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
                <IconButton aria-label="お気に入りに追加">
                  <FavoriteIcon />
                </IconButton>
                <AvatarGroup max={4}>
                  <Avatar alt="いいねしたユーザーのアイコン">😇</Avatar>
                  <Avatar alt="いいねしたユーザーのアイコン">😇</Avatar>
                  <Avatar alt="いいねしたユーザーのアイコン">😇</Avatar>
                  <Avatar alt="いいねしたユーザーのアイコン">😇</Avatar>
                  <Avatar alt="いいねしたユーザーのアイコン">😇</Avatar>
                  <Avatar alt="いいねしたユーザーのアイコン">😇</Avatar>
                </AvatarGroup>
              </CardActions>
              <Typography sx={{ mr: 3 }}>2023/05/01</Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default MainCard;
