import axios from "axios";

const rawBase = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
// Ensure the API base contains `/api` so relative endpoints like `/session` resolve correctly.
const baseURL = rawBase.includes("/api")
  ? rawBase.replace(/\/$/, "")
  : rawBase.replace(/\/$/, "") + "/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
