import axios, {AxiosResponse} from "axios";
import GLOBAL_ENV from "./global.env";

const axiosInstance = axios.create({
  baseURL: GLOBAL_ENV.ENDPOINT,
  timeout: 5000,
  headers: {"X-Custom-Header": "foobar"},
  auth: {
    password: GLOBAL_ENV.API_TOKEN,
    username: GLOBAL_ENV.EMAIL_NAME,
  },
});

axiosInstance.interceptors.response.use(function(response: AxiosResponse) {
  return response.data;
}, function(error) {
  return Promise.reject(error);
});


export default axiosInstance;
