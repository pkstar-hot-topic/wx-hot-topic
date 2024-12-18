import { createBehavior } from "@codelet/core";

import type { Userinfo } from "@/types";
import { userinfoStorage } from "@/utils";

export const UserinfoBehavior = createBehavior({
  data: {
    userinfo: null as Partial<Userinfo> | null,
  },
  methods: {
    /**
     * 获取用户信息
     */
    userinfoGet() {
      const userinfo = userinfoStorage.getItem() || null;
      console.log("userinfoGet", userinfo);
      this.setData({ userinfo });
      console.log("userinfoGet", this.data.userinfo);
    },

    /**
     * 用户退出
     */
    userinfoLogout() {
      userinfoStorage.removeItem();
      this.setData({ userinfo: null });
    },
  },
});
