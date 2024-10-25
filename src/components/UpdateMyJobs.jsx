import { useFormik } from "formik";
import React, { useEffect } from "react";
import authFetch from "../axiosBaseAuth/interseptor";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  TextField,
} from "@mui/material";
import { blue } from "@mui/material/colors";
const initialValues = {
  _id: "",
  activeApplications: 0,
  acceptedCandidates: 0,
  skillsets: [],
  rating: 0,
  userId: "",
  title: "",
  maxApplicants: 0,
  maxPositions: 0,
  dateOfPosting: "",
  deadline: "",
  jobType: "",
  duration: 0,
  salary: 0,
  recruiter: {
    _id: "",
    userId: "",
    name: "",
    contactNumber: "",
    bio: "",
  },
};
const UpdateMyJobs = (props) => {
  console.log(props.updateData);

  const { values, handleChange, handleSubmit, setValues } = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (!props.id) return;
      authFetch
        .put(`/jobs/${props.id}`, values)
        .then((res) => {
          if (res.data) {
            toast.success(res.data.message);
            props.handleClose();
            props.triggerRefresh();
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          props.handleClose();
        });
    },
  });

  useEffect(() => {
    if (props.id) {
      const jobToEdit = props?.updateData?.find((job) => job._id === props.id);
      if (jobToEdit) {
        setValues(jobToEdit);
      }
    }
  }, [props.id, props.updateData, setValues]);
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        slotProps={{
          backdrop: { style: { backgroundColor: "rgba(0,0,0,0.3" } },
        }}
        open={props.open}
        onClose={() => {
          props.handleClose();
        }}
      >
        <DialogTitle textAlign="center" sx={{ fontSize: "36px" }}>
          Update Details
        </DialogTitle>
        <DialogContent>
          <Grid2 size={12}>
            <TextField
              label="Application Deadline"
              margin="dense"
              fullWidth
              variant="outlined"
              name="deadline"
              type="date"
              color="secondary"
              value={values.deadline.split("T")[0]}
              onChange={handleChange}
            />
            <TextField
              label="Maximum Number Of Applicants"
              margin="dense"
              fullWidth
              variant="outlined"
              name="maxApplicants"
              type="number"
              color="secondary"
              value={values.maxApplicants}
              onChange={handleChange}
            />
            <TextField
              label="Positions Available"
              margin="dense"
              fullWidth
              variant="outlined"
              name="maxPositions"
              type="number"
              color="secondary"
              value={values.maxPositions}
              onChange={handleChange}
            />
          </Grid2>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            type="button"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: blue[500],
              "&:hover": {
                backgroundColor: blue[400],
              },
            }}
            onClick={() => {
              props.handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: blue[500],
              "&:hover": {
                backgroundColor: blue[400],
              },
            }}
            onClick={() => handleSubmit()}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateMyJobs;
