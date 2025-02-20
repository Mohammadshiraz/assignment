<template>
  <NavBar />
  <router-view />
</template>

<script setup>
import NavBar from './components/NavBar.vue';
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>