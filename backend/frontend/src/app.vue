<template>
    <div id="app">
      <AddTask @taskAdded="fetchTasks" />
      <TaskList ref="taskList" />
    </div>
  </template>
  
  <script>
  import AddTask from './components/AddTask.vue';
  import TaskList from './components/TaskList.vue';
  
  export default {
    components: {
      AddTask,
      TaskList
    },
    methods: {
      fetchTasks() {
        this.$refs.taskList.fetchTasks();
      }
    }
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  