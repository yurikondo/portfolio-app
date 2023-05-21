import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import authUtils from "../../utils/authUtils";
import Sidebar from "../common/sidebar/Sidebar";
import ResponsiveAppBar from "../common/ResponsiveAppBar";
import { Box, Hidden } from "@mui/material";

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //ページ遷移するたびに起動
  //ローカルストレージにトークンが入っているか（ログインしているか）チェック
  useEffect(() => {
    const checkAuth = async () => {
      //認証チェック
      const user = await authUtils.isAuthenticated();
      //ログインしていたら、userを保存する（グローバルに使えるようになる）レッスン73
      if (user) {
        dispatch(
          setUser({
            username: user.username,
            icon: user.icon,
            bgImg: user.bgImg,
          })
        );
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div>
      <Hidden lgUp implementation="css">
        <ResponsiveAppBar />
      </Hidden>
      <Box sx={{ display: "flex" }}>
        <Hidden lgDown implementation="css">
          <Sidebar />
        </Hidden>
        {/* flexGrow を1に設定して、Box要素が可能な限りスペースを占めるようにする。 */}
        {/* width を max-content に設定して、Box要素の幅をその中身に合わせるようにする */}
        <Box sx={{ flexGrow: 1, px: 3, py: 2, width: "max-content" }}>
          {/* Homeコンポーネントを表示 */}
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default AppLayout;
