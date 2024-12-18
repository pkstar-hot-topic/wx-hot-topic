import "./index.json";
import "./index.wxml";
import "./index.scss";

import { clone } from "@pkstar/utils";
import col, {
  createPage,
  parseEvent,
  parseQuery,
  promisify,
  requestAuthorize,
  type Event,
} from "@codelet/core";
import { reqHotTopicType, doHotTopicShoot } from "@/api";
import { UserinfoBehavior } from "@/behaviors";

createPage({
  behaviors: [UserinfoBehavior],
  data: {
    dataArr: [{ title: "", type: "", index: 0 }] as Array<{
      title: string;
      type: "" | any;
      index: number;
    }>,
    options: [] as any[],
  },
  onShow() {
    this.userinfoGet();
  },
  async onLoad(options) {
    const query = parseQuery(options);
    const res = await reqHotTopicType({ type: query.value });
    this.setData({
      options: res,
      query,
    });
  },
  handleInput(e: Event) {
    const { item, value } = parseEvent(e);
    this.setData({
      [`dataArr[${item.index}].title`]: value,
    });
  },
  handlePicker(e: Event) {
    const { item, value } = parseEvent(e);
    const { options } = this.data;
    // console.log(parseEvent(e), options);

    this.setData({
      [`dataArr[${item.index}].type`]: options[value],
    });
  },
  handleAdd() {
    // console.log("handleAdd=>", this.data.dataArr);
    const { dataArr } = this.data;
    if (dataArr.length >= 5) {
      col.showToast({
        title: "最多添加5条",
      });
      return;
    }
    dataArr.push({ title: "", type: "", index: dataArr.length });
    this.setData({
      dataArr,
    });
  },
  async handleSubmit() {
    const { dataArr, query, userinfo } = this.data;
    if (!userinfo) {
      col.navigateTo({
        url: "/pages/login/index",
      });
      return;
    }
    if (dataArr.some((item) => !item.title)) {
      col.showToast({
        title: "请填写完整",
      });
      return;
    }
    const custom = clone(dataArr).reduce((acc, item) => {
      item.type = item.type?.value || "";
      acc.push(item);
      return acc;
    }, [] as any[]);

    const base64 = await doHotTopicShoot({
      type: query.value,
      custom,
    });

    const fs = col.getFileSystemManager();
    const imageName = `${Date.now()}${new Array(6)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10))
      .join("")}.jpeg`;
    const filePath = `${wx.env.USER_DATA_PATH}/${imageName}`;
    // 读取base64图片
    await promisify(fs.writeFile)({
      filePath,
      encoding: "base64",
      data: base64,
    });

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
  },
});
