import React, { useRef, useState } from "react";
import { Box, ImageList, ImageListItem } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

const BgImgPicker = () => {
  const itemData = [
    {
      id: 1,
      title: "ほん",
      img: "https://images-fe.ssl-images-amazon.com/images/P/4798066915",
    },
    {
      id: 2,
      title: "ほん",
      img: "https://images-fe.ssl-images-amazon.com/images/P/4798066915",
    },
    {
      id: 3,
      title: "ほん",
      img: "https://images-fe.ssl-images-amazon.com/images/P/4798066915",
    },
    {
      id: 4,
      title: "ほん",
      img: "https://images-fe.ssl-images-amazon.com/images/P/4798066915",
    },
  ];

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
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Google Maps"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
          <DirectionsIcon />
        </IconButton>
      </Paper>
      <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={16}>
        {itemData.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default BgImgPicker;
