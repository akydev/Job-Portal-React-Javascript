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
  Grid2,
} from "@mui/material";
// import TextField from "@mui/material/TextField";
// import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import * as Yup from "yup";
import BasicHeader from "../common/BasicHeader";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignUpForRecruiter() {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      type: "recruiter",
      name: "",
      email: "",
      password: "",
      contactNumber: "",
      bio: "",
    },
    validationSchema,

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
    <>
      <BasicHeader />

      <Container>
        <Grid container justifyContent="center" spacing={4} sx={{ my: 5 }}>
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
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="name"
                    type="text"
                    fullWidth
                    label="Name"
                    variant="standard"
                    value={values?.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    sx={{ mb: 2 }} // Added margin-bottom
                  />
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

                  <PhoneInput
                    fullWidth
                    country={"in"}
                    value={values.contactNumber}
                    onChange={(phone) =>
                      setFieldValue("contactNumber", `+${phone}`)
                    }
                    onBlur={handleBlur}
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
                    value={values?.bio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Button fullWidth type="submit" variant="contained">
                    Sign Up
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
                    Not registered as applicant yet?
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
