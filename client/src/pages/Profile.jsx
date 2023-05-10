import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userApi from "../api/userApi";
import EmojiPicker from "../components/common/EmojiPicker";
import BgImgPicker from "../components/common/BgImgPicker";
import { Box, Button, Typography } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const Profile = () => {
  const [icon, setIcon] = useState("");
  const [isShowBgImgPicker, setIsShowBgImgPicker] = useState(false);
  const user = useSelector((state) => state.user.value);
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

  const showBgImgPicker = () => setIsShowBgImgPicker(!isShowBgImgPicker);

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
          position: "relative",
        }}
      >
        <Button
          onClick={showBgImgPicker}
          variant="contained"
          size="large"
          sx={{ zIndex: 100, position: "absolute", right: 5, bottom: 5 }}
          startIcon={<AddAPhotoIcon fontSize="inherit" />}
        >
          画像を変更
        </Button>
      </Box>
      <EmojiPicker icon={icon} onChange={onIconChange} sx={{ mt: -5 }} />
      <Typography variant="h4" sx={{ marginTop: 2 }}>
        {userProfile.username}
      </Typography>
      <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
        投稿数: {userProfile.postCount}
      </Typography>
      <Box sx={{ display: isShowBgImgPicker ? "block" : "none", mt: 3 }}>
        <BgImgPicker />
      </Box>
    </Box>
  );
};

export default Profile;
