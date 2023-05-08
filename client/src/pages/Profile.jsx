import React, { useEffect, useState } from "react";
import EmojiPicker from "../components/common/EmojiPicker";
import userApi from "../api/userApi";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

const Profile = () => {
  const user = useSelector((state) => state.user.value);
  const [icon, setIcon] = useState("");
  const userProfile = {
    username: "ゆり",
    userIcon: "😊",
    accountCreated: "2023/05/01",
    backgroundImage:
      "url(https://images-fe.ssl-images-amazon.com/images/P/4763136739)",
    postCount: 10,
  };

  useEffect(() => {
    if (user.icon) {
      setIcon(user.icon);
    }
  }, [user.icon]);

  const onIconChange = async (newIcon) => {
    setIcon(newIcon);
    try {
      await userApi.updateIcon({ icon: newIcon });
    } catch (err) {
      alert(err);
    }
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
