import React from "react";
import { ImageList, ImageListItem } from "@mui/material";

const ImageGallery = (fetchData) => {
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

  return (
    <></>
    // <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={16}>
    //   {fetchData.map((data) => (
    //     <ImageListItem key={data.id}>
    //       <img
    //         src={`${data.largeImageURL}?w=164&h=164&fit=crop&auto=format`}
    //         srcSet={`${data.largeImageURL}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
    //         alt="画像"
    //         loading="lazy"
    //       />
    //     </ImageListItem>
    //   ))}
    // </ImageList>
  );
};

export default ImageGallery;
