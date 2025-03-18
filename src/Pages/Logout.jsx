import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function Logout() {
  const hasRun = useRef(false); // useRef doesn’t trigger re-renders
  useEffect(() => {
    console.log("@@@@@@@@@@");
    if (!hasRun.current) {
      localStorage.clear();
      toast.success("Your are Logout Successfully");
      hasRun.current = true;
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }, []);
  return null;
}
