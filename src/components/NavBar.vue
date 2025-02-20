<template>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login" v-if="!authStore.user">Login</router-link>
      <router-link to="/signup" v-if="!authStore.user">Signup</router-link>
      <button @click="authStore.logout" v-if="authStore.user">Logout</button>
    </nav>
  </template>
  
  <script setup>
  import { useAuthStore } from '../stores/authStore';
  const authStore = useAuthStore();
  </script>
  
  <style scoped>
  nav {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    background-color: #333;
    color: white;
  }
  
  nav a {
    color: white;
    text-decoration: none;
  }
  
  nav button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }
  </style>