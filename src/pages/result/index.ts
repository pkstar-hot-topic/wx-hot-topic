import "./index.json";
import "./index.wxml";
import "./index.scss";

import col, {
  createPage,
  parseQuery,
  requestAuthorize,
  PreviewBehavior,
} from "@codelet/core";
import { withLoading } from "@/utils";

createPage({
  behaviors: [PreviewBehavior],
  async onLoad(options) {
    const query = parseQuery(options);
    this.setData({ query });
  },
  async handleSave() {
    const { filePath } = this.data.query;
    console.log("handleSave=>", filePath);
    withLoading(async () => {
      // 获取相册权限
      await requestAuthorize({
        scope: "scope.writePhotosAlbum",
      });
      // 保存图片到相册
      await col.saveImageToPhotosAlbum({
        filePath,
      });
      col.showToast({
        title: "保存成功",
      });
    })();
  },
});
