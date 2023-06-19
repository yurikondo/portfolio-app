import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MainCard from "../components/common/maincard/MainCard";
import postApi from "../api/postApi";
import UserListItem from "../components/common/UserListItem";
import ProfileHeader from "../components/common/ProfileHeader";
import userApi from "../api/userApi";
import ErrorText from "../components/common/ErrorText";
import { Box, Button, Grid } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [bgImg, setBgImg] = useState("");
  const [icon, setIcon] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerUsers, setFollowerUsers] = useState([]);
  const loginUser = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userApi.getOne(userId);
        setUser(res);
        setIsFollowing(res.followers.includes(loginUser._id));
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

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

  const handleFollow = async () => {
    try {
      const res = await userApi.follow(userId);
      if (res.isFollow) {
        setIsFollowing(true);
        console.log("フォロー成功🎉");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      const res = await userApi.unfollow(userId);
      if (!res.isFollow) {
        setIsFollowing(false);
        console.log("フォロー解除🎉");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        <Grid item xs={12} md={8}>
          {posts.map((post) => (
            <MainCard key={post._id} post={post} />
          ))}
          {posts.length === 0 && (
            <ErrorText text={`まだ${user.username}さんの投稿はありません`} />
          )}
        </Grid>
        <Grid item md={4} sx={{ display: { xs: "none", md: "block" } }}>
          {isFollowing ? (
            <Button
              sx={{
                mr: 2,
              }}
              variant="outlined"
              startIcon={<NotificationsNoneIcon />}
              onClick={handleUnfollow}
            >
              フォロー解除
            </Button>
          ) : (
            <Button
              sx={{
                mr: 2,
              }}
              variant="contained"
              startIcon={<NotificationsNoneIcon />}
              onClick={handleFollow}
            >
              フォローする
            </Button>
          )}
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
