import axios from "axios";

const apiUrl = "http://localhost:4444/api";
let authFetch = axios.create({
  baseURL: apiUrl,
});

authFetch.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => {
    if (response.status == 401) {
      window.location.href = "/";
      localStorage.removeItem("token");
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authFetch;
