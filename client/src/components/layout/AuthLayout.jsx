import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
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
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            mt:20,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* LoginとRegisterコンポーネントを表示 */}
          <Outlet />
        </Box>
      </Container>
    </div>
  );
};

export default AuthLayout;
