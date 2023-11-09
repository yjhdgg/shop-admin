import axios from "axios";
import { getToken } from "@/utils/cookiesUtils.js";
import { notify } from "@/utils/utils.js";

const request = axios.create({
  timeout: 5000,
  baseURL: "/api",
});

request.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

request.interceptors.response.use(
  (res) => {
    return res.data.data;
  },
  (err) => {
    notify(err.response.data.msg || "请求失败", "error");

    return Promise.reject(err);
  }
);
export default request;
