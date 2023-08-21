import { defineStore } from "pinia";

export const projectStore = defineStore({
  id: "project",
  state: () => ({
    projectId: "",
  }),
  getters: {
    getProjectId() {
      return this.projectId;
    },
  },
  actions: {
    setProjectId(id) {
      this.projectId = id;
    },
    clearProjectId() {
      this.projectId = "";
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "http_project",
        storage: localStorage,
        paths: ["projectId"],
      },
    ],
  },
});
