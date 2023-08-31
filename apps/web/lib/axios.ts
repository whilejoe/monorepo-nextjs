import axios from "axios";
import env from "@beam-australia/react-env";

const instance = axios.create({
  baseURL: env("API_URI"),
  validateStatus: (status) => {
    // Filter out 404's until an error boundary can be created
    return status >= 200 && status < 300;
  },
});

export default instance;
