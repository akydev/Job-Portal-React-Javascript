import { CheckBox } from "@mui/icons-material";
import {
  Box,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid2,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const FilterDrawerContent = ({ toggleDrawer }) => {
  const [formObj, setFormObj] = useState({
    jobType: {
      fullTime: false,
      partTime: false,
      wfh: false,
    },
  });
  console.log(formObj);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormObj((prevState) => ({
      ...prevState,
      jobType: {
        ...prevState.jobType,
        [name]: checked,
      },
    }));
  };

  const handleSliderChange = (_event, newValue) => {
    const [min, max] = newValue;
    setFormObj((prevState) => ({
      ...prevState,
      salaryMin: min,
      salaryMax: max,
    }));
  };

  return (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <FormGroup>
        <Grid2
          margin={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography variant="h4" component="h4" sx={{ fontSize: "18px" }}>
            Job Type
          </Typography>

          <Box sx={{ display: "flex", gap: "12px" }}>
            <FormControlLabel
              control={
                <CheckBox
                  name="fullTime"
                  checked={formObj.jobType.fullTime}
                  onChange={handleCheckboxChange}
                />
              }
              label="Full TIme"
            />
            <FormControlLabel
              control={
                <CheckBox
                  name="partTime"
                  checked={formObj.jobType.partTime}
                  onChange={handleCheckboxChange}
                />
              }
              label="Part TIme"
            />
            <FormControlLabel
              control={
                <CheckBox
                  name="wfh"
                  checked={formObj.jobType.wfh}
                  onChange={handleCheckboxChange}
                />
              }
              label="Work From Home"
            />
          </Box>
        </Grid2>
        <Divider />
        <Grid2
          margin={2}
          sx={{
            display: "flex",
            alignItems: "start",
            gap: "30px",
          }}
        >
          <Typography variant="h4" component="h4" sx={{ fontSize: "18px" }}>
            Salary
          </Typography>
          <Box sx={{ width: "300px" }}>
            <Slider
              getAriaLabel={() => "Salary range"}
              value={[formObj.salaryMin, formObj.salaryMax]}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              min={0}
              max={100000}
              step={1000}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">{`$${formObj.salaryMin}`}</Typography>
              <Typography variant="body2">{`$${formObj.salaryMax}`}</Typography>
            </Box>
          </Box>
        </Grid2>
      </FormGroup>
    </Box>
  );
};

export default FilterDrawerContent;
