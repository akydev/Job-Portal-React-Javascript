// import {
//   AppBar,
//   Button,
//   Menu,
//   MenuItem,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import React from "react";

// export default function BasicHeader() {
//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           <a href="/">My Job Portal</a>
//         </Typography>

//         <Button color="inherit" href="/login">
//           Login
//         </Button>
//         <Button color="inherit" href="/registration">
//           Sign Up
//         </Button>
//         <Menu>
//           <MenuItem href="/applicant">Applicant</MenuItem>
//           <MenuItem href="/recruiter">Recruiter</MenuItem>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// }

import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home"; // Import your chosen icon

export default function BasicHeader() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
          <HomeIcon sx={{ mr: 1, alignItems: "center" }} />{" "}
          {/* Icon with margin */}
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
            My Job Portal
          </a>
        </Typography>
        <Box>
          {" "}
          <Button color="inherit" href="/login">
            Login
          </Button>
          <Button color="inherit" onClick={handleMenuClick}>
            Sign Up
          </Button>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component="a" href="/applicant">
            Applicant
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component="a" href="/recruiter">
            Recruiter
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
