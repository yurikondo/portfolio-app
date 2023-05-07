import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const Profile = () => {
  const userProfile = {
    username: "ゆり",
    userIcon: "😊",
    accountCreated: "2023/05/01",
    backgroundImage:
      "url(https://images-fe.ssl-images-amazon.com/images/P/4763136739)",
    postCount: 10,
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          width: "100%",
          height: 200,
          backgroundImage: userProfile.backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Avatar sx={{ width: 100, height: 100, mt: -5 }}>{userProfile.userIcon}</Avatar>
      <Typography variant="h4" sx={{ marginTop: 2 }}>
        {userProfile.username}
      </Typography>
      <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
        作成日: {userProfile.accountCreated}
      </Typography>

      <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
        投稿数: {userProfile.postCount}
      </Typography>
    </Box>
  );
};

export default Profile;
