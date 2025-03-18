import { toast } from "react-toastify";
import authFetch from "../axiosBaseAuth/interseptor";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { blue } from "@mui/material/colors";

const DeleteMyJobs = (props) => {
  const handleDelete = () => {
    if (!props.id) return;
    authFetch
      .delete(`/jobs/${props.id}`)
      .then((res) => {
        if (res.data) {
          toast.success(res.data.message);
          props.handleDelClose();
          props.triggerRefresh();
        }
      })
      .catch((err) => {
        if (err) {
          toast.error(err.response.data.message);
          props.handleDelClose();
        }
      });
  };

  return (
    <div>
      <Dialog
        open={props.deleteModal}
        onClose={() => {
          props.handleDelClose();
        }}
        fullWidth
        maxWidth="xs"
        slotProps={{
          backdrop: { style: { backgroundColor: "rgba(0, 0, 0, 0.3)" } },
        }}
      >
        <DialogTitle textAlign="center" sx={{ fontSize: "34px" }}>
          <h4>Job Title: {props.title}</h4>
          Are you sure?
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            type="button"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: blue[800],
              "&:hover": { backgroundColor: blue[600] },
            }}
            onClick={() => {
              props.handleDelClose();
            }}
          >
            Cancle
          </Button>
          <Button
            type="button"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: blue[800],
              "&:hover": { backgroundColor: blue[600] },
            }}
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DeleteMyJobs;
