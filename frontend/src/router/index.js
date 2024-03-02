import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import DatabaseConnection from '@/views/DatabaseConnection.vue';
import QueryData from '@/views/QueryData.vue';
import Connections from "@/views/Connections.vue";

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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;