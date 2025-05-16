<template>
  <div class="min-h-screen text-black bg-gray-100 p-6">
    <h2 class="text-2xl text-black font-bold mb-6 text-center">Daftar User</h2>

    <button
      @click="openAddForm"
      class="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Tambah User Baru
    </button>

    <!-- Form Add/Edit User -->
    <div v-if="showForm" class="mb-6 bg-white p-4 rounded shadow max-w-md mx-auto">
      <h3 class="text-lg font-semibold mb-2">{{ isEditMode ? 'Edit User' : 'Tambah User' }}</h3>
      <form @submit.prevent="handleSubmit">
        <input
          v-model="form.first_name"
          type="text"
          placeholder="Nama Depan"
          required
          class="w-full p-2 border rounded mb-2"
        />
        <input
          v-model="form.last_name"
          type="text"
          placeholder="Nama Belakang"
          required
          class="w-full p-2 border rounded mb-2"
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
          class="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {{ isEditMode ? 'Update' : 'Tambah' }}
        </button>
        <button
          type="button"
          @click="closeForm"
          class="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Batal
        </button>
      </form>
    </div>

    <!-- User List -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="user in users" :key="user.id" class="bg-white p-4 rounded shadow">
        <img :src="user.avatar" alt="Avatar" class="w-16 h-16 rounded-full mb-4 mx-auto" />
        <h3 class="text-lg font-semibold text-center">
          {{ user.first_name }} {{ user.last_name }}
        </h3>
        <p class="text-center text-gray-500 mb-4">{{ user.email }}</p>
        <div class="flex justify-center gap-2">
          <button
            @click="openEditForm(user)"
            class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            @click="deleteUserById(user.id)"
            class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getUsers, addUser, editUser, deleteUser } from '@/api/users';

export default {
  data() {
    return {
      users: [],
      showForm: false,
      isEditMode: false,
      form: {
        id: null,
        first_name: '',
        last_name: '',
        email: '',
      },
      error: null,
    };
  },
  async mounted() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await getUsers();
        this.users = response.data.data;
      } catch (err) {
        console.error('Error fetching users:', err);
        this.error = 'Gagal mengambil data user';
      }
    },
    openAddForm() {
      this.resetForm();
      this.isEditMode = false;
      this.showForm = true;
    },
    openEditForm(user) {
      this.form = { ...user };
      this.isEditMode = true;
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
      this.resetForm();
    },
    resetForm() {
      this.form = {
        id: null,
        first_name: '',
        last_name: '',
        email: '',
      };
    },
    async handleSubmit() {
      if (this.isEditMode) {
        // Edit user
        try {
          await editUser(this.form.id, {
            first_name: this.form.first_name,
            last_name: this.form.last_name,
            email: this.form.email,
          });
          alert('User berhasil diupdate');
          this.showForm = false;
          this.fetchUsers();
        } catch (err) {
          alert('Gagal update user');
          console.error(err);
        }
      } else {
        // Add user
        try {
          await addUser({
            first_name: this.form.first_name,
            last_name: this.form.last_name,
            email: this.form.email,
          });
          alert('User berhasil ditambahkan');
          this.showForm = false;
          this.fetchUsers();
        } catch (err) {
          alert('Gagal menambahkan user');
          console.error(err);
        }
      }
    },
    async deleteUserById(id) {
      if (confirm('Yakin ingin menghapus user ini?')) {
        try {
          await deleteUser(id);
          alert('User berhasil dihapus');
          this.fetchUsers();
        } catch (err) {
          alert('Gagal menghapus user');
          console.error(err);
        }
      }
    },
  },
};
</script>
