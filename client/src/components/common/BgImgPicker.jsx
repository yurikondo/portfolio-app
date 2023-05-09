import React, { useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ImageGallery from "./ImageGallery";

const BgImgPicker = () => {
  const [fetchData, setFetchData] = useState([]);
  const ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(ref.current.value);

    const endpointURL = `https://pixabay.com/api/?key=31060671-8619a1a4b4b3edab2b473b7fc&q=${ref.current.value}&image_type=photo`;
    // APIを叩く（データフェッチング）：fetch関数はJSの関数
    fetch(endpointURL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFetchData(data);
      });
  };

  return (
    <Box sx={{ width: 500, height: 450 }}>
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
          placeholder="画像を検索"
          inputProps={{ "aria-label": "画像を検索" }}
          inputRef={ref}
        />
        <Button variant="contained" size="small" type="submit">
          検索
        </Button>
      </Paper>
      <ImageGallery/>
    </Box>
  );
};

export default BgImgPicker;
