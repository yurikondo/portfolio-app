import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainCard from "../components/common/maincard/MainCard";
import postApi from "../api/postApi";
import UserListItem from "../components/common/UserListItem";
import ProfileHeader from "../components/common/ProfileHeader";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import userApi from "../api/userApi";
import ErrorText from "../components/common/ErrorText";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [bgImg, setBgImg] = useState("");
  const [icon, setIcon] = useState("");
  const [followerUsers, setFollowerUsers] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await postApi.getSingleUserPosts(userId);
        setPosts(res);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [navigate, userId]);

  useEffect(() => {
    const getSingleUserFollowerUsers = async () => {
      try {
        const res = await userApi.getSingleUserFollowerUsers(userId);
        setFollowerUsers(res);
      } catch (err) {
        console.log(err);
      }
    };
    getSingleUserFollowerUsers();
  }, []);

  return (
    <Box>
      <ProfileHeader
        userName={user.username}
        postsCount={posts.length}
        bgImg={user.bgImg}
        setBgImg={setBgImg}
        icon={user.icon}
        setIcon={setIcon}
      />
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={8}>
          {posts.map((post) => (
            <MainCard key={post._id} post={post} />
          ))}
          {posts.length === 0 && (
            <ErrorText text={`まだ${user.username}さんの投稿はありません`} />
          )}
        </Grid>
        <Grid item xs={4}>
          <UserListItem users={followerUsers} />
          {followerUsers.length === 0 && (
            <ErrorText
              text={`まだ${user.username}さんのフォロワーはいません`}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
