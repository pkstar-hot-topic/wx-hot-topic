import "./index.json";
import "./index.wxml";
import "./index.scss";

import { createComponent } from "@codelet/core";

createComponent({
  properties: {
    height: {
      type: String,
      value: "0",
    },
    padding: {
      type: String,
      value: "0",
    },
  },
});
