<template>


    <div>
      <h1>Welcome to the Home Page</h1>
      <p v-if="authStore.user">Hello, Welcome back {{ authStore.user.email }}!</p>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '../stores/authStore';
  const authStore = useAuthStore();
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
    margin-top: 2rem;
  }
  </style>