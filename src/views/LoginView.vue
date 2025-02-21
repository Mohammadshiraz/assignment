<template>
  <div class="form-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}
      </button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
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
const loading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => password.length >= 6;

const login = async () => {
  error.value = "";

  if (!validateEmail(email.value)) {
    error.value = "Invalid email format.";
    return;
  }
  if (!validatePassword(password.value)) {
    error.value = "Password must be at least 6 characters long.";
    return;
  }

  try {
    loading.value = true;
    const response = await axios.post("https://assignment-backend-agjv.onrender.com/api/v1/users/login", {
      email: email.value,
      password: password.value,
    });

    if (response.status === 200) {
      const { accessToken, user } = response.data.data;

      // Store token in localStorage/sessionStorage
      localStorage.setItem("token", accessToken);

      // Store user in Pinia state
      authStore.login(user);

      // Redirect to home with a success message
      router.push({ path: "/", query: { login: "success" } });
    } else {
      error.value = response.data.message || "Something went wrong.";
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
</style>
