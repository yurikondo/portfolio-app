import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainCard from "../components/common/maincard/MainCard";
import postApi from "../api/postApi";
import { Box, Grid } from "@mui/material";

const Favorite = () => {
  const [posts, setPosts] = useState([]);
  const loginUser = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  if (!loginUser.username) {
    navigate("/");
  }

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await postApi.getLikedPosts();
        setPosts(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [navigate]);

  return (
    <Box>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {posts.map((post) => (
          <Grid item xs={6}>
            <MainCard key={post._id} post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Favorite;
