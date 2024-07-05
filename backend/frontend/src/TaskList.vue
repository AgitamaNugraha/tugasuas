<template>
  <div>
    <h2>Task List</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }} - {{ task.description }}
        <button @click="editTask(task)">Edit</button>
        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
    <form v-if="!editing" @submit.prevent="addTask">
      <input type="text" v-model="newTask.title" placeholder="Title" required>
      <input type="text" v-model="newTask.description" placeholder="Description">
      <button type="submit">Add Task</button>
    </form>
    <form v-else @submit.prevent="updateTask">
      <input type="text" v-model="editedTask.title" required>
      <input type="text" v-model="editedTask.description">
      <button type="submit">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </form>
  </div>
</template>

<script>
import TaskService from './services/TaskService';

export default {
  data() {
    return {
      tasks: [],
      newTask: {
        title: '',
        description: ''
      },
      editedTask: {
        id: null,
        title: '',
        description: ''
      },
      editing: false
    };
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await TaskService.getTasks();
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async addTask() {
      try {
        const response = await TaskService.createTask(this.newTask);
        this.tasks.push(response.data); // Add new task to the list
        this.newTask.title = '';
        this.newTask.description = '';
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
    async editTask(task) {
      this.editing = true;
      this.editedTask.id = task.id;
      this.editedTask.title = task.title;
      this.editedTask.description = task.description;
    },
    async updateTask() {
      try {
        await TaskService.updateTask(this.editedTask.id, this.editedTask);
        const index = this.tasks.findIndex(task => task.id === this.editedTask.id);
        if (index !== -1) {
          this.tasks[index] = { ...this.editedTask };
        }
        this.cancelEdit();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
    async deleteTask(id) {
      try {
        await TaskService.deleteTask(id);
        this.tasks = this.tasks.filter(task => task.id !== id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
    cancelEdit() {
      this.editing = false;
      this.editedTask.id = null;
      this.editedTask.title = '';
      this.editedTask.description = '';
    }
  },
  mounted() {
    this.fetchTasks();
  }
};
</script>

<style scoped>
/* Optional: Add scoped styles */
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
form {
  margin-top: 20px;
}
</style>
