import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MainCard from "../components/common/maincard/MainCard";
import postApi from "../api/postApi";
import UserListItem from "../components/common/UserListItem";
import ProfileHeader from "../components/common/ProfileHeader";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import userApi from "../api/userApi";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [bgImg, setBgImg] = useState("");
  const [icon, setIcon] = useState("");
  const loginUser = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  if (!loginUser.username) {
    navigate("/");
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userApi.getOne(userId);
        setUser(res);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [navigate]);

  // useEffect(() => {
  //   const getPosts = async () => {
  //     try {
  //       const res = await postApi.getProfilePosts();
  //       setPosts(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getPosts();
  // }, [navigate]);

  return (
    <Box>
      <ProfileHeader
        userName={user.username}
        // postsCount={loginUserPosts.length}
        bgImg={user.bgImg}
        setBgImg={setBgImg}
        icon={user.icon}
        setIcon={setIcon}
      />
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={8}>
          {/* {posts.map((post) => (
            <MainCard key={post._id} post={post} />
          ))} */}
        </Grid>
        <Grid item xs={4}>
          {/* <UserListItem /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
