import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'x-api-key': 'reqres-free-v1',
    'Content-Type': 'application/json',
  },
});

// Pastikan menggunakan `export default` agar bisa diimpor dengan benar
export default axiosInstance;
