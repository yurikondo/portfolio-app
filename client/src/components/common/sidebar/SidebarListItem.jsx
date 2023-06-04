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
import { useEffect } from "react";

const SidebarListItem = ({ text, icon, path, onItemClick }) => {
  const [activeIndex, setActiveIndex] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // console.log(id);
  // useEffect(() => {
  //   setActiveIndex(paramsId);
  // }, []);

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
