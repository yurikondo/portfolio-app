import * as React from "react";
import { useState, useEffect } from "react";
import userApi from "../../api/userApi";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function UserListItem() {
  const [latestUsers, setLatestUsers] = useState([]);

  useEffect(() => {
    const getLatestUsers = async () => {
      try {
        const res = await userApi.getLatestUsers();
        setLatestUsers(res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getLatestUsers();
  }, []);

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {latestUsers.map((user) => (
        <Box key={user._id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="ユーザーアイコン">{user.icon}</Avatar>
            </ListItemAvatar>
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography
                    // sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {user.username}
                  </Typography>
                  <br />
                  {" — ダミーテキストダミーテキストダミー…"}
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
