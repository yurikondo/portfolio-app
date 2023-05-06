import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import authUtils from "../../utils/authUtils";
import Sidebar from "../common/Sidebar";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //ページ遷移するたびに起動
  //ローカルストレージにトークンが入っているか（ログインしているか）チェック
  useEffect(() => {
    const checkAuth = async () => {
      //認証チェック
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      } else {
        //ログインしていたら、userを保存する（グローバルに使えるようになる）レッスン73
        dispatch(setUser(user));
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        {/* flexGrow を1に設定して、Box要素が可能な限りスペースを占めるようにする。 */}
        {/* p を1に設定して、上下左右のパディングを1に設定する。 */}
        {/* width を max-content に設定して、Box要素の幅をその中身に合わせるようにする */}
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          {/* Homeコンポーネントを表示 */}
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default AppLayout;
