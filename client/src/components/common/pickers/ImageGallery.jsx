import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUser } from "../../../redux/features/userSlice";
import userApi from "../../../api/userApi";
import { ImageList, ImageListItem } from "@mui/material";

const ImageGallery = (props) => {
  const { fetchData } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const handleClick = async (e) => {
    const selectedImgURL = e.target.src;
    dispatch(
      setUser({
        username: user.username,
        icon: user.icon,
        bgImg: selectedImgURL,
      })
    );
    try {
      await userApi.updateBgImg({ bgImg: selectedImgURL });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ImageList
      sx={{ width: "100%", height: "100%", zIndex: 1000 }}
      cols={3}
      rowHeight={164}
    >
      {fetchData.map((data) => (
        <ImageListItem key={data.id} sx={{ cursor: "pointer" }}>
          <img
            src={`${data.webformatURL}?w=164&h=100&fit=crop&auto=format`}
            srcSet={`${data.webformatURL}?w=164&h=100&fit=crop&auto=format&dpr=2 2x`}
            alt="画像"
            loading="lazy"
            onClick={(e) => handleClick(e)}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageGallery;
