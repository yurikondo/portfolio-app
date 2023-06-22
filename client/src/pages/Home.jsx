import React, { useEffect, useState } from "react";
import { setPost } from "../redux/features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import MainCard from "../components/common/maincard/MainCard";
import PostForm from "../components/common/PostForm";
import postApi from "../api/postApi";
import UserListItem from "../components/common/UserListItem";
import userApi from "../api/userApi";
import Modal from "../components/common/ModalForm";
import { Box, Button, Grid } from "@mui/material";

function Home() {
  const [latestUsers, setLatestUsers] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.user.value);
  const posts = useSelector((state) => state.post.value);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await postApi.getAll();
        setLatestPosts(res);
        dispatch(setPost(res));
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

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
        <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
          <Button
            onClick={handleOpen}
            sx={{
              display: { xs: "block", md: "none" },
              mb: "10px",
            }}
          >
            新しい投稿する
          </Button>
        </Box>
        <Modal open={open} setOpen={setOpen} />
        {latestPosts.map((post) => (
          <MainCard key={post._id} post={post} />
        ))}
      </Grid>
      <Grid item md={4} sx={{ display: { xs: "none", md: "block" } }}>
        {loginUser.username && (
          <PostForm posts={latestPosts} setPosts={setLatestPosts} />
        )}
        <UserListItem users={latestUsers} loginUser={loginUser} />
      </Grid>
    </Grid>
  );
}

export default Home;
