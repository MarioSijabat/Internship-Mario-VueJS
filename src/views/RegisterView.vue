<template>
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-500 to-red-500">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
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
            class="w-full p-3 text-black border border-gray-300 rounded-md mt-2"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>
      </form>

      <!-- Pesan Status -->
      <div v-if="statusMessage" class="mt-4 text-center">
        <p :class="statusClass">{{ statusMessage }}</p>
      </div>
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
      statusMessage: '', // Pesan status
      statusClass: '',   // Kelas untuk pesan (warna hijau untuk sukses, merah untuk gagal)
    };
  },
  methods: {
    async submitForm() {
      console.log('Email:', this.email);  // Debug log email
      console.log('Password:', this.password);  // Debug log password

      try {
        // Mengirim data registrasi dengan API key
        const response = await axios.post('https://reqres.in/api/register', {
          email: this.email,
          password: this.password,
        }, {
          headers: {
            'x-api-key': 'reqres-free-v1',  // Pastikan API key disertakan di header
          }
        });

        // Menyimpan token setelah registrasi berhasil
        localStorage.setItem('token', response.data.token);

        // Menampilkan pesan sukses dan mengubah kelas untuk warna hijau
        this.statusMessage = 'Registrasi berhasil! Anda akan diarahkan ke halaman login.';
        this.statusClass = 'text-green-600';

        // Redirect ke halaman login setelah 2 detik
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
      } catch (error) {
        console.error('Error:', error);
        console.error('Response:', error.response);  // Log response error
        // Menampilkan pesan gagal dan mengubah kelas untuk warna merah
        this.statusMessage = 'Registrasi gagal. Pastikan email dan password sudah benar.';
        this.statusClass = 'text-red-600';
      }
    },
  },
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
