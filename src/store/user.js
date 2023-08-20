import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "user",
  state: () => ({
    token: "",
    loginState: false,
    userId: "",
    userName: "",
  }),
  getters: {},
  actions: {
    setToken(data) {
      this.token = data.token;
      this.loginState = true;
      this.userId = data.id;
      this.userName = data.name;
    },
    clearToken() {
      this.token = "";
      this.loginState = false;
      this.userId = "";
      this.userName = "";
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "http_user",
        storage: localStorage,
        paths: ["token", "loginState", "userId", "userName"],
      },
    ],
  },
});
