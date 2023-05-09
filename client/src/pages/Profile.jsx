import React, { useEffect, useState } from "react";
import EmojiPicker from "../components/common/EmojiPicker";
import userApi from "../api/userApi";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import BgImgPicker from "../components/common/BgImgPicker";

const Profile = () => {
  const user = useSelector((state) => state.user.value);
  const [icon, setIcon] = useState("");
  const userProfile = {
    username: "ゆり",
    userIcon: "😊",
    accountCreated: "2023/05/01",
    backgroundImage:
      "url(https://pixabay.com/get/gc7d91fd704e08d39c6dfb3d7b5b71d31d2713b9f5d3413bdfcddb150441f7286e049673ea7fc6a2bb12872356f7b0d1265d86f7be07c5dca228f9010a7aa9756_1280.jpg)",
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
      <BgImgPicker />
    </Box>
  );
};

export default Profile;
