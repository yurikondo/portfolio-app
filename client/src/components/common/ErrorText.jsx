import React from "react";
import SellIcon from "@mui/icons-material/Sell";
import { Box, Typography } from "@mui/material";

const ErrorText = ({ text }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <SellIcon sx={{ mr: 1 }} />
      <Typography>{text}</Typography>
    </Box>
  );
};

export default ErrorText;
