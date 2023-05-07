import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import postApi from "../../api/postApi";
import { LoadingButton } from "@mui/lab";
import { Box, CardMedia, TextField } from "@mui/material";

const PostForm = () => {
  const [itemUrl, setItemUrl] = useState("");
  const [itemUrlErrText, setItemUrlErrText] = useState("");
  const [descErrText, setDescErrText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onItemUrlChange = async (e) => {
    setItemUrl(e.target.value);
    console.log(itemUrl);
  };

  //フォームから入力されたデータを取得するための処理
  const handleSubmit = async (e) => {
    setItemUrlErrText("");
    setDescErrText("");

    //デフォルトのフォーム送信動作をキャンセル
    e.preventDefault();
    //フォームの文字列を取得(FormDataクラスを使用)
    const data = new FormData(e.target);

    //textFieldのname属性で指定
    const desc = data.get("desc").trim();

    let error = false;

    if (itemUrl === "") {
      error = true;
      setItemUrlErrText("Amazon商品のURLを貼り付けてください");
    }
    if (desc === "") {
      error = true;
      setDescErrText("コメントを入力してください");
    }

    if (error) return;

    setLoading(true);

    //ユーザー新規登録API
    try {
      const res = await postApi.create({
        itemUrl,
        desc,
      });
      setLoading(false);
      console.log("投稿に成功しました🎉");
    } catch (err) {
      //server/routes/auth.jsのバリデーションに引っ掛かったら(レッスン55)
      // const errors = err.data.errors;

      // errors.forEach((err) => {
      //   if (err.param === "itemUrl") {
      //     setItemUrlErrText(err.msg);
      //   }
      //   if (err.param === "desc") {
      //     setDescErrText(err.msg);
      //   }
      // });
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CardMedia
        component="img"
        image="https://images-fe.ssl-images-amazon.com/images/P/4763136739"
        alt="投稿したい商品の画像"
        sx={{
          display: itemUrl ? "block" : "none",
          p: 2,
          width: 250,
          height: 250,
          objectFit: "contain",
        }}
      />
      <TextField
        fullWidth
        id="itemUrl"
        label="Amazon商品のURL"
        margin="normal"
        name="itemUrl"
        required
        helperText={itemUrlErrText}
        error={itemUrlErrText !== ""}
        disabled={loading}
        value={itemUrl}
        onChange={onItemUrlChange}
      />
      <TextField
        fullWidth
        id="desc"
        label="コメント"
        margin="normal"
        name="desc"
        multiline
        rows={4}
        required
        helperText={descErrText}
        error={descErrText !== ""}
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
        投稿する
      </LoadingButton>
    </Box>
  );
};

export default PostForm;
