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
      "url(https://pixabay.com/get/g2a9f517799f1959586ae1429b2c076511317c68d484e8fd293c1deb38df644436eaac5e23ca9f4b68ca70ab6d8aca97c54ad6542382a7cb6dcb4c23497db360a_1280.jpg)",
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
