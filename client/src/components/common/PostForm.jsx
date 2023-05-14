import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import postApi from "../../api/postApi";
import { LoadingButton } from "@mui/lab";
import { Box, CardMedia, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import HideImageIcon from "@mui/icons-material/HideImage";

const PostForm = () => {
  const [itemUrl, setItemUrl] = useState("");
  const [itemUrlErrText, setItemUrlErrText] = useState("");
  const [descErrText, setDescErrText] = useState("");
  const [loading, setLoading] = useState(false);

  const onItemUrlChange = async (e) => {
    setItemUrlErrText("");
    const inputAmazonURL = e.target.value;

    const isValidAmazonUrl = (url) => {
      const pattern =
        /^(https?:\/\/)?(www\.)?amazon\.[a-z]{2,3}(\.[a-z]{2})?\/.*$/;
      return pattern.test(url);
    };

    if (!isValidAmazonUrl(inputAmazonURL)) {
      setItemUrlErrText("Amazon商品のURLを貼り付けてください");
    }

    const startIndex = inputAmazonURL.indexOf("/dp/") + 4; // "/dp/"の後の文字のインデックスを取得
    const endIndex = startIndex + 10; // 10桁の数字の終了インデックスを計算
    const productId = inputAmazonURL.substring(startIndex, endIndex); // インデックスを使用して部分文字列を抽出
    // setItemUrl(`https://images-fe.ssl-images-amazon.com/images/P/${productId}`);
    // setItemUrl(`https://images.amazon.com/images/P/${productId}._SCTZZZZZZZ_.jpg`);
    setItemUrl(`https://images.amazon.com/images/P/${productId}.jpg`);
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
      <Box
        sx={{
          width: "100%",
          backgroundColor: grey[900],
          borderRadius: "3px",
          height: 250,
          position: "relative",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <ImageSearchIcon
          sx={{
            display: itemUrl ? "none" : "block",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          fontSize="large"
        />
        <HideImageIcon
          sx={{
            display: itemUrl ? "block" : "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          fontSize="large"
        />
        <CardMedia
          component="img"
          image={itemUrl}
          alt="投稿したい商品の画像"
          sx={{
            display: itemUrl ? "block" : "none",
            p: 2,
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
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
        // value={itemUrl}
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
