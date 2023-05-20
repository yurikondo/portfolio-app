import * as React from "react";
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
import { grey } from "@mui/material/colors";
import HideImageIcon from "@mui/icons-material/HideImage";

const MainCard = ({ desc, itemImgURL, user }) => {
  return (
    <Card sx={{ width: "100%", mb: 2 }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "30%", height: 250, flexShrink: 0 }}>
          <Box
            sx={{
              width: "100%",
              backgroundColor: grey[800],
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
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
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
  );
};

export default MainCard;
