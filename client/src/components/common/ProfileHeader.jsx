import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmojiPicker from "../../components/common/pickers/EmojiPicker";
import BgImgPicker from "../../components/common/pickers/BgImgPicker";
import userApi from "../../api/userApi";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { grey } from "@mui/material/colors";
import { Box, Button, Typography } from "@mui/material";

const ProfileHeader = () => {
  const [bgImg, setBgImg] = useState("");
  const [icon, setIcon] = useState("");
  const [isShowBgImgPicker, setIsShowBgImgPicker] = useState(false);
  const loginUser = useSelector((state) => state.user.value);

  useEffect(() => {
    if (loginUser.bgImg) {
      setBgImg(loginUser.bgImg);
    }
  }, [loginUser.bgImg]);

  useEffect(() => {
    if (loginUser.icon) {
      setIcon(loginUser.icon);
    }
  }, [loginUser.icon]);

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
    <>
      <Box
        sx={{
          width: "100%",
          height: 200,
          backgroundColor: grey[800],
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 200,
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            position: "absolute",
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
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <EmojiPicker icon={icon} onChange={onIconChange} sx={{ mt: -5 }} />
        <Typography variant="h4" sx={{ marginTop: 2 }}>
          {loginUser.username}
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
          投稿数: 10
        </Typography>
        {/* <InputDesc /> */}
        <Box sx={{ display: isShowBgImgPicker ? "block" : "none", mt: 3 }}>
          <BgImgPicker
            isShowBgImgPicker={isShowBgImgPicker}
            setIsShowBgImgPicker={setIsShowBgImgPicker}
          />
        </Box>
      </Box>
    </>
  );
};

export default ProfileHeader;
