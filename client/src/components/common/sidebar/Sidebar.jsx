import { useSelector } from "react-redux";
import SidebarListItem from "./SidebarListItem";
import { pageListData } from "../../../utils/pageListData";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import TwitterIcon from '@mui/icons-material/Twitter';
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
                {pageListData.map(({ id, text, icon, path }) => (
                  <SidebarListItem
                    key={id}
                    text={text}
                    icon={icon}
                    path={path}
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
                text="Twitterでシェア"
                icon={<TwitterIcon />}
                path="https://twitter.com/share?url=https://amapost-5d413f7c5092.herokuapp.com"
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
