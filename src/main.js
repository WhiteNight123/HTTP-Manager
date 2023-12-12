import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.scss";
import "element-plus/theme-chalk/dark/css-vars.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
