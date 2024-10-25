import {
  AppBar,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Button,
  Toolbar,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import HomeIcon from "@mui/icons-material/Home"; // Import your chosen icon
import LogoutIcon from "@mui/icons-material/Logout"; // Import the logout icon

export default function CustomHeader() {
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();
  const userType = localStorage.getItem("type");
  const handleMenuClick = (url) => {
    navigate(`/${url}`);
  };
  const isLight = theme.palette.mode === "light";
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
          <HomeIcon sx={{ mr: 1 }} /> {/* Icon with margin */}
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
            My Job Portal
          </a>
        </Typography>
        <List
          sx={{
            maxWidth: "700px",
            display: "flex",
          }}
        >
          <ListItem>
            <Tooltip
              title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
              arrow
            >
              <Box sx={{ cursor: "pointer" }} onClick={toggleTheme}>
                {isLight ? <Brightness4Icon /> : <Brightness7Icon />}
              </Box>
            </Tooltip>
          </ListItem>
          <ListItem button onClick={() => handleMenuClick("jobs")}>
            <ListItemText primary="Home" sx={{ cursor: "pointer" }} />
          </ListItem>
          {userType === "recruiter" ? (
            <>
              <ListItem button onClick={() => handleMenuClick("createjobs")}>
                <ListItemText primary="CreateJob" sx={{ cursor: "pointer" }} />
              </ListItem>
              <ListItem button onClick={() => handleMenuClick("myjobs")}>
                <ListItemText primary="MyJobs" sx={{ cursor: "pointer" }} />
              </ListItem>
            </>
          ) : (
            <ListItem button onClick={() => handleMenuClick("applications")}>
              <ListItemText primary="Applications" sx={{ cursor: "pointer" }} />
            </ListItem>
          )}
          <ListItem button onClick={() => handleMenuClick("profile")}>
            <ListItemText primary="Profile" sx={{ cursor: "pointer" }} />
          </ListItem>
          <ListItem button onClick={() => handleMenuClick("logout")}>
            <ListItemText primary="Logout" sx={{ cursor: "pointer" }} />
            <LogoutIcon sx={{ mx: 1 }} /> {/* Logout icon with margin */}
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
}
