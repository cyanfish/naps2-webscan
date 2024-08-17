// src\service\request\index.ts
import axios from "axios";
import { xml2json } from "./xml";

// instance 和 config 的类型由 node_modules\axios\index.d.ts 文件中创建并且封装好了
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

let instance: AxiosInstance;
instance = axios.create();
// Add a request interceptor
instance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    let ContentType = response.headers["content-type"] || response.headers["Content-Type"];
    if (ContentType.indexOf("text/xml") > -1 || ContentType.indexOf("application/xml") > -1) {
      let xml = response.data.toString();
      return xml2json(xml);
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default instance;
