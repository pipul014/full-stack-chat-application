import axios from "axios";
// config

// const BASE_URL = 'http://localhost:4000';
const BASE_URL = import.meta.env.VITE_API_URL ;


// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
export { BASE_URL };
