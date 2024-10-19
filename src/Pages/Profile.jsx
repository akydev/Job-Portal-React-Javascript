import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/material.css";
import { useFormik } from "formik";
import {
  Button,
  Chip,
  Container,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import authFetch from "../axiosBaseAuth/interseptor";

const paperStyle = {
  padding: "30px 20px",
  borderRadius: "15px",
  width: "100%",
};

export default function Profile() {
  const [skillInput, setSkillInput] = useState("");
  const initialApplicantValues = {
    name: "",
    education: [{ institutionName: "", startYear: "", endYear: "" }],
    skills: [],
    userId: "",
    _id: "",
  };

  const initialRecruterValues = {
    name: "",
    bio: "",
    contactNumber: "",
    userId: "",
    _id: "",
  };

  const userType =
    typeof window !== "undefined" ? localStorage.getItem("type") : null;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    authFetch
      .get("/user")
      .then((res) => {
        const userData = res.data;
        if (userType === "applicant") {
          // Populate applicant form values
          handleApplicant.setValues({
            name: userData.name,
            education: userData.education || [
              { institutionName: "", startYear: "", endYear: "" },
            ],
            skills: userData.skills || [],
            userId: userData.userId,
            _id: userData._id,
          });
        } else if (userType === "recruiter") {
          // Populate recruiter form values
          handleRecruiter.setValues({
            name: userData.name,
            bio: userData.bio || "",
            contactNumber: userData.contactNumber || "",
            userId: userData.userId,
            _id: userData._id,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch user data.");
      });
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      if (!handleApplicant.values.skills.includes(skillInput.trim())) {
        handleApplicant.setFieldValue("skills", [
          ...handleApplicant.values.skills,
          skillInput.trim(),
        ]);
      }
      setSkillInput("");
      e.preventDefault();
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    handleApplicant.setFieldValue(
      "skills",
      handleApplicant.values.skills.filter((skill) => skill !== skillToDelete)
    );
  };

  const handleChangeEducation = (e, index) => {
    const { name, value } = e.target;
    const newEducations = [...handleApplicant.values.education];
    newEducations[index] = { ...newEducations[index], [name]: value };
    handleApplicant.setFieldValue("education", newEducations);
  };

  const handleAddEducation = () => {
    handleApplicant.setFieldValue("education", [
      ...handleApplicant.values.education,
      { institutionName: "", startYear: "", endYear: "" },
    ]);
  };

  const handleApplicant = useFormik({
    initialValues: initialApplicantValues,
    onSubmit: (values) => {
      authFetch
        .put("/user", values)
        .then((res) => {
          if (res.data) {
            toast.success(res.data.message);
            getData();
          }
        })
        .catch((err) => {
          if (err) {
            toast.error(err.data.message);
          }
        });
    },
  });

  const handleRecruiter = useFormik({
    initialValues: initialRecruterValues,
    onSubmit: (values) => {
      authFetch
        .put("/user", values)
        .then((res) => {
          if (res.data) {
            toast.success(res.data.message);
            getData();
          }
        })
        .catch((err) => {
          if (err) {
            toast.error(err.data.message);
          }
        });
    },
  });

  return (
    <Container maxWidth="lg" sx={{ display: "flex", padding: "22px" }}>
      <Paper elevation={15} square={false} style={paperStyle}>
        <Grid2 container justifyContent="center">
          <Typography variant="h4" component="h4" color="secondary">
            Profile
          </Typography>
        </Grid2>
        <form
          autoComplete="off"
          onSubmit={
            userType === "applicant"
              ? handleApplicant.handleSubmit
              : handleRecruiter.handleSubmit
          }
        >
          <Grid2 container spacing={3}>
            {userType === "applicant" ? (
              <>
                <Grid2 size={12}>
                  <TextField
                    label="Name"
                    variant="standard"
                    color="secondary"
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    fullWidth
                    value={handleApplicant.values.name}
                    onChange={handleApplicant.handleChange}
                  />
                </Grid2>
                {handleApplicant.values.education.map((item, index) => (
                  <Grid2
                    size={12}
                    key={index}
                    sx={{
                      display: "flex",
                    }}
                  >
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
                  {handleApplicant.values.skills.length > 0 && (
                    <div>
                      {handleApplicant.values.skills.map((skill, index) => (
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
              </>
            ) : (
              <>
                <Grid2 size={12}>
                  <TextField
                    label="Name"
                    variant="standard"
                    color="secondary"
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    fullWidth
                    value={handleRecruiter.values.name}
                    onChange={handleRecruiter.handleChange}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <TextField
                    label="Bio (upto 250 words)"
                    variant="standard"
                    color="secondary"
                    type="text"
                    name="bio"
                    fullWidth
                    multiline
                    rows={4}
                    value={handleRecruiter.values.bio}
                    onChange={handleRecruiter.handleChange}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <PhoneInput
                    country={"in"}
                    value={handleRecruiter.values.contactNumber}
                    onChange={(phone) =>
                      handleRecruiter.setFieldValue(
                        "contactNumber",
                        `+${phone}`
                      )
                    }
                    enableAreaCodes={true}
                    countryCodeEditable={false}
                  />
                </Grid2>
              </>
            )}
            <Grid2 container justifyContent="center" sx={{ width: "100%" }}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                size="medium"
                sx={{
                  padding: "9px",
                  fontSize: "15px",
                }}
              >
                Update Details
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Paper>
    </Container>
  );
}
