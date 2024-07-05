<template>
  <div>
    <h2>Add New Task</h2>
    <form @submit.prevent="addTask">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="task.title" id="title" required />
      </div>
      <button type="submit">Add Task</button>
    </form>
  </div>
</template>

<script>
import TaskService from '../service/TaskService';

export default {
  data() {
    return {
      task: {
        title: '',
        completed: false
      }
    };
  },
  methods: {
    async addTask() {
      try {
        await TaskService.createTask(this.task);
        this.$emit('taskAdded');
        this.task.title = '';
      } catch (error) {
        console.error('There was an error adding the task:', error);
      }
    }
  }
};
</script>

<style scoped>
form {
  margin-top: 20px;
}
</style>
