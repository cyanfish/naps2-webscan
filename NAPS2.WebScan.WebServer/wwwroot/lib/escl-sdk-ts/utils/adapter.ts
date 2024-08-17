import type { InternalAxiosRequestConfig } from "axios";
const wxAdapter = (config: InternalAxiosRequestConfig): any => {
  return new Promise((resolve, reject) => {
    // 发送请求
    wx.request({
      url: config.url,
      data: config.data,
      header: config.headers || { "Content-Type": "text/xml" },
      method: config.method || "GET",
      timeout: config.timeout || 200000,
      responseType: config.responseType || "text",
      success(res: any) {
        if (res.statusCode == 200 || res.statusCode == 201) {
          resolve({
            data: res.data || res.tempFilePath,
            status: res.statusCode,
            headers: res.header,
            config: config,
          });
        }
        return reject(res);
      },
      fail(err: any) {
        reject(err);
      },
    });
  });
};
export default wxAdapter;
