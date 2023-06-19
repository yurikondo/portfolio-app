import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainCard from "../components/common/maincard/MainCard";
import postApi from "../api/postApi";
import UserListItem from "../components/common/UserListItem";
import ProfileHeader from "../components/common/ProfileHeader";
import userApi from "../api/userApi";
import ErrorText from "../components/common/ErrorText";
import { setPost } from "../redux/features/postSlice";
import { Box, Grid } from "@mui/material";

const Profile = () => {
  const [loginUserPosts, setLoginUserPosts] = useState([]);
  const [followerUsers, setFollowerUsers] = useState([]);
  const [bgImg, setBgImg] = useState("");
  const [icon, setIcon] = useState("");
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.user.value);

  const navigate = useNavigate();

  if (!loginUser.username) {
    navigate("/");
  }

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await postApi.getProfilePosts();
        setLoginUserPosts(res);
        dispatch(setPost(res));
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [dispatch]);

  useEffect(() => {
    const getFollowerUsers = async () => {
      try {
        const res = await userApi.getFollowerUsers();
        setFollowerUsers(res);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowerUsers();
  }, []);

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

  return (
    <Box>
      <ProfileHeader
        profile
        userName={loginUser.username}
        postsCount={loginUserPosts.length}
        bgImg={bgImg}
        setBgImg={setBgImg}
        icon={icon}
        setIcon={setIcon}
      />
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={8}>
          {loginUserPosts.map((post) => (
            <MainCard key={post._id} post={post} />
          ))}
          {loginUserPosts.length === 0 && (
            <ErrorText text="まだあなたの投稿はありません" />
          )}
        </Grid>
        <Grid item xs={4}>
          <UserListItem users={followerUsers} />
          {followerUsers.length === 0 && (
            <ErrorText text="まだフォロワーはいません" />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
