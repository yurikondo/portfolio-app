import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const SidebarListItem = (props) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to={props.path}
        key={props.id}
        id={props.id}
        // selected={index === activeIndex}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ListItemIcon>{props.icon}</ListItemIcon>
          <ListItemText variant="body2" fontWeight="700">
            {props.text}
          </ListItemText>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarListItem;
