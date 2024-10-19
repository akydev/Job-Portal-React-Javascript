import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const colorSet = {
  applied: blue[600],
  shortlisted: orange[600],
  accepted: green[600],
  rejected: red[600],
  finished: lightBlue[500],
};

const JobApplications = () => {
  const { jobId } = useParams();
  const [data, setData] = useState([]);

  const fetchData = () => {
    authFetch
      .get(`/applicants?jobId=${jobId}&desc=dateOfApplication`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!jobId) return;
    fetchData();
  }, [jobId]);

  const handleUpdateStatus = async (status, id) => {
    try {
      const statusData = {
        status: status,
        dateOfJoining: new Date().toISOString(),
      };
      const res = await authFetch.put(`/applications/${id}`, statusData);
      if (res.data) {
        toast.success(res.data.message);
        fetchData();
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return <div></div>;
};

export default JobApplications;
