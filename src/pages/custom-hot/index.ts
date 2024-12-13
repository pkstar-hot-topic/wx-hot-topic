import "./index.json";
import "./index.wxml";
import "./index.scss";

import col, { createPage, parseEvent, type Event } from "@codelet/core";

createPage({
  data: {
    dataArr: [{ title: "", type: "", index: 0 }],
    options: [{ label: "a", value: 1 }],
  },
  handleInput(e: Event) {
    const { item, value } = parseEvent(e);
    this.setData({
      [`dataArr[${item.index}].title`]: value,
    });
  },
  handlePicker(e: Event) {
    const { item, value } = parseEvent(e);
    console.log(parseEvent(e));
    const { options } = this.data;
    this.setData({
      [`dataArr[${item.index}].type`]: options[value],
    });
  },
  handleAdd() {
    console.log("handleAdd=>", this.data.dataArr);
    const { dataArr } = this.data;
    if (dataArr.length >= 5) {
      col.showToast({
        title: "最多添加5条",
      });
      return;
    }
    dataArr.push({ title: "1", type: "", index: dataArr.length });
    this.setData({
      dataArr,
    });
  },
  handleSubmit() {},
});
