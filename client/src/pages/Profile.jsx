import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainCard from "../components/common/MainCard";
import postApi from "../api/postApi";
import UserListItem from "../components/common/UserListItem";
import { setPost } from "../redux/features/postSlice";
import ProfileHeader from "../components/common/ProfileHeader";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";

// import InputDesc from "../components/common/InputDesc";

const Profile = () => {
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
    <Box>
      <ProfileHeader />
      <Grid container spacing={3} sx={{ mt: 2 }}>
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

export default Profile;
