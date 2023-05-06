import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import React from "react";

const PostForm = () => {
  const handleSubmit = () => {};
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField
        fullWidth
        id="description"
        label="コメント"
        margin="normal"
        name="description"
        type="description"
        multiline
        rows={4}
        required
        // helperText={passwordErrText}
        // error={passwordErrText !== ""}
        // disabled={loading}
      />
      <LoadingButton
        sx={{ mt: 3, mb: 2 }}
        fullWidth
        type="submit"
        //mongodbに処理中はボタンを押せないようにする
        // loading={loading}
        // color="primary"
        variant="outlined"
      >
        投稿する
      </LoadingButton>
    </Box>
  );
};

export default PostForm;
