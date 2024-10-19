import React, { useEffect } from "react";
import { toast } from "react-toastify";

export default function Logout() {
  useEffect(() => {
    console.log("@@@@@@@@@@");
    localStorage.clear();
    toast.success("Your are Logout Successfully");

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }, []);
  return null;
}
