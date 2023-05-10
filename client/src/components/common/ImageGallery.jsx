import React from "react";
import { ImageList, ImageListItem } from "@mui/material";

const ImageGallery = (props) => {
  const { fetchData } = props;

  return (
    <ImageList sx={{ width: "100%", height: "100%" }} cols={3} rowHeight={164}>
      {fetchData.map((data) => (
        <ImageListItem key={data.id} sx={{ cursor: "pointer" }}>
          <img
            src={`${data.webformatURL}?w=164&h=100&fit=crop&auto=format`}
            srcSet={`${data.webformatURL}?w=164&h=100&fit=crop&auto=format&dpr=2 2x`}
            alt="画像"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageGallery;
