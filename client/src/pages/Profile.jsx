import React, { useEffect, useState } from "react";
import userApi from "../api/userApi";
import EmojiPicker from "../components/common/pickers/EmojiPicker";
import BgImgPicker from "../components/common/pickers/BgImgPicker";
import { useDispatch, useSelector } from "react-redux";
import MainCard from "../components/common/MainCard";
import postApi from "../api/postApi";
import UserListItem from "../components/common/UserListItem";
import { setPost } from "../redux/features/postSlice";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { grey } from "@mui/material/colors";
import { Box, Button, Typography } from "@mui/material";
import { Grid } from "@mui/material";
// import InputDesc from "../components/common/InputDesc";

const Profile = () => {
  const [icon, setIcon] = useState("");
  const [bgImg, setBgImg] = useState("");
  const [isShowBgImgPicker, setIsShowBgImgPicker] = useState(false);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.value);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await postApi.getAll();
        dispatch(setPost(res));
        // setPosts(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [dispatch]);


  useEffect(() => {
    if (user.bgImg) {
      setBgImg(user.bgImg);
    }
  }, [user.bgImg]);

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
          // backgroundImage: `url(${defaultBgImg})`,
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
          {user.username}
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
      <Grid container spacing={3} sx={{mt: 2}}>
        <Grid item xs={8}>
          {posts.map((post) => (
            <MainCard
              key={post._id}
              postId={post._id}
              desc={post.desc}
              itemImgURL={post.itemImgURL}
              userId={post.user}
              createdAt={post.createdAt}
            />
          ))}
        </Grid>
        <Grid item xs={4}>
          <UserListItem />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
