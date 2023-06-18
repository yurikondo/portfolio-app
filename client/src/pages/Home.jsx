import React, { useEffect, useState } from "react";
import { setPost } from "../redux/features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import MainCard from "../components/common/maincard/MainCard";
import PostForm from "../components/common/PostForm";
import postApi from "../api/postApi";
import UserListItem from "../components/common/UserListItem";
import { Grid } from "@mui/material";
import userApi from "../api/userApi";

function Home() {
  const [latestUsers, setLatestUsers] = useState([]);
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.user.value);
  const posts = useSelector((state) => state.post.value);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await postApi.getAll();
        dispatch(setPost(res));
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [dispatch]);

  useEffect(() => {
    const getLatestUsers = async () => {
      try {
        const res = await userApi.getLatestUsers();
        setLatestUsers(res);
      } catch (err) {
        console.log(err);
      }
    };
    getLatestUsers();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        {posts.map((post) => (
          <MainCard key={post._id} post={post} />
        ))}
      </Grid>
      <Grid item md={4} sx={{ display: { xs: "none", md: "block" } }}>
        {loginUser.username && <PostForm />}
        <UserListItem users={latestUsers} />
      </Grid>
    </Grid>
  );
}

export default Home;
