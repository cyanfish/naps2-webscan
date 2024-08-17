// src\service\request\index.ts
import axios from "axios";
import { xml2json } from "./xml";
import wxAdapter from "./adapter";

// instance 和 config 的类型由 node_modules\axios\index.d.ts 文件中创建并且封装好了
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

declare type EnvType = "node" | "wx" | "browser";
export const getEnv = (): EnvType => {
  try {
    if ("window") {
      if ("wx") {
        return "wx";
      } else {
        return "browser";
      }
    } else {
      return "node";
    }
  } catch (err) {
    return "node";
  }
};

let env = getEnv();
let instance: AxiosInstance;
console.log("e", env);
if (env == "wx") {
  instance = axios.create({
    adapter: (config) => {
      return wxAdapter(config);
    },
  });
} else {
  instance = axios.create();
}
// Add a request interceptor
instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
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
