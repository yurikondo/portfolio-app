import React, { useState } from "react";
import postApi from "../../api/postApi";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../redux/features/postSlice";
import { LoadingButton } from "@mui/lab";
import { Box, Button, CardMedia, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import HideImageIcon from "@mui/icons-material/HideImage";

const PostForm = (props) => {
  const { isShowModal, posts, setPosts, resetForm, itemImgURL, setItemImgURL } =
    props;
  // const [itemImgURL, setItemImgURL] = useState("");
  // const [desc, setDesc] = useState("");
  const [itemImgURLErrText, setItemImgURLErrText] = useState("");
  const [descErrText, setDescErrText] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onItemImgURLChange = async (e) => {
    setItemImgURLErrText("");
    const inputAmazonURL = e.target.value;

    const isValidAmazonUrl = (url) => {
      const pattern =
        /^(https?:\/\/)?(www\.)?amazon\.[a-z]{2,3}(\.[a-z]{2})?\/.*$/;
      return pattern.test(url);
    };

    if (!isValidAmazonUrl(inputAmazonURL)) {
      setItemImgURLErrText("Amazon商品のURLを貼り付けてください");
    }

    const startIndex = inputAmazonURL.indexOf("/dp/") + 4; // "/dp/"の後の文字のインデックスを取得
    const endIndex = startIndex + 10; // 10桁の数字の終了インデックスを計算
    const productId = inputAmazonURL.substring(startIndex, endIndex); // インデックスを使用して部分文字列を抽出
    setItemImgURL(`https://images.amazon.com/images/P/${productId}.jpg`);
  };

  //フォームから入力されたデータを取得するための処理
  const handleSubmit = async (e) => {
    // const inputAmazonURL = e.target.value;
    setItemImgURLErrText("");
    setDescErrText("");

    //デフォルトのフォーム送信動作をキャンセル
    e.preventDefault();
    //フォームの文字列を取得(FormDataクラスを使用)
    const data = new FormData(e.target);

    //textFieldのname属性で指定
    const desc = data.get("desc").trim();
    const itemURL = data.get("itemURL").trim();

    let error = false;

    if (itemImgURL === "") {
      error = true;
      setItemImgURLErrText("Amazon商品のURLを貼り付けてください");
    }
    if (desc === "") {
      error = true;
      setDescErrText("コメントを入力してください");
    }

    if (error) return;

    setLoading(true);

    //投稿API
    try {
      const result = await postApi.create({
        itemURL,
        itemImgURL,
        desc,
      });
      // setItemImgURL("");
      // setDesc("");
      resetForm();
      setLoading(false);
      const newPostsArray = [...posts, result];
      dispatch(setPost(newPostsArray));
      setPosts(newPostsArray);
      isShowModal(false);
      console.log("投稿に成功しました🎉");
    } catch (err) {
      // server/routes/auth.jsのバリデーションに引っ掛かったら
      const errors = err.data.errors;

      errors.forEach((err) => {
        if (err.param === "itemImgURL") {
          setItemImgURLErrText(err.msg);
        }
        if (err.param === "desc") {
          setDescErrText(err.msg);
        }
      });
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
        }}
      >
        <ImageSearchIcon
          sx={{
            display: itemImgURL ? "none" : "block",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          fontSize="large"
        />
        <Box
          sx={{
            display: itemImgURL ? "flex" : "none",
            alignItems: "center",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <HideImageIcon fontSize="large" />
          <Typography sx={{ mt: 1 }}>画像なし</Typography>
        </Box>
        <CardMedia
          component="img"
          image={itemImgURL}
          alt="投稿したい商品の画像"
          sx={{
            display: itemImgURL ? "block" : "none",
            p: 2,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            position: "relative",
            zIndex: 1000,
          }}
        />
      </Box>
      <Button
        component="a"
        href="https://www.amazon.co.jp/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          marginTop: "10px",
        }}
      >
        Amazonトップページへ
      </Button>
      <TextField
        fullWidth
        id="itemURL"
        label="Amazon商品のURL"
        margin="normal"
        name="itemURL"
        required
        helperText={itemImgURLErrText}
        error={itemImgURLErrText !== ""}
        disabled={loading}
        onChange={onItemImgURLChange}
      />
      <TextField
        fullWidth
        id="desc"
        label="コメント（１２０字まで）"
        margin="normal"
        name="desc"
        multiline
        rows={4}
        required
        helperText={descErrText}
        error={descErrText !== ""}
        disabled={loading}
        inputProps={{ maxLength: 140 }}
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
