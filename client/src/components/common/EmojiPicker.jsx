import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Picker from "@emoji-mart/react";

// npm i @emoji-mart/react
// https://www.npmjs.com/package/emoji-mart
const EmojiPicker = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const showPicker = () => setIsShowPicker(!isShowPicker);

  const selectEmoji = (e) => {
    const emojiCode = e.unified.split("-");
    let codesArray = [];
    //elementのel
    emojiCode.forEach((el) => codesArray.push("0x" + el));
    //fromCodePointはJavaScriptの組み込み関数
    // コードから絵文字に変換
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    // propsで受けとったonChange関数を呼び出す
    props.onChange(emoji);
  };

  return (
    <Box>
      <Avatar
        sx={{ width: 100, height: 100, mt: -5, cursor: "pointer" }}
        onClick={showPicker}
      >
        <Typography variant="h3" fontWeight="700">
          {props.icon}
        </Typography>
      </Avatar>

      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          ml: "-8.5%",
          zIndex: "100",
        }}
      >
        {/* onSelectは絵文字を選択した時 */}
        <Picker onEmojiSelect={selectEmoji} />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
