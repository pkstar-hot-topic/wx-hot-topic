import "./index.json";
import "./index.wxml";
import "./index.scss";

import col, { createComponent, TransferBehavior } from "@codelet/core";

createComponent({
  behaviors: [TransferBehavior],
  data: {
    menus: [
      // {
      //   label: "使用帮助",
      //   icon: "icon-question-o",
      //   arrow: true,
      //   url: "/pages/webview/index",
      //   link: "https://ajuan.daysnap.cn/",
      // },

      // {
      //   label: "反馈与建议",
      //   icon: "icon-newspaper-o",
      //   arrow: true,
      //   url: "/pages/webview/index",
      //   link: "https://ajuan.daysnap.cn/",
      // },
      {
        label: "用户服务协议",
        icon: "icon-info-o",
        arrow: true,
        url: "/pages/agreement/index",
      },
      {
        label: "友链：图文大师",
        icon: "icon-qr",
        arrow: true,
        fn: "toWxOffice",
      },
      {
        label: "设置",
        icon: "icon-setting-o",
        arrow: true,
        url: "/pages/setting/index",
      },
    ],
  },
  methods: {
    toWxOffice() {
      col.navigateToMiniProgram({
        appId: "wx7c8495bbbfb1b1f7",
        path: "pages/home/index",
      });
    },
  },
});
