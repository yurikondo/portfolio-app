import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import MainCard from "../components/common/MainCard";
import PostForm from "../components/common/PostForm";
import postApi from "../api/postApi";
import UserListItem from "../components/common/UserListItem";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await postApi.getAll();
        setPosts(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        {posts.map((post) => (
          <MainCard
            key={post._id}
            desc={post.desc}
            itemImgURL={post.itemImgURL}
            user={post.user}
            createdAt={post.createdAt}
          />
        ))}
      </Grid>
      <Grid item xs={4}>
        <PostForm />
        <UserListItem/>
      </Grid>
    </Grid>
  );
}

export default Home;
