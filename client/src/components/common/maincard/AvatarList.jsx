import { Avatar, AvatarGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import userApi from "../../../api/userApi";

const AvatarList = ({ likeUserIds }) => {
  const [likedUsers, setLikedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userApi.getUsersByIds({ likeUserIds: likeUserIds });
        const users = res;
        setLikedUsers(users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [likeUserIds]);

  return (
    <AvatarGroup max={4}>
      {likedUsers.map((likedUser) => (
        <Avatar alt="いいねしたユーザーのアイコン">{likedUser.icon}</Avatar>
      ))}
    </AvatarGroup>
  );
};

export default AvatarList;
