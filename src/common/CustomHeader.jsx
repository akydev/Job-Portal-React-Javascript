import {
  AppBar,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CustomHeader() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("type");
  const handleMenuClick = (url) => {
    navigate(`/${url}`);
  };
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
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
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
  );
}
