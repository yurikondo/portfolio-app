import React from "react";
import { Menu, MenuItem, Typography } from "@mui/material";

const MenuBtn = ({ settings, anchorElUser, setAnchorElUser }) => {
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {settings.map((setting) => (
        <MenuItem key={setting.text} onClick={setting.onClick}>
          <Typography textAlign="center">{setting.text}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default MenuBtn;
