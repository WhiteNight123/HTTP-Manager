import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import My from "../views/My.vue";
import Welcome from "../views/Welcome.vue";
import Project from "../views/Project.vue";
import Nopage from "../views/404.vue";
import Interface from "../views/Interface.vue";
import Dialog from "../views/Dialog.vue";
import ProjectDetail from "../views/ProjectDetail.vue";
import Dashboard from "../views/Dashboard.vue";
import Users from "../components/Users.vue";

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
    path: "/project",
    name: "Project",
    component: Project,
  },
  {
    path: "/project/:projectId",
    name: "ProjectDetail",
    component: ProjectDetail,
    props: true,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/users",
        name: "Users",
        component: Users,
      },
      {
        path: "/interfaces",
        name: "Interface",
        component: Interface,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: Nopage,
  },
  {
    path: "/dialog",
    name: "Dialog",
    component: Dialog,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
