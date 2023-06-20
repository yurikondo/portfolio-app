import React, { useRef, useState } from "react";
import { Alert, Box, Button, Typography } from "@mui/material";
import ImageGallery from "./ImageGallery";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";

const BgImgPicker = ({ isShowBgImgPicker, setIsShowBgImgPicker }) => {
  const [fetchData, setFetchData] = useState([]);
  const ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const endpointURL = `https://pixabay.com/api/?key=31060671-8619a1a4b4b3edab2b473b7fc&q=${ref.current.value}&image_type=photo&orientation=horizontal&per_page=12`;
    // APIを叩く（データフェッチング）：fetch関数はJSの関数
    fetch(endpointURL)
      .then((res) => res.json())
      .then((data) => {
        setFetchData(data.hits);
      });
  };

  return (
    <Box sx={{ width: 500, height: 450, position: "relative" }}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <IconButton type="button" sx={{ p: "10px" }} aria-label="検索">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="ねこ"
          inputProps={{ "aria-label": "画像を検索" }}
          inputRef={ref}
        />
        <Button variant="contained" size="small" type="submit">
          検索
        </Button>
      </Paper>
      {!fetchData.length && (
        <Alert severity="info">
          探したい画像をキーワードで入力してください
        </Alert>
      )}
      <ImageGallery
        fetchData={fetchData}
        sx={{ position: "absolute", zIndex: 1000 }}
      />
    </Box>
  );
};

export default BgImgPicker;
