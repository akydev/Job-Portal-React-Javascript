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
  Grid2,
  Rating,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { useTheme } from "../components/ThemeContext";
import { blue, grey } from "@mui/material/colors";
import ApplyViewDialog from "./applicant/ApplyViewDialog";
import FilterDrawerContent from "../components/FilterDrawerContent";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function JobList() {
  const { toggleTheme } = useTheme();

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const [filters, setFilters] = useState({});
  const type = localStorage.getItem("type");

  const handleClose = () => {
    setShowModal(false);
    setId(null);
    setTitle(null);
  };

  const handleOpen = (id, titleName) => {
    setShowModal(true);
    setId(id);
    setTitle(titleName);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const fetchJobs = (filterParams) => {
    let queryString = `http://localhost:4444/api/jobs?`;

    // Add jobType filters to the query string
    if (filterParams.fullTime) {
      queryString += `jobType=Full%20Time&`;
    }
    if (filterParams.partTime) {
      queryString += `jobType=Part%20Time&`;
    }
    if (filterParams.wfh) {
      queryString += `jobType=Work%20from%20Home&`;
    }

    // Add salary range to the query string
    if (filterParams.salaryMin !== undefined && filterParams.salaryMin !== 0) {
      queryString += `salaryMin=${filterParams.salaryMin}&`;
    }
    if (
      filterParams.salaryMax !== undefined &&
      filterParams.salaryMax !== 100000
    ) {
      queryString += `salaryMax=${filterParams.salaryMax}&`;
    }

    // Add duration to the query string
    if (filterParams.duration && filterParams.duration !== "0") {
      queryString += `duration=${filterParams.duration}&`;
    }

    // Add sort order (asc/desc)
    if (filterParams.asc) {
      Object.keys(filterParams.asc).forEach((key) => {
        if (filterParams.asc[key]) {
          queryString += `asc=${key}&`;
        }
      });
    }
    if (filterParams.desc) {
      Object.keys(filterParams.desc).forEach((key) => {
        if (filterParams.desc[key]) {
          queryString += `desc=${key}&`;
        }
      });
    }

    // Trim the trailing "&" or "?" from the query string if necessary
    queryString = queryString.endsWith("&")
      ? queryString.slice(0, -1)
      : queryString;

    // Make API call
    authFetch
      .get(queryString)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch initial data or filtered data when filters change
  useEffect(() => {
    fetchJobs(filters);
  }, [filters]);

  // Handler to apply filters from the drawer
  const handleApplyFilters = (filterData) => {
    setFilters(filterData);
    setDrawerOpen(false); // Close the drawer after applying filters
  };

  return (
    <Container sx={{ paddingBottom: 4, paddingTop: 2 }}>
      {/* <CustomHeader /> */}
      <Grid2
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component="p"
          sx={{
            fontWeight: 500,
            color: "grey.800",
            fontSize: "1rem",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Jobs List
          </Typography>
        </Box>
        <Button
          onClick={toggleDrawer(true)}
          title="Filter Jobs"
          sx={{
            backgroundColor: grey[100],
            "&:hover": {
              backgroundColor: grey[200],
            },
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <FilterListIcon fontSize="medium" />
        </Button>
      </Grid2>
      <SwipeableDrawer
        anchor="top"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        PaperProps={{
          sx: { margin: "144px", alignItems: "center", borderRadius: "10px" },
        }}
      >
        <FilterDrawerContent
          toggleDrawer={toggleDrawer}
          onApplyFilters={handleApplyFilters}
        />
      </SwipeableDrawer>
      <Grid container spacing={4}>
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
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    marginTop: 2,
                    backgroundColor: blue[500],
                    "&:hover": {
                      backgroundColor: blue[400],
                    },
                  }}
                  onClick={() => handleOpen(job._id, job.title)}
                  disabled={type === "recruiter"}
                >
                  Apply
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {showModal && (
        <ApplyViewDialog
          handleClose={handleClose}
          id={id}
          showModal={showModal}
          title={title}
        />
      )}
    </Container>
  );
}
