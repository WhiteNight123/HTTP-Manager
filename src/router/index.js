import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import My from "../views/My.vue";
import Welcome from "../views/Welcome.vue";
import Projects from "../views/Projects.vue";
import NoPage from "../views/404.vue";
import InterfaceTree from "../views/InterfaceTree.vue";
import Dashboard from "../views/Dashboard.vue";
import Members from "../views/Members.vue";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Welcom",
    component: Welcome,
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
    path: "/projects",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/home/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/members",
        name: "Members",
        component: Members,
      },
      {
        path: "/interfaces",
        name: "Interfaces",
        component: InterfaceTree,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: NoPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
