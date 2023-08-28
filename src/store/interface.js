import { defineStore } from "pinia";

export const interfaceStore = defineStore({
  id: "interface",
  state: () => ({
    interfaceId: "",
  }),
  getters: {
    getInterfaceId() {
      return this.interfaceId;
    },
  },
  actions: {
    setInterfaceId(id) {
      this.interfaceId = id;
    },
    clearInterfaceId() {
      this.interfaceId = "";
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "http_interface",
        storage: localStorage,
        paths: ["interfaceId"],
      },
    ],
  },
});
