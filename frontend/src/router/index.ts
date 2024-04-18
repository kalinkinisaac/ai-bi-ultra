import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Home from "../views/Home.vue"
import DatabaseConnection from "../views/DatabaseConnection.vue";
import QueryData from "../views/QueryData.vue";
import Connections from "../views/Connections.vue";
import ChatDialog from "../views/ChatDialog.vue";
import ChatDev from "../components/ChatWindowDev.vue";
import Session from 'supertokens-auth-react/recipe/session';

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/connect",
    name: "connect",
    component: DatabaseConnection,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/connections",
    name: "connections",
    component: Connections,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/query",
    name: "query",
    component: QueryData,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/chat",
    name: "chat",
    component: ChatDialog,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/chat_dev",
    name: "chatDev",
    component: ChatDev,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/auth/:pathMatch(.*)*",
    name: "auth",
    component: () => import("../views/AuthView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const sessionExists = true //await Session.doesSessionExist();
        if (!sessionExists) {
            next({ name: 'auth' }); // Redirect to the auth route or login page
        } else {
            next(); // Proceed to route
        }
    } else {
        next(); // Ensure to always call next()
    }
});

export default router;
