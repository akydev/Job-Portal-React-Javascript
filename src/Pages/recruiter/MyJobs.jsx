import React, { useEffect, useState } from "react";
import authFetch from "../../axiosBaseAuth/interseptor";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Container,
  CardActions,
  Button,
  Rating,
  Chip,
  Box,
} from "@mui/material";
// import CustomHeader from "../../common/CustomHeader";
import { styled } from "@mui/system";
import { useTheme } from "../../components/ThemeContext";
import MyJobsChildData from "../../components/MyJobsChildData";
export default function MyJobs() {
  const { toggleTheme } = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const fetchData = () => {
    setLoading(true);
    authFetch
      .get("/jobs?myjobs=1")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  // Function to trigger data refresh
  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <Container>
      {/* <CustomHeader /> */}
      <Button variant="contained" onClick={toggleTheme}>
        Toggle Theme
      </Button>
      <Grid container spacing={2}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {data.map((job) => (
              <MyJobsChildData
                data={job}
                key={job._id}
                triggerRefresh={triggerRefresh}
              />
            ))}
          </>
        )}
      </Grid>
    </Container>
  );
}
