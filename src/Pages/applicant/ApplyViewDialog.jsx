import { useFormik } from "formik";
import React from "react";
import authFetch from "../../axiosBaseAuth/interseptor";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Style } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
const initialValues = {
  sop: "",
};
export default function ApplyViewDialog(props) {
  console.log(props.title);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values, action) => {
      if (!props.id) return;
      authFetch
        .post(`jobs/${props.id}/applications`, values)
        .then((res) => {
          toast.success(res.data.message);
          action.resetForm();
          props.handleClose();
        })
        .catch((err) => {
          if (err) {
            toast.error(err.response.data.message);
            action.resetForm();
            props.handleClose();
          }
        });
    },
  });
  return (
    <div>
      <Dialog
        open={props.showModal}
        onClose={() => {
          props.handleClose();
        }}
        fullWidth
        maxWidth="md"
        slotProps={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      >
        <DialogTitle textAlign="center">
          Apply For {props.title} Job
        </DialogTitle>
        <DialogContent>
          <TextField
            name="sop"
            type="text"
            fullWidth
            multiline
            rows={8}
            required
            margin="dense"
            label="Write SOP (Upto 250 words)"
            variant="outlined"
            value={values.sop}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            type="button"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: blue[500],
              "&:hover": { backgroundColor: blue[400] },
            }}
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
