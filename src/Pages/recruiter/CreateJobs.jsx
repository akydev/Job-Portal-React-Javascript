import {
  Grid2,
  Container,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Paper,
  Button,
  Card,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import authFetch from "../../axiosBaseAuth/interseptor";
import { toast } from "react-toastify";

const cardStyle = {
  padding: "30px 20px",
  borderRadius: "15px",
  width: "100%",
};

export default function CreateJobs() {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });

  const initialValues = {
    title: "",
    maxApplicants: 100,
    maxPositions: 30,
    deadline: new Date().toISOString().split("T")[0],
    skillsets: [],
    jobType: "Full Time",
    duration: 0,
    salary: 0,
  };

  const [skillInput, setSkillInput] = useState("");

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, action) => {
      authFetch
        .post("/jobs", values)
        .then((res) => {
          if (res.data) {
            toast.success(res.data.message);
            setSkillInput("");
            action.resetForm();
          }
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || "An error occurred");
        });
    },
  });

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      if (!values.skillsets.includes(skillInput.trim())) {
        setFieldValue("skillsets", [...values.skillsets, skillInput.trim()]);
      }
      setSkillInput("");
      e.preventDefault();
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setFieldValue(
      "skillsets",
      values.skillsets.filter((skill) => skill !== skillToDelete)
    );
  };

  return (
    // <Container maxWidth="xl" sx={{ display: "flex", padding: "20px" }}>
    //   <Grid2 container justifyContent="center" spacing={4} sx={{ mb: 5 }}>
    //     <Grid2 container>
    //       <Typography
    //         sx={{ textAlign: "center", py: 0.2 }}
    //         variant="h3"
    //         component="h3"
    //         gutterBottom
    //       >
    //         Create Job
    //       </Typography>
    //     </Grid2>
    //     <Grid2 container>
    //       <form onSubmit={formik.handleSubmit}>
    //         <Grid2 container>
    //           <TextField
    //             name="title"
    //             type="text"
    //             fullWidth
    //             label="Title"
    //             variant="standard"
    //             value={formik.values.title}
    //             onChange={formik.handleChange}
    //             onBlur={formik.handleBlur}
    //             error={formik.touched.title && Boolean(formik.errors.title)}
    //             helperText={formik.touched.title && formik.errors.title}
    //             sx={{ mb: 2 }}
    //           />
    //         </Grid2>
    //         <Grid2 container>
    //           {formik.values.skillsets.length > 0 && (
    //             <div>
    //               {formik.values.skillsets.map((skill, index) => (
    //                 <Chip
    //                   key={index}
    //                   label={skill}
    //                   onDelete={() => handleDeleteSkill(skill)}
    //                   sx={{ margin: "2px" }}
    //                 />
    //               ))}
    //             </div>
    //           )}
    //         </Grid2>
    //         <Grid2 container>
    //           <TextField
    //             label="Skills"
    //             variant="standard"
    //             color="secondary"
    //             placeholder="Press Enter to add skills"
    //             fullWidth
    //             value={skillInput}
    //             onChange={(e) => setSkillInput(e.target.value)}
    //             onKeyDown={handleAddSkill}
    //           />
    //         </Grid2>

    //         <Grid2 container>
    //           <FormControl fullWidth>
    //             <InputLabel>Job Type</InputLabel>
    //             <Select
    //               label="Job Type"
    //               color="secondary"
    //               name="jobType"
    //               value={formik.values.jobType}
    //               onChange={formik.handleChange}
    //             >
    //               <MenuItem value="Full Time">Full Time</MenuItem>
    //               <MenuItem value="Part Time">Part Time</MenuItem>
    //               <MenuItem value="Work From Home">Work From Home</MenuItem>
    //             </Select>
    //           </FormControl>
    //         </Grid2>
    //         <Grid2 container>
    //           <FormControl fullWidth>
    //             <InputLabel>Duration</InputLabel>
    //             <Select
    //               label="Duration"
    //               color="secondary"
    //               name="duration"
    //               value={formik.values.duration}
    //               onChange={formik.handleChange}
    //             >
    //               <MenuItem value={0}>Flexible</MenuItem>
    //               <MenuItem value={1}>1 Month</MenuItem>
    //               <MenuItem value={2}>2 Months</MenuItem>
    //               <MenuItem value={3}>3 Months</MenuItem>
    //               <MenuItem value={4}>4 Months</MenuItem>
    //               <MenuItem value={5}>5 Months</MenuItem>
    //               <MenuItem value={6}>6 Months</MenuItem>
    //             </Select>
    //           </FormControl>
    //         </Grid2>
    //         <Grid2 container>
    //           <TextField
    //             label="Salary"
    //             variant="standard"
    //             color="secondary"
    //             type="number"
    //             name="salary"
    //             fullWidth
    //             value={formik.values.salary}
    //             onChange={formik.handleChange}
    //           />
    //         </Grid2>
    //         <Grid2 container>
    //           <TextField
    //             label="Application Deadline"
    //             variant="standard"
    //             color="secondary"
    //             type="date"
    //             name="deadline"
    //             fullWidth
    //             value={formik.values.deadline}
    //             onChange={formik.handleChange}
    //           />
    //         </Grid2>
    //         <Grid2 container>
    //           <TextField
    //             label="Maximum Number Of Applicants"
    //             variant="standard"
    //             color="secondary"
    //             type="number"
    //             name="maxApplications"
    //             fullWidth
    //             value={formik.values.maxApplications}
    //             onChange={formik.handleChange}
    //           />
    //         </Grid2>
    //         <Grid2 container>
    //           <TextField
    //             label="Positions Available"
    //             variant="standard"
    //             color="secondary"
    //             type="number"
    //             name="maxPositions"
    //             fullWidth
    //             value={formik.values.maxPositions}
    //             onChange={formik.handleChange}
    //           />
    //         </Grid2>
    //         <Button fullWidth type="submit" variant="contained">
    //           Create Job
    //         </Button>
    //       </form>
    //     </Grid2>
    //   </Grid2>
    // </Container>

    <Container maxWidth="md" sx={{ display: "flex", padding: "42px" }}>
      <Card elevation={3} square={false} style={cardStyle}>
        <Grid2 container justifyContent="center">
          <Typography variant="h4" component="h4">
            Create Job
          </Typography>
        </Grid2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Grid2 container spacing={3}>
            <Grid2 size={12}>
              <TextField
                label="Title"
                variant="standard"
                color="secondary"
                type="text"
                name="title"
                placeholder="Enter title"
                fullWidth
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
            </Grid2>
            <Grid2 size={12}>
              {values.skillsets.length > 0 && (
                <div>
                  {values.skillsets.map((skill, index) => (
                    <Chip
                      // variant="outlined"
                      key={index}
                      label={skill}
                      onDelete={() => handleDeleteSkill(skill)}
                      sx={{ margin: "2px" }}
                    />
                  ))}
                </div>
              )}
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
              <FormControl fullWidth>
                <InputLabel>Job Type</InputLabel>
                <Select
                  label="Job Type"
                  color="secondary"
                  name="jobType"
                  value={values.jobType}
                  onChange={handleChange}
                >
                  <MenuItem value="Full Time">Full Time</MenuItem>
                  <MenuItem value="Part Time">Part Time</MenuItem>
                  <MenuItem value="Work From Home">Work From Home</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12}>
              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  label="Duration"
                  color="secondary"
                  name="duration"
                  value={values.duration}
                  onChange={handleChange}
                >
                  <MenuItem value={0}>Flexible</MenuItem>
                  <MenuItem value={1}>1 Month</MenuItem>
                  <MenuItem value={2}>2 Months</MenuItem>
                  <MenuItem value={3}>3 Months</MenuItem>
                  <MenuItem value={4}>4 Months</MenuItem>
                  <MenuItem value={5}>5 Months</MenuItem>
                  <MenuItem value={6}>6 Months</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="Salary"
                variant="standard"
                color="secondary"
                type="number"
                name="salary"
                fullWidth
                value={values.salary}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="Application Deadline"
                variant="standard"
                color="secondary"
                type="date"
                name="deadline"
                fullWidth
                value={values.deadline}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="Maximum Number Of Applicants"
                variant="standard"
                color="secondary"
                type="number"
                name="maxApplicants"
                fullWidth
                value={values.maxApplicants}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                label="Positions Available"
                variant="standard"
                color="secondary"
                type="number"
                name="maxPositions"
                fullWidth
                value={values.maxPositions}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 container justifyContent="center" sx={{ width: "100%" }}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                size="medium"
                sx={{
                  padding: "9px 30px",
                  fontSize: "15px",
                }}
              >
                Create Job
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Card>
    </Container>
  );
}
