import "./index.json";
import "./index.wxml";
import "./index.scss";

import col, {
  createPage,
  TransferBehavior,
  ModelBehavior,
} from "@codelet/core";
import { sleep, getRandomNumber } from "@pkstar/utils";
import { userinfoStorage, withLoading } from "@/utils";

createPage({
  behaviors: [TransferBehavior, ModelBehavior],
  data: {
    isAgreement: false,
  },
  async handleSubmit() {
    if (!this.data.isAgreement) {
      return col.showToast({ title: "请先阅读并同意用户服务协议" });
    }
    await withLoading(async () => {
      await sleep(1000);
      userinfoStorage.setItem({
        token: getRandomNumber(12),
        nickname: "微信用户",
      });
    })();
    col.showToast({ title: "登录成功" });
    await sleep(1000);
    col.navigateBack();
  },
});
