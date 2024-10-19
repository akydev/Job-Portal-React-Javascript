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

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

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
    <Container>
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome To Job Portal App
        </Typography>
      </Box>
      <Grid2 container justifyContent="center" spacing={4} sx={{ mb: 5 }}>
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
              <form onSubmit={formik.handleSubmit}>
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

                <Button fullWidth type="submit" variant="contained">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
}
