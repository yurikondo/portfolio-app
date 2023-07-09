import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../api/userApi";
import { setUser } from "../../redux/features/userSlice";

const InputDesc = () => {
  const [isClick, setIsClick] = useState(false);
  const [inputDecs, setInputDecs] = useState("");
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (user.desc) {
      setInputDecs(user.desc);
    } else {
      setInputDecs("一言自己紹介を入力");
    }
  }, []);

  const handleClick = () => {
    setIsClick(true);
  };

  const handleChange = (e) => {
    setInputDecs(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    dispatch(
      setUser({
        desc: data,
        username: user.username,
        icon: user.icon,
        bgImg: user.bgImg,
      })
    );

    if (!data) {
      setInputDecs("一言自己紹介を入力");
    }

    try {
      await userApi.updateDesc({ desc: data });
    } catch (err) {
      console.log(err);
    }

    setIsClick(false);
  };

  const handleBlur = () => {
    setIsClick(false);
  };

  return (
    <Box onClick={handleClick}>
      {isClick ? (
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {/* onBlurは設定した要素以外のところをクリックした時 */}
          <TextField
            id="standard-basic"
            label="一言自己紹介を入力"
            variant="standard"
            autoFocus
            onChange={handleChange}
            onBlur={handleBlur}
            value={user.desc}
            maxLength="20"
            sx={{
              textAlign: "center",
              ".MuiOutlinedInput-input": { padding: 1 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              width: "100%",
              display: "block",
            }}
          />
        </Box>
      ) : (
        <Typography variant="subtitle1" sx={{ p: 1 }}>
          {inputDecs}
        </Typography>
      )}
    </Box>
  );
};

export default InputDesc;
