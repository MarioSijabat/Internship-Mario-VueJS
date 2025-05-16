import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue'; // Halaman login
import RegisterView from '@/views/RegisterView.vue'; // Halaman registrasi
import UserListView from '@/views/UserListView.vue'; // Halaman daftar user

const routes = [
  { path: '/', component: LoginView },
  { path: '/login', component: LoginView },  // Halaman login
  { path: '/register', component: RegisterView }, // Halaman registrasi
  { path: '/users', component: UserListView },  // Halaman daftar user
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
