import React, { useEffect, useState } from "react";
import authFetch from "../axiosBaseAuth/interseptor";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useTheme } from "../components/ThemeContext";
import { blue, grey } from "@mui/material/colors";

export default function JobList() {
  const { toggleTheme } = useTheme();

  const [data, setData] = useState([]);

  const type = localStorage.getItem("type");
  useEffect(() => {
    //  authFetch.get("/job?myjob=1").then(res=>{
    // setData(res.data)})
    authFetch.get("/jobs").then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <Container>
      {/* <CustomHeader /> */}
      <Button variant="contained" onClick={toggleTheme}>
        Toggle Theme
      </Button>
      <Grid container spacing={2}>
        {data.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  {job.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Skills:
                </Typography>
                <Box>
                  {job.skillsets?.map((skill) => (
                    <Chip
                      label={skill}
                      color="secondary"
                      variant="outlined"
                      sx={{ m: 1 }}
                    />
                  ))}
                </Box>
                <Typography
                  variant="subtitle2"
                  marginY={1}
                  sx={{ fontWeight: "bold" }}
                >
                  Job Details
                </Typography>
                <Typography variant="body2" marginY={1}>
                  Job Type: {job.jobType}
                </Typography>
                <Typography variant="body2" marginY={1}>
                  Duration:{" "}
                  {job.duration !== 0 ? `${job.duration} month` : "Flexible"}
                </Typography>

                <Typography color="text.secondary" marginY={1}>
                  Salary: {job.salary}
                </Typography>
                <Typography variant="body2" marginY={1}>
                  Date Of Posting:{" "}
                  {new Date(job.dateOfPosting).toLocaleDateString()}
                </Typography>
                <Typography color="text.secondary" marginY={1}>
                  Applicants: {job.maxApplicants}
                </Typography>
                <Typography color="text.secondary" marginY={1}>
                  Positions: {job.maxPositions - job.acceptedCandidates}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Typography variant="body2" marginY={1}>
                    Rating:
                  </Typography>
                  <Rating value={job.rating} readOnly />
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  type="button"
                  sx={{ backgroundColor: grey[400], color: "white" }}
                  disabled={type === "recruiter"}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
