import { defineStore } from "pinia";
import { login, getUserInfo, logout, resetPwd } from "@/api/user.js";
import { setToken, removeToken } from "@/utils/cookiesUtils.js";
export const useUserStore = defineStore("useUserStore", {
  state: () => ({
    userInfo: "",
    asideWidth: "250px",
    menus: [],
    ruleNames:[]
  }),
  getters: {
    // 展开/缩起侧边
    handleAsideWidth() {
      console.log(this.asideWidth)
      this.asideWidth =this.asideWidth === "250px" ? "64px" : "250px";
    },
  },
  actions: {
    login({ userName, password }) {
      console.log(password);
      return new Promise((resolve, reject) => {
        login(userName, password)
          .then((res) => {
            // 存储 token 和用户相关信息
            setToken(res.token);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then((res) => {
            removeToken();
            this.userInfo = "";
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            this.userInfo = res;
            this.menus = res.menus;
            this.ruleNames = res.ruleNames;
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    resetPwd({ oldPwd, newPwd, checkPwd }) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await resetPwd(oldPwd, newPwd, checkPwd);
          removeToken();
          this.userInfo = "";
          resolve(res);
        } catch (err) {
          reject(err);
        }
      });
    },
  },
});
