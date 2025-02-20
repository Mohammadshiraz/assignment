import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    login(email) {
      // Simulate login logic
    //   console.log('Password:', password); // Use the password parameter
      this.user = { email };
    //   alert('Logged in successfully!');
    },
    signup(email) {
      // Simulate signup logic
    //   console.log('Password:', password); // Use the password parameter
      this.user = { email };
    //   alert('Signed up successfully!');
    },
    logout() {
      this.user = null;
    //   alert('Logged out successfully!');
    },
  },
});