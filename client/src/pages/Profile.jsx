import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainCard from "../components/common/maincard/MainCard";
import postApi from "../api/postApi";
import UserListItem from "../components/common/UserListItem";
import ProfileHeader from "../components/common/ProfileHeader";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import userApi from "../api/userApi";
import ErrorText from "../components/common/ErrorText";

const Profile = () => {
  const [loginUserPosts, setLoginUserPosts] = useState([]);
  const [followerUsers, setFollowerUsers] = useState([]);
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
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [navigate]);

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

  return (
    <Box>
      <ProfileHeader />
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
