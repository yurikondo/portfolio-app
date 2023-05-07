import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import SidebarListItem from "./SidebarListItem";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const bottomListData = [
    { id: "share", text: "このサイトをシェア", icon: <ShareIcon /> },
    { id: "logout", text: "ログアウト", icon: <LogoutOutlined /> },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
          // backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* variant プロパティは、テキストの見出しの種類を指定 */}
            <Typography variant="body1" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlined />
            </IconButton>
          </Box>
        </ListItemButton>
        <Divider />
        <Box
          sx={{
            paddingTop: "10px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "93%",
          }}
        >
          <Box>
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
          <Box>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ListItemIcon>
                    <ShareIcon />
                  </ListItemIcon>
                  <ListItemText variant="body2" fontWeight="700">
                    このサイトをシェア
                  </ListItemText>
                </Box>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={logout}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ListItemIcon>
                    <LogoutOutlined />
                  </ListItemIcon>
                  <ListItemText variant="body2" fontWeight="700">
                    ログアウト
                  </ListItemText>
                </Box>
              </ListItemButton>
            </ListItem>
          </Box>
        </Box>
      </List>
    </Drawer>
  );
};

export default Sidebar;
