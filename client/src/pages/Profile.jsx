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
    <Box>
      <Box
        sx={{
          width: "100%",
          height: 200,
          backgroundImage:
            "url(https://pixabay.com/get/g8e041aa4548c8a7c93a04000433929f7d8a03ecb6cbd0e7458921d2f003a990c392343a0b4695449a47589dcbc569e6cdb82812ae03ee798fcc1b50264f3a3b2_640.jpg?w=164&h=100&fit=crop&auto=format&dpr=2)",
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
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <EmojiPicker icon={icon} onChange={onIconChange} sx={{ mt: -5 }} />
        <Typography variant="h4" sx={{ marginTop: 2 }}>
          {user.username}
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
          投稿数: 10
        </Typography>
        <Box sx={{ display: isShowBgImgPicker ? "block" : "none", mt: 3 }}>
          <BgImgPicker />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
