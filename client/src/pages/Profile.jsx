import React, { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import EmojiPicker from "../components/common/EmojiPicker";

const Profile = () => {
  const [icon, setIcon] = useState("🙂");
  const userProfile = {
    username: "ゆり",
    userIcon: "😊",
    accountCreated: "2023/05/01",
    backgroundImage:
      "url(https://images-fe.ssl-images-amazon.com/images/P/4763136739)",
    postCount: 10,
  };

  const onIconChange = async (newIcon) => {
    setIcon(newIcon);
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
      <EmojiPicker icon={icon} onChange={onIconChange} sx={{ mt: -5 }} />
      <Typography variant="h4" sx={{ marginTop: 2 }}>
        {userProfile.username}
      </Typography>
      <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
        投稿数: {userProfile.postCount}
      </Typography>
    </Box>
  );
};

export default Profile;
