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

const Profile = () => {
  const [posts, setPosts] = useState([]);
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
        setPosts(res);
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
          {posts.map((post) => (
            <MainCard key={post._id} post={post} />
          ))}
        </Grid>
        <Grid item xs={4}>
          <UserListItem users={followerUsers} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
