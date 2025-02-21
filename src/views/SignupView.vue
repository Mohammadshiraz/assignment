<template>
    <div class="form-container">
      <h1>Signup</h1>
      <form @submit.prevent="signup">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit" :disabled="loading">
          {{ loading ? "Signing Up..." : "Signup" }}
        </button>
      </form>
  
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from "axios";
  import { useAuthStore } from "../stores/authStore";
  import { useRouter } from "vue-router";
  
  const email = ref("");
  const password = ref("");
  const error = ref("");
  const success = ref("");
  const loading = ref(false);
  const authStore = useAuthStore();
  const router = useRouter();
  
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const validatePassword = (password) => {
    return password.length >= 6; // Adjust rules if needed
  };
  
  const signup = async () => {
    error.value = "";
    success.value = "";
  
    if (!validateEmail(email.value)) {
      error.value = "Invalid email format";
      return;
    }
    if (!validatePassword(password.value)) {
      error.value = "Password must be at least 6 characters long";
      return;
    }
  
    try {
      loading.value = true;
      const response = await axios.post("https://assignment-backend-agjv.onrender.com/api/v1/users/register", {
        email: email.value,
        password: password.value,
      });
  
      if (response.status === 201) {
        success.value = "Signup successful! Redirecting...";
        authStore.signup(email.value);
        setTimeout(() => {
          router.push({ path: "/", query: { welcome: "true" } });
        }, 2000);
      } else {
        error.value = response.data.message || "Something went wrong";
      }
    } catch (err) {
      error.value = err.response?.data?.message || "An error occurred. Please try again.";
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .form-container {
    max-width: 300px;
    margin: 2rem auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
  }
  
  button {
    width: 100%;
    padding: 0.5rem;
    background-color: #333;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
  
  .error {
    color: red;
    text-align: center;
  }
  
  .success {
    color: green;
    text-align: center;
  }
  </style>
  