import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUpForRecruiter from "./Pages/SignUpForRecruiter";
import SignUpForApplicant from "./Pages/SignUpForApplicant";

import JobList from "./Pages/JobList";
import Login from "./Pages/Login";
import LandingPage from "./Pages/LandingPage";
import CreateJobs from "./Pages/recruiter/CreateJobs";
import MyJobs from "./Pages/recruiter/MyJobs";
import Profile from "./Pages/Profile";
import CustomHeader from "./common/CustomHeader";
import AuthRoutes from "./AuthRoutes";
import { ThemeProvider } from "./components/ThemeContext";
import ToastifyContainer from "./common/ToastifyContainer";

function App() {
  return (
    <React.Fragment>
      <ToastifyContainer />
      <Routes>
        <Route
          path="/*"
          element={
            <ThemeProvider>
              <AuthRoutes />
            </ThemeProvider>
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="/recruiter" element={<SignUpForRecruiter />} />
        <Route path="/applicant" element={<SignUpForApplicant />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
