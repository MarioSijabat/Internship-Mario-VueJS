<template>
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-500 to-red-500">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Log In</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="Email"
            required
          />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
        >
          Log In
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    submitForm() {
      // Logic for form submission (authentication)
      console.log('Logged in with:', this.email, this.password);
    },
  },
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
