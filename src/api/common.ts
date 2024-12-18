import type { Userinfo, HotPlatform } from "@/types";
import { withLoading } from "@/utils";

import { curl } from "./curl";

// 登录
export const doUserLoginByPassword = (data: {
  userId: string;
  password: string;
}) =>
  curl(`app/user/password/login`, data, { method: "POST" }).then<Userinfo>(
    (res) => Object.assign({ sessionId: res.__gsessionId }, res.loginInfo)
  );

// 验证码登录
export const doUserLoginBySmsCode = (data: {
  userId: string;
  captcha: string;
}) =>
  curl(`app/user/sms/login`, data, { method: "POST" }).then<Userinfo>((res) =>
    Object.assign({ sessionId: res.__gsessionId }, res.loginInfo)
  );

// 获取验证码
export const doSmsCodeSend = withLoading((data: { userId: string }) =>
  curl(`app/captcha/sms`, data)
);

// 虚拟热搜
export const doHotTopicShoot = withLoading(
  (data: { type: HotPlatform; custom: { title: string; type: string }[] }) =>
    curl(`api/v1/screen-shot/save`, data, {
      method: "POST",
    })
);

// 热搜类型字典
export const reqHotTopicType = withLoading((data: { type: HotPlatform }) =>
  curl(`api/v1/screen-shot/dic`, data, {
    method: "POST",
  })
);
