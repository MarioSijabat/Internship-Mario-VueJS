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
            class="w-full p-3 text-black border border-gray-300 rounded-md mt-2"
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
            class="w-full text-black p-3 border border-gray-300 rounded-md mt-2"
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

      <!-- Tampilkan pesan error jika login gagal -->
      <p v-if="errorMessage" class="text-center text-red-600 mt-4">{{ errorMessage }}</p>

      <p class="text-center text-gray-700 mt-4">
        Belum punya akun? <router-link to="/register" class="text-emerald-500 font-bold">Registrasi</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',  // Pesan error jika login gagal
    };
  },
  methods: {
    async submitForm() {
      this.errorMessage = '';  // Reset error message sebelum setiap submit

      try {
        const response = await axios.post('https://reqres.in/api/login', {
          email: this.email,
          password: this.password,
        }, {
          headers: {
            'x-api-key': 'reqres-free-v1',  // Menambahkan API Key di header
          }
        });

        // Menyimpan token setelah berhasil login
        localStorage.setItem('token', response.data.token);

        // Arahkan ke halaman user list setelah login berhasil
        this.$router.push('/users');
      } catch (error) {
        console.error(error);

        // Menampilkan pesan error jika login gagal
        if (error.response && error.response.status === 400) {
          this.errorMessage = 'Email atau password salah. Silakan coba lagi.';
        } else {
          this.errorMessage = 'Terjadi kesalahan saat login. Silakan coba lagi nanti.';
        }
      }
    }
  },
};
</script>
