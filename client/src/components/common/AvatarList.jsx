import { Avatar, AvatarGroup } from "@mui/material";
import React from "react";

const AvatarList = () => {
  return (
    <AvatarGroup max={4}>
      <Avatar alt="いいねしたユーザーのアイコン">😇</Avatar>
      <Avatar alt="いいねしたユーザーのアイコン">😇</Avatar>
      <Avatar alt="いいねしたユーザーのアイコン">😇</Avatar>
      <Avatar alt="いいねしたユーザーのアイコン">😇</Avatar>
      <Avatar alt="いいねしたユーザーのアイコン">😇</Avatar>
      <Avatar alt="いいねしたユーザーのアイコン">😇</Avatar>
    </AvatarGroup>
  );
};

export default AvatarList;
