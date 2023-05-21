import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainCard from "../components/common/MainCard";
import PostForm from "../components/common/PostForm";
import postApi from "../api/postApi";
import UserListItem from "../components/common/UserListItem";
import { Grid } from "@mui/material";
import { setPost } from "../redux/features/postSlice";

function Home() {
  // const [posts, setPosts] = useState([]);
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

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        {posts.map((post) => (
          <MainCard
            key={post._id}
            postId={post._id}
            desc={post.desc}
            itemImgURL={post.itemImgURL}
            user={post.user}
            createdAt={post.createdAt}
          />
        ))}
      </Grid>
      <Grid item xs={4}>
        <PostForm />
        <UserListItem />
      </Grid>
    </Grid>
  );
}

export default Home;
