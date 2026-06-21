import axios from "axios";

const rawBase = import.meta.env.VITE_BASE_URL || "";
// Strip any trailing slash and remove an existing /api path so we keep a host-only baseURL.
const baseURL = rawBase
  ? rawBase.replace(/\/$/, "").replace(/\/api$/i, "")
  : "";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
