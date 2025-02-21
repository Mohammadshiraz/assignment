
# Vue-Pinia Authentication Project

This is a full-stack authentication project built using Vue.js for the frontend, Pinia for state management, and a Node.js backend with Express and MongoDB.

## Features

- User Signup & Login
- Authentication with JWT tokens
- State management using Pinia
- Protected routes with authentication middleware
- Form validation and error handling
- Password encryption using bcrypt
- Responsive UI with Tailwind CSS

## Technologies Used

### Frontend

- **Vue.js** (Composition API & Vue Router)
- **Pinia** (State Management)
- **Axios** (API calls)
- **Tailwind CSS** (Styling)

### Backend

- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT-based Authentication** (JSON Web Tokens)
- **Bcrypt** for password hashing

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure environment variables:
   ```sh
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```

## Form Validation

Custom form validation is implemented using Vue.js reactive properties.

### Example validation for login form:

```vue
<template>
  <form @submit.prevent="login">
    <input type="email" v-model="email" @blur="validateEmail" placeholder="Email" />
    <span v-if="emailError" class="error">{{ emailError }}</span>
    
    <input type="password" v-model="password" @blur="validatePassword" placeholder="Password" />
    <span v-if="passwordError" class="error">{{ passwordError }}</span>
    
    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

const validateEmail = () => {
  emailError.value = email.value.includes('@') ? '' : 'Invalid email format';
};

const validatePassword = () => {
  passwordError.value = password.value.length >= 6 ? '' : 'Password must be at least 6 characters';
};
</script>
```

## Usage

- Open `http://localhost:5173/` in your browser.
- Register a new account and log in.
- The authentication state is managed using Pinia and stored in local storage.
- Protected routes will redirect unauthorized users to the login page.

## Deployment

### Frontend Deployment

- Deploy on **Vercel** or **Netlify**:
  ```sh
  npm run build
  ```
- Upload the `dist` folder to your hosting platform.

### Backend Deployment

- Deploy using **Render**, **Heroku**, or **Railway**.
- Ensure the database connection string and environment variables are correctly configured.
- Use a process manager like PM2 to keep the server running:
  ```sh
  pm2 start server.js --name "backend"
  ```

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```sh
   git checkout -b feature-name
   ```
3. Commit changes:
   ```sh
   git commit -m "Add feature"
   ```
4. Push the branch:
   ```sh
   git push origin feature-name
   ```
5. Open a pull request.
