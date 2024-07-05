<template>
  <div>
    <h1>{{ isEdit ? 'Edit Task' : 'Create Task' }}</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="title">Title</label>
        <input v-model="task.title" type="text" id="title">
      </div>
      <div>
        <label for="completed">Completed</label>
        <input type="checkbox" v-model="task.completed" id="completed">
      </div>
      <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
import TaskService from '../service/TaskService';

export default {
  data() {
    return {
      task: { title: '', completed: false },
      isEdit: false
    };
  },
  created() {
    if (this.$route.params.id) {
      this.isEdit = true;
      TaskService.getTask(this.$route.params.id).then(response => {
        this.task = response.data;
      });
    }
  },
  methods: {
    submitForm() {
      if (this.isEdit) {
        TaskService.updateTask(this.$route.params.id, this.task).then(() => {
          this.$router.push('/tasks');
        });
      } else {
        TaskService.createTask(this.task).then(() => {
          this.$router.push('/tasks');
        });
      }
    }
  }
};
</script>
../service/TaskService