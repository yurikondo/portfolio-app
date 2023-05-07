import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setMemo } from "../../redux/features/memoSlice";
import { useDispatch, useSelector } from "react-redux";
import memoApi from "../../api/memoApi";
import { Box } from "@mui/system";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlined from "@mui/icons-material/AddBoxOutlined";
import assets from "../../assets/index";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import {
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

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // react-router-domのuseParamsでURLのパラメーターを受け取れる
  const user = useSelector((state) => state.user.value);
  const memos = useSelector((state) => state.memo.value);

  const listData = [
    { id: "home", text: "ホーム", icon: <HomeIcon /> },
    { id: "profile", text: "プロフィールページ", icon: <EmojiEmotionsIcon /> },
    { id: "favorite", text: "お気に入り", icon: <FavoriteIcon /> },
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
        <Box sx={{ paddingTop: "10px" }}></Box>
        {listData.map((item) => (
          <ListItem disablePadding>
            <ListItemButton
            // component={Link}
            // to={`memo/${item._id}`}
            // key={item._id}
            // selected={index === activeIndex}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>

                <ListItemText variant="body2" fontWeight="700">
                  {item.text}
                </ListItemText>
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
