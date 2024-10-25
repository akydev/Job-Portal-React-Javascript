import { Padding } from "@mui/icons-material";
import {
  Grid,
  Grid2,
  Box,
  Card,
  Button,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { toast } from "react-toastify";
import Chip from "@mui/material/Chip";
import BasicHeader from "../common/BasicHeader";

export default function SignUpForApplicant() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    email: Yup.string()
      .email("Invalid email format.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required."),
  });

  const formik = useFormik({
    initialValues: {
      type: "applicant",
      name: "",
      email: "",
      password: "",
      contactNumber: "",
      education: [{ institutionName: "", startYear: "", endYear: "" }],
      skills: [],
    },

    // initialValues,
    validationSchema,
    onSubmit: (values, action) => {
      axios
        .post("http://localhost:4444/auth/signup", values)
        .then((res) => {
          if (res.data) {
            toast.success("Registration successful!");
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("type", res.data.type);
            action.resetForm();
            setTimeout(() => {
              window.location.href = "/jobs";
            }, 1000);
          }
        })
        .catch((err) => {
          if (err) {
            toast.error(err.message || "An error occurred");
          }
        });
    },
  });

  const paperStyle = { padding: "30px 20px", width: 500, borderRadius: "15px" };
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      if (!formik.values.skills.includes(skillInput.trim())) {
        formik.setFieldValue("skills", [
          ...formik.values.skills,
          skillInput.trim(),
        ]);
      }
      setSkillInput("");
      e.preventDefault();
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    formik.setFieldValue(
      "skills",
      formik.values.skills.filter((skill) => skill !== skillToDelete)
    );
  };

  const handleChangeEducation = (e, index) => {
    const { name, value } = e.target;
    const newEducations = [...formik.values.education];
    newEducations[index] = { ...newEducations[index], [name]: value };
    formik.setFieldValue("education", newEducations);
  };

  const handleAddEducation = () => {
    formik.setFieldValue("education", [
      ...formik.values.education,
      { institutionName: "", startYear: "", endYear: "" },
    ]);
  };

  return (
    <>
      <BasicHeader />

      <Container>
        <Grid container justifyContent="center" spacing={4} sx={{ my: 5 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ padding: 4, maxWidth: 500, margin: "auto" }}>
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
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="email"
                    type="email"
                    fullWidth
                    label="Email"
                    variant="standard"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="password"
                    type="password"
                    fullWidth
                    label="Password"
                    variant="standard"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    sx={{ mb: 2 }}
                  />

                  {formik.values.education.map((item, index) => (
                    <Grid2 size={12} key={index} sx={{ display: "flex" }}>
                      <TextField
                        label={`Institution Name#${index}`}
                        variant="standard"
                        color="secondary"
                        type="text"
                        fullWidth
                        name="institutionName"
                        value={item.institutionName}
                        onChange={(e) => handleChangeEducation(e, index)}
                      />
                      <TextField
                        label="Start Year"
                        variant="standard"
                        color="secondary"
                        type="number"
                        fullWidth
                        name="startYear"
                        value={item.startYear}
                        onChange={(e) => handleChangeEducation(e, index)}
                      />
                      <TextField
                        label="End Year"
                        variant="standard"
                        color="secondary"
                        type="number"
                        fullWidth
                        name="endYear"
                        value={item.endYear}
                        onChange={(e) => handleChangeEducation(e, index)}
                      />
                    </Grid2>
                  ))}

                  <Grid2 size={12}>
                    <Button
                      variant="contained"
                      sx={{
                        fontWeight: 500,
                        backgroundColor: "#433878",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#7E60BF",
                        },
                      }}
                      type="button"
                      fullWidth
                      size="medium"
                      onClick={handleAddEducation}
                    >
                      ADD ANOTHER INSTITUTION DETAILS
                    </Button>
                  </Grid2>
                  <Grid2 size={12}>
                    <TextField
                      label="Skills"
                      variant="standard"
                      color="secondary"
                      placeholder="Press Enter to add skills"
                      fullWidth
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleAddSkill}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    {formik.values.skills.length > 0 && (
                      <div>
                        {formik.values.skills.map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            onDelete={() => handleDeleteSkill(skill)}
                            sx={{ margin: "2px" }}
                          />
                        ))}
                      </div>
                    )}
                  </Grid2>

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
                    Not registered as recruiter yet?
                  </Box>
                  <Box
                    component="a"
                    href="/recruiter"
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
