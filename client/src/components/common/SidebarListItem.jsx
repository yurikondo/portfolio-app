import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const SidebarListItem = ({ id, text, icon, path, onItemClick }) => {
  // const [activeIndex, setActiveIndex] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    if (onItemClick) {
      // setActiveIndex(e.id)
      onItemClick();
    }
    if (path) {
      navigate(path);
    }
  };

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to={path}
        onClick={handleClick}
        // selected={id === activeIndex}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText variant="body2" fontWeight="700">
            {text}
          </ListItemText>
        </Box>
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarListItem;
