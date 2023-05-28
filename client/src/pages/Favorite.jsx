import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MainCard from "../components/common/MainCard";
import postApi from "../api/postApi";
import UserListItem from "../components/common/UserListItem";
import ProfileHeader from "../components/common/ProfileHeader";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

// import InputDesc from "../components/common/InputDesc";

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
        const res = await postApi.getProfilePosts();
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
        <Grid item xs={8}>
          {posts.map((post) => (
            <MainCard
              key={post._id}
              postId={post._id}
              desc={post.desc}
              itemImgURL={post.itemImgURL}
              userId={post.loginUser}
              createdAt={post.createdAt}
            />
          ))}
        </Grid>
        <Grid item xs={4}>
          <UserListItem />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Favorite;