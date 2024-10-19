// src/LandingPage.js

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Box,
} from "@mui/material";
import BasicHeader from "../common/BasicHeader";

const LandingPage = () => {
  return (
    <div>
      {/* Navbar Header */}
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            JobPortal
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar> */}
      <BasicHeader />
      {/* Main Content */}
      <Container>
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Typography variant="h2" gutterBottom>
            Find Your Dream Job
          </Typography>
          <Typography variant="h5" paragraph>
            Explore thousands of job opportunities from top companies.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Browse Jobs
          </Button>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mt: 5 }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6">Job Listings</Typography>
              <Typography variant="body2">
                Access thousands of job listings tailored to your skills.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6">Company Reviews</Typography>
              <Typography variant="body2">
                Read reviews from employees and get insights about companies.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6">Career Resources</Typography>
              <Typography variant="body2">
                Access guides and tips for crafting the perfect resume.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LandingPage;
