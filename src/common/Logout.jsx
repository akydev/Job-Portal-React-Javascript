import React, { useEffect } from "react";
import { toast } from "react-toastify";

export default function Logout() {
  const hasRun = useRef(false); // useRef doesn’t trigger re-renders
  useEffect(() => {
    // console.log("@@@@@@@@@@");
    if (!hasRun) {
      localStorage.clear();
      toast.success("Your are Logout Successfully");

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }, []);
  return null;
}
