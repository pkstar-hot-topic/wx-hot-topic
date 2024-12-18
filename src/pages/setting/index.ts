import "./index.json";
import "./index.wxml";
import "./index.scss";

import col, { createPage, TransferBehavior } from "@codelet/core";

import { UserinfoBehavior } from "@/behaviors";

createPage({
  behaviors: [UserinfoBehavior, TransferBehavior],
  data: {
    menus: [
      {
        label: "权限管理",
        arrow: true,
        fn: "handleAuth",
      },
      {
        label: "用户服务协议",
        arrow: true,
        url: "/pages/agreement/index",
      },
    ],
  },
  handleAuth() {
    col.openSetting({});
  },
  async handleLogout() {
    const result = await col.showModal({
      title: "温馨提示",
      content: "确定要退出登录吗？",
    });
    if (result.cancel) {
      return;
    }
    this.userinfoLogout();
    col.showToast({ title: "退出成功" });
  },
});
