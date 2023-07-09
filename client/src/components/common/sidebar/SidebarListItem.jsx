import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

const SidebarListItem = (props) => {
  const { text, icon, path, onItemClick } = props;
  const [activeIndex, setActiveIndex] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    if (onItemClick) {
      onItemClick();
    }
    if (path) {
      navigate(path);
    }
  };

  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} to={path} onClick={handleClick}>
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
