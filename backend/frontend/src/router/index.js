import { createRouter, createWebHistory } from 'vue-router';
import TaskList from '../components/TaskList.vue';
import TaskDetail from '../components/TaskDetail.vue';
import TaskForm from '../components/TaskForm.vue';

const routes = [
  { path: '/tasks', component: TaskList },
  { path: '/tasks/new', component: TaskForm },
  { path: '/tasks/:id', component: TaskDetail },
  { path: '/tasks/:id/edit', component: TaskForm }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
