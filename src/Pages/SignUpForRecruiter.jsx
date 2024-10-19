import { Padding } from "@mui/icons-material";
import {
  Grid,
  Box,
  Card,
  Button,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
// import TextField from "@mui/material/TextField";
// import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

export default function SignUpForRecruiter() {
  const formik = useFormik({
    initialValues: {
      type: "recruiter",
      name: "",
      email: "",
      password: "",
      contactNumber: "",
      bio: "",
    },

    onSubmit: (values) => {
      //   console.log(values);
      axios.post("http://localhost:4444/auth/signup", values).then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("type", res.data.type);
        window.location.href = "/jobs";
      });
    },
  });
  return (
    <Container>
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome To Job Portal App
        </Typography>
      </Box>
      <Grid container justifyContent="center" spacing={4} sx={{ mb: 5 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ Padding: 4, maxWidth: 500, margin: "auto" }}>
            <CardContent>
              <Typography
                sx={{ textAlign: "center", py: 0.2 }}
                variant="h3"
                component="h3"
                gutterBottom
              >
                Sign-up
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  name="name"
                  type="text"
                  fullWidth
                  label="Name"
                  variant="standard"
                  value={formik.values?.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ mb: 2 }} // Added margin-bottom
                />
                <TextField
                  name="email"
                  type="email"
                  fullWidth
                  label="Email"
                  variant="standard"
                  value={formik.values?.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ mb: 2 }} // Added margin-bottom
                />
                <TextField
                  name="password"
                  type="password"
                  fullWidth
                  label="Password"
                  variant="standard"
                  value={formik.values?.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ mb: 2 }} // Added margin-bottom
                />

                <PhoneInput
                  fullWidth
                  country={"in"}
                  value={formik.values.contactNumber}
                  onChange={(phone) =>
                    formik.setFieldValue("contactNumber", `+${phone}`)
                  }
                  onBlur={formik.handleBlur}
                  enableAreaCodes={true}
                  countryCodeEditable={false}
                />
                <TextField
                  name="bio"
                  multiline
                  rows={3}
                  fullWidth
                  label="Bio"
                  variant="standard"
                  sx={{ mb: 4 }}
                  value={formik.values?.bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <Button fullWidth type="submit" variant="contained">
                  Sign Up
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
