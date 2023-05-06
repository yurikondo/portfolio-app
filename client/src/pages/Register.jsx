import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import authApi from "../api/authApi";

const Register = () => {
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //フォームから入力されたデータを取得するための処理
  const handleSubmit = async (e) => {
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");

    //デフォルトのフォーム送信動作（リロード）をキャンセル
    e.preventDefault();
    //avaScriptのFormDataオブジェクトを使用して、フォームデータを取得する
    const data = new FormData(e.target);

    //textFieldのname属性で指定
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();

    let error = false;

    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力してください");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("パスワードを入力してください");
    }
    if (confirmPassword === "") {
      error = true;
      setConfirmPasswordErrText("確認用パスワードを入力してください");
    }
    if (confirmPassword !== password) {
      error = true;
      setConfirmPasswordErrText("パスワードと確認用パスワードが異なります");
    }

    if (error) return;

    setLoading(true);

    //ユーザー新規登録API
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      //ローカルストレージにトークンを保存
      localStorage.setItem("token", res.token);
      console.log("ユーザー新規登録に成功しました🎉");
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
        if (err.param === "confirmPassword") {
          setConfirmPasswordErrText(err.msg);
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
          //エラー文が入っていたら赤く表示させる
          error={usernameErrText !== ""}
          //mongodbに処理中はフォームに入力できないようにする
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
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
          helperText={confirmPasswordErrText}
          error={confirmPasswordErrText !== ""}
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
          アカウント作成
        </LoadingButton>
      </Box>
      {/* react-router-domのLink */}
      <Button component={Link} to="/login">
        すでにアカウントを持っていますか？ログイン
      </Button>
    </>
  );
};

export default Register;
