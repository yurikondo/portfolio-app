import React, { useState } from "react";
import { useSelector } from "react-redux";
import SidebarListItem from "./SidebarListItem";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";

const Sidebar = () => {
  // react-router-domのuseParamsでURLのパラメーターを受け取れる
  const user = useSelector((state) => state.user.value);

  const apperListData = [
    { id: "home", text: "ホーム", icon: <HomeIcon />, path: "/" },
    {
      id: "profile",
      text: "プロフィールページ",
      icon: <EmojiEmotionsIcon />,
      path: "profile",
    },
    { id: "favorite", text: "お気に入り", icon: <FavoriteIcon /> },
  ];

  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    /* https://mui.com/material-ui/react-drawer/ */
    /* open={true}は常に表示 */
    <Drawer
      container={window.document.body} //親コンテナを指定。window.document.bodyはHTMLの body 要素の直下に表示
      variant="permanent" //表示モードを指定。permanentが指定されているため、常に表示
      open={true} //Drawerが開かれているかどうかを指定。true が指定されているため、開かれた状態で表示
      sx={{ width: 250, height: "100vh" }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              pt: "10px",
              pb: "10px",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* variant プロパティは、テキストの見出しの種類を指定 */}
            <Avatar alt="ログインユーザーのアイコン">{user.icon}</Avatar>
            <Typography variant="body1" fontWeight="700" sx={{ ml: 2 }}>
              {user.username ? user.username : "ゲストユーザー"}
            </Typography>
          </Box>
        </ListItemButton>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          {user.username ? (
            <>
              <Divider />
              <Box sx={{ pt: "10px" }}>
                {apperListData.map((item) => (
                  <SidebarListItem
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    icon={item.icon}
                    path={item.path}
                  />
                ))}
              </Box>
            </>
          ) : (
            <></>
          )}
          <Box>
            {user.username ? <Box sx={{ pt: "10px" }}></Box> : <></>}
            <Divider />
            <Box sx={{ pt: "10px" }}>
              <SidebarListItem
                key={12}
                id={12}
                text="このサイトをシェア"
                icon={<ShareIcon />}
                // path={item.path}
              />
            </Box>
            {user.username ? (
              <SidebarListItem
                key={13}
                id={13}
                text="ログアウト"
                icon={<LogoutOutlined />}
                onItemClick={logout}
                path="/login"
              />
            ) : (
              <>
                <SidebarListItem
                  key={14}
                  id={14}
                  text="ログイン"
                  icon={<LoginIcon />}
                  path="/login"
                />
                <SidebarListItem
                  key={15}
                  id={15}
                  text="新規会員登録"
                  icon={<HowToRegIcon />}
                  path="/register"
                />
              </>
            )}
          </Box>
        </Box>
      </List>
    </Drawer>
  );
};

export default Sidebar;