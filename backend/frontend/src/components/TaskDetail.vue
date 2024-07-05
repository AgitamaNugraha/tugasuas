<template>
  <div>
    <h1>{{ task.title }}</h1>
    <p>Completed: {{ task.completed }}</p>
    <router-link :to="'/tasks/' + task.id + '/edit'">Edit</router-link>
  </div>
</template>

<script>
import TaskService from '../services/TaskService';

export default {
  data() {
    return {
      task: {}
    };
  },
  created() {
    TaskService.getTask(this.$route.params.id).then(response => {
      this.task = response.data;
    });
  }
};
</script>../../../src/services/TaskService
