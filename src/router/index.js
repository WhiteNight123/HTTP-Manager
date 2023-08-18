import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import My from "../views/My.vue";
import Welcome from "../views/Welcome.vue";
import Nopage from "../views/404.vue";
import Interface from "../views/Interface.vue";

const routes = [
  {
    path: "/",
    name: "Welcom",
    component: Welcome,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/my",
    name: "My",
    component: My,
  },
  {
    path: "/interface",
    name: "Interface",
    component: Interface,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: Nopage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
