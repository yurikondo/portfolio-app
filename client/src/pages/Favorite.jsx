import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainCard from "../components/common/maincard/MainCard";
import postApi from "../api/postApi";
import { Box, Grid } from "@mui/material";
import ErrorText from "../components/common/ErrorText";

const Favorite = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const loginUser = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  if (!loginUser.username) {
    navigate("/");
  }

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await postApi.getLikedPosts();
        setLikedPosts(res);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [navigate]);

  return (
    <Box>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {likedPosts.length === 0 && (
          <Grid item xs={12}>
            <ErrorText text="まだいいねした投稿はありません" />
          </Grid>
        )}
        {likedPosts.map((post) => (
          <Grid item xs={6}>
            <MainCard key={post._id} post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Favorite;
