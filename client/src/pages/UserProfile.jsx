import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MainCard from "../components/common/maincard/MainCard";
import postApi from "../api/postApi";
import userApi from "../api/userApi";
import UserListItem from "../components/common/UserListItem";
import ProfileHeader from "../components/common/ProfileHeader";
import ErrorText from "../components/common/ErrorText";
import { Box, Button, Grid, Typography } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [bgImg, setBgImg] = useState("");
  const [icon, setIcon] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerUserIds, setFollowerUserIds] = useState([]);
  const [followerUsers, setFollowerUsers] = useState([]);
  const loginUser = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userApi.getOne(userId);
        // console.log(res);
        setUser(res);
        // console.log(res.followers.includes(loginUser._id));
        // console.log(loginUser); //undefinedになる
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
    const getFollowingUserIds = async () => {
      try {
        console.log(userId);
        const res = await userApi.getFollowingUserIds(userId);
        console.log(res);
        setFollowerUserIds(res);
        // console.log(followerUserIds);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowingUserIds();
  }, []);

  // useEffect(() => {
  //   const getUsersByIds = async () => {
  //     try {
  //       const res = await userApi.getUsersByIds(userId);
  //       setFollowerUsers(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUsersByIds();
  // }, []);

  const handleFollow = async () => {
    try {
      const res = await userApi.follow(userId);
      if (res.isFollow) {
        setIsFollowing(true);
        // setFollowerUsers(loginUser, ...followerUsers);
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
        profile={false}
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
            <Typography>{followerUsers.length} フォロワー</Typography>
          </Box>
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
