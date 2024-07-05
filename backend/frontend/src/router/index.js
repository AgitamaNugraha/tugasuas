import Vue from 'vue';
import Router from 'vue-router';
import TaskList from '../components/TaskList.vue';
import TaskDetail from '../../frontend/src/components/TaskDetail.vue';
import TaskForm from '../components/TaskForm.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/tasks', component: TaskList },
    { path: '/tasks/new', component: TaskForm },
    { path: '/tasks/:id', component: TaskDetail },
    { path: '/tasks/:id/edit', component: TaskForm }
  ]
});
