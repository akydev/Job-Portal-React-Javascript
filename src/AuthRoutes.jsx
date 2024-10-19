import React, { Fragment } from "react";
import JobList from "./Pages/JobList";
import CreateJobs from "./Pages/recruiter/CreateJobs";
import MyJobs from "./Pages/recruiter/MyJobs";
import Profile from "./Pages/Profile";
import CustomHeader from "./common/CustomHeader";
import { Route, Routes } from "react-router-dom";
import { useTheme } from "./components/ThemeContext"; // Correct import
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import Logout from "./common/Logout";
import Applications from "./Pages/applicant/Applications";

const AuthRoutes = () => {
  const { theme } = useTheme();

  return (
    <Fragment>
      <MuiThemeProvider theme={theme}>
        <CustomHeader />
        <Routes>
          <Route path="/createjobs" element={<CreateJobs />} />
          <Route path="/myjobs" element={<MyJobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </MuiThemeProvider>
    </Fragment>
  );
};

export default AuthRoutes;
