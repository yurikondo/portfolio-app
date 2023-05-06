import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
import notionLogo from "../../assets/images/notion-logo.png";
import authUtils from "../../utils/authUtils";

const AuthLayout = () => {
  const navigate = useNavigate();

  //ページ遷移するたびに起動
  //ローカルストレージにトークンが入っているか（ログインしているか）チェック
  useEffect(() => {
    const checkAuth = async () => {
      //認証チェック
      const isAuth = await authUtils.isAuthenticated();
      if (isAuth) {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div>
      {/* "component"プロパティに設定された値は、Material UIのコンポーネントのHTML要素を指定する */}
      <Container component="main" max-wide="xs">
        {/* Boxは <div> 要素のようなもの */}
        {/* sx プロパティは、styled-systemライブラリで定義されているスタイルプロパティを使用して、コンポーネントにスタイルを適用するために使用 */}
        {/* marginTop: 6：上部の余白を 6 のスペースに設定します。
          display: "flex"：<Box> 要素をフレックスボックスとして表示します。
          alignItems: "center"：フレックスアイテムを中央に配置します。
          flexDirection: "column"：フレックスアイテムを縦方向に配置します。 */}
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* JSX記法↓ */}
          <img
            src={notionLogo}
            alt="Logo"
            style={{ width: 100, height: 100, marginBottom: 3 }}
          />
          Notionクローン
        </Box>
        {/* LoginとRegisterコンポーネントを表示 */}
        <Outlet />
      </Container>
    </div>
  );
};

export default AuthLayout;
