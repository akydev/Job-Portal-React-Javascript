import { Padding } from "@mui/icons-material";
import {
  Grid2,
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
import * as Yup from "yup";
import BasicHeader from "../common/BasicHeader";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,

      onSubmit: (values) => {
        //   console.log(values);
        axios.post("http://localhost:4444/auth/login", values).then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("type", res.data.type);
          setTimeout(() => {
            window.location.href = "/jobs";
          }, 1000);
        });
      },
    });
  return (
    <>
      <BasicHeader />
      <Container>
        <Grid2
          container
          justifyContent="center"
          alignItems="center"
          spacing={4}
          sx={{ height: "100vh" }}
        >
          <Grid2 item xs={12} md={6}>
            <Card sx={{ Padding: 4, maxWidth: 500, margin: "auto" }}>
              <CardContent>
                <Typography
                  sx={{ textAlign: "center", py: 0.2 }}
                  variant="h3"
                  component="h3"
                  gutterBottom
                >
                  Login
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="email"
                    type="email"
                    fullWidth
                    label="Email"
                    variant="standard"
                    value={values?.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ mb: 2 }} // Added margin-bottom
                  />
                  <TextField
                    name="password"
                    type="password"
                    fullWidth
                    label="Password"
                    variant="standard"
                    value={values?.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{ mb: 2 }} // Added margin-bottom
                  />

                  <Button fullWidth type="submit" variant="contained">
                    Login
                  </Button>
                </form>
                <Grid2
                  container
                  justifyContent="center"
                  alignItems="center"
                  gap="5px"
                >
                  <Box
                    component="p"
                    sx={{
                      fontWeight: 500,
                      color: "grey.800",
                      fontSize: "1rem",
                    }}
                  >
                    Not registered yet?
                  </Box>
                  <Box
                    component="a"
                    href="/applicant"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                      "&:hover": {
                        color: "primary.dark",
                      },
                    }}
                  >
                    Register now
                  </Box>
                </Grid2>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
