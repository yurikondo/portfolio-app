import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import authApi from "../api/authApi";

const Login  = () => {
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //フォームから入力されたデータを取得するための処理
  const handleSubmit = async (e) => {
    setUsernameErrText("");
    setPasswordErrText("");

    //デフォルトのフォーム送信動作をキャンセル
    e.preventDefault();
    //フォームの文字列を取得(FormDataクラスを使用)
    const data = new FormData(e.target);

    //textFieldのname属性で指定
    const username = data.get("username").trim();
    const password = data.get("password").trim();

    let error = false;

    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力してください");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("パスワードを入力してください");
    }

    if (error) return;

    setLoading(true);

    //ユーザー新規登録API
    try {
      const res = await authApi.login({
        username,
        password,
      });
      setLoading(false);
      //ローカルストレージにトークンを保存
      localStorage.setItem("token", res.token);
      console.log("ログインに成功しました🎉");
      navigate("/");
    } catch (err) {
      //server/routes/auth.jsのバリデーションに引っ掛かったら(レッスン55)
      const errors = err.data.errors;

      errors.forEach((err) => {
        if (err.param === "username") {
          setUsernameErrText(err.msg);
        }
        if (err.param === "password") {
          setPasswordErrText(err.msg);
        }
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          //エラーテキスト
          helperText={usernameErrText}
          //エラー文が入っていたら赤く表示
          error={usernameErrText !== ""}
          //処理中はフォームに入力できないようにする
          disabled={loading}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={passwordErrText}
          error={passwordErrText !== ""}
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          //mongodbに処理中はボタンを押せないようにする
          loading={loading}
          color="primary"
          variant="outlined"
        >
          ログイン
        </LoadingButton>
      </Box>
      {/* react-router-domのLink */}
      <Button component={Link} to="/register">
        アカウントを持っていませんか？新規登録
      </Button>
    </>
  );
};

export default Login;
