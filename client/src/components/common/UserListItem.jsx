import * as React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { grey } from "@mui/material/colors";

export default function UserListItem({ users, loginUser }) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {users.map((user) => (
        <Box key={user._id} sx={{ pt: "10px", width: "100%" }}>
          <Box
            component={Link}
            to={user._id !== loginUser._id ? `/user/${user._id}` : "profile"}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Avatar alt="ユーザーアイコン">{user.icon}</Avatar>
            <Typography
              component="span"
              variant="body1"
              color="text.primary"
              sx={{ ml: "10px" }}
            >
              {user.username}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: "13px",
              pt: "5px",
              pb: "10px",
              color: grey[500],
            }}
          >
            <CalendarMonthOutlinedIcon
              sx={{ fontSize: "16px !important", mr: "5px" }}
            />
            <Typography>
              {new Date(user.createdAt).toLocaleDateString("ja-JP")}
            </Typography>
          </Box>
          <Divider sx={{ width: "100%" }} />
        </Box>
      ))}
    </List>
  );
}
