import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import DatabaseConnection from '@/views/DatabaseConnection.vue';
import QueryData from '@/views/QueryData.vue';
import Connections from "@/views/Connections.vue";
import ChatDialog from "@/views/ChatDialog.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/connect',
    name: 'Connect',
    component: DatabaseConnection
  },
  {
    path: '/connections',
    name: 'Connections',
    component: Connections
  },
  {
    path: '/query',
    name: 'Query',
    component: QueryData
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ChatDialog
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;