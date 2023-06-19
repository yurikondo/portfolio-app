import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainCard from "../components/common/maincard/MainCard";
import postApi from "../api/postApi";
import UserListItem from "../components/common/UserListItem";
import { Box, Grid } from "@mui/material";
import userApi from "../api/userApi";
import ErrorText from "../components/common/ErrorText";

const Followings = () => {
  const [posts, setPosts] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const loginUser = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  if (!loginUser.username) {
    navigate("/");
  }

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await postApi.getFollowingUsersPosts(loginUser._id);
        setPosts(res);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [loginUser._id]);

  useEffect(() => {
    const getFollowingUsers = async () => {
      try {
        const res = await userApi.getFollowingUsers();
        setFollowingUsers(res);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowingUsers();
  }, []);

  return (
    <Box>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={8}>
          {loginUser.followings && loginUser.followings.length > 0 ? (
            posts.map((post) => <MainCard key={post._id} post={post} />)
          ) : (
            <ErrorText text="フォロー中のユーザーがいない or フォローしたユーザーはまだ投稿をしていません" />
          )}
        </Grid>
        <Grid item xs={4}>
          <UserListItem users={followingUsers} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Followings;
