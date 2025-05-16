# mario-crud

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
# Vue.js User Management System

Aplikasi ini memungkinkan pengguna untuk melakukan registrasi, login, serta mengelola daftar user (tambah, edit, hapus) menggunakan API **reqres.in**.

## Fitur

- **Login**: Pengguna dapat masuk dengan email dan password.
- **Registrasi**: Pengguna dapat membuat akun baru.
- **CRUD User**: Admin dapat menambah, mengedit, dan menghapus user.
- **API**: Menggunakan API dari **reqres.in** untuk registrasi dan manajemen user.

## Prasyarat

Sebelum memulai, pastikan kamu sudah memiliki hal-hal berikut:
- **Node.js** (terinstal di komputer kamu)
- **npm** atau **yarn** (manajer paket untuk JavaScript)

## API yang Digunakan
POST /api/login: Untuk login dengan email dan password.

POST /api/register: Untuk registrasi dengan email dan password.

GET /api/users: Untuk mendapatkan daftar user.

POST /api/users: Untuk menambah user baru.

PUT /api/users/{id}: Untuk mengedit data user.

DELETE /api/users/{id}: Untuk menghapus user.

### Struktur Proyek
bash
Salin
Edit
/src
  /assets
    main.css          # Gaya global aplikasi
  /components
    UserCard.vue      # Komponen untuk menampilkan user card
    Modal.vue         # Komponen modal konfirmasi
    UserForm.vue      # Formulir untuk tambah/edit user
    Alert.vue         # Komponen alert untuk pesan
  /views
    LoginView.vue     # Halaman login
    RegisterView.vue  # Halaman registrasi
    UserListView.vue  # Halaman daftar user
  /api
    users.js          # File API untuk operasi CRUD user
  App.vue             # Komponen utama aplikasi
  main.js             # File entry point aplikasi
  router.js           # Router Vue.js untuk menangani navigasi halaman
