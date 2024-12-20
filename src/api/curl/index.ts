import { Curl, type CurlRequestConfig } from "@codelet/core";

import { log } from "./log";

// export const baseURL = "http://10.50.105.9:9999/"; // https://hot.pkstar.cn/
export const baseURL = "https://hot.pkstar.cn/";

const instance = new Curl({
  baseURL,
  header: {},
  timeout: 30 * 1000,
});

// 日志输出
instance.interceptors.request.use(
  (config) =>
    new Promise((resolve) => {
      const { url, method, data } = config;
      console.log(`${url} [${method}] 请求参数 => `, data);
      resolve(config);
    })
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    console.log("response", response);
    // 对响应数据做点什么
    const { data: respData } = response;
    log(response, "请求返回 => ", respData);

    if (!respData) {
      return Promise.reject(`网络繁忙，请稍后再试(1)`);
    }

    // eslint-disable-next-line prefer-const
    let { code, msg, data } = respData;
    // // token 过期
    // if ([2].includes(status)) {
    //   return Promise.reject(`登录已失效，请重新登录`)
    // }
    if (code !== "S00000") {
      // 处理 err 在 data 的情况
      if (!msg) {
        const errors: any[] = data?.errors;
        if (errors && errors.length) {
          msg = errors.map((item) => item.description).join(" ");
        }
      }
      return Promise.reject(msg || `网络繁忙，请稍后再试(2)`);
    }

    return data;
  },
  (error) => {
    log(error.config, "请求错误 => ", error);

    if (error && error.response) {
      const { code, data: respData } = error.response;
      error = code
        ? `网络繁忙，请稍后再试[${code}]`
        : `网络繁忙，请稍后再试(3)`;
      if (respData && respData.msg) {
        error = respData.msg;
      }
    } else if (error && error.msg) {
      error = error.msg;
    } else {
      error = `网络繁忙，请稍后再试(4)`;
    }
    return Promise.reject(error);
  }
);

export function curl<T = any>(
  url: string,
  data: Record<string, any> = {},
  options: CurlRequestConfig = {}
): Promise<T> {
  return instance.request({
    ...options,
    url,
    data,
  });
}
