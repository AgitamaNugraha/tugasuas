<template>
  <div>
    <h2>Task List</h2>
    <ul>
      <li v-for="task in tasks" :key="task._id">
        {{ task.title }}
        <button @click="deleteTask(task._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import TaskService from '../service/TaskService';

export default {
  data() {
    return {
      tasks: []
    };
  },
  async created() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await TaskService.getTasks();
        this.tasks = response.data;
      } catch (error) {
        console.error('There was an error fetching the tasks:', error);
      }
    },
    async deleteTask(id) {
      try {
        await TaskService.deleteTask(id);
        this.fetchTasks();
      } catch (error) {
        console.error('There was an error deleting the task:', error);
      }
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
</style>
