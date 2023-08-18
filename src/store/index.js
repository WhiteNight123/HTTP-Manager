import { defineStore } from "pinia";

export const useStore = defineStore({
  id: "user",
  state: () => ({
    token: "",
  }),
  getters: {},
  actions: {
    setToken(token) {
      this.token = token;
    },
  },
});
