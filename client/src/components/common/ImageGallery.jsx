import React from 'react'
import { ImageList, ImageListItem } from "@mui/material";


const ImageGallery = () => {
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
)
}

export default ImageGallery