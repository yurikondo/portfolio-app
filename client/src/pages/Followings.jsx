import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainCard from "../components/common/maincard/MainCard";
import postApi from "../api/postApi";
import UserListItem from "../components/common/UserListItem";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";

const Followings = () => {
  const [posts, setPosts] = useState([]);
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

  return (
    <Box>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={8}>
          {posts.map((post) => (
            <MainCard key={post._id} post={post} />
          ))}
        </Grid>
        <Grid item xs={4}>
          <UserListItem />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Followings;
