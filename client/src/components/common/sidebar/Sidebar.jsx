import { useSelector } from "react-redux";
import SidebarListItem from "./SidebarListItem";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
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
  const loginUser = useSelector((state) => state.user.value);

  const apperListData = [
    { id: "home", text: "ホーム", icon: <HomeIcon />, path: "/" },
    {
      id: "profile",
      text: "プロフィールページ",
      icon: <EmojiEmotionsIcon />,
      path: "profile",
    },
    {
      id: "favorite",
      text: "お気に入り",
      icon: <FavoriteIcon />,
      path: "favorite",
    },
    {
      id: "followings",
      text: "フォロー",
      icon: <FavoriteIcon />,
      path: "followings",
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
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
            <Avatar alt="ログインユーザーのアイコン">{loginUser.icon}</Avatar>
            <Typography variant="body1" fontWeight="700" sx={{ ml: 2 }}>
              {loginUser.username ? loginUser.username : "ゲストユーザー"}
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
          {loginUser.username && (
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
          )}
          <Box>
            {loginUser.username && <Box sx={{ pt: "10px" }}></Box>}
            <Divider />
            <Box sx={{ pt: "10px" }}>
              <SidebarListItem
                key="share"
                id="share"
                text="このサイトをシェア"
                icon={<ShareIcon />}
                path="/share"
              />
            </Box>
            {loginUser.username ? (
              <SidebarListItem
                key="logout"
                id="logout"
                text="ログアウト"
                icon={<LogoutOutlined />}
                onItemClick={logout}
                path="/login"
              />
            ) : (
              <>
                <SidebarListItem
                  key="login"
                  id="login"
                  text="ログイン"
                  icon={<LoginIcon />}
                  path="/login"
                />
                <SidebarListItem
                  key="register"
                  id="register"
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
