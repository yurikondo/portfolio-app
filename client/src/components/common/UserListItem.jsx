import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

export default function UserListItem({ users }) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {users.map((user) => (
        <Box key={user._id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="ユーザーアイコン">{user.icon}</Avatar>
            </ListItemAvatar>
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body1"
                    color="text.primary"
                  >
                    {user.username}
                  </Typography>
                  <br />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CalendarMonthOutlinedIcon
                      sx={{ fontSize: "16px !important", mr: "5px" }}
                    />
                    {new Date(user.createdAt).toLocaleDateString("ja-JP")}
                  </Box>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </Box>
      ))}
    </List>
  );
}
