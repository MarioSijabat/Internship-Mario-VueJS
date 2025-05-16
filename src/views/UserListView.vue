<template>
  <div class="min-h-screen bg-gradient-to-r from-orange-500 to-red-500 p-6">
    <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">Daftar User</h2>

    <!-- Button untuk menambah user -->
    <button
      @click="openAddForm"
      class="px-4 py-2 bg-emerald-800 text-white font-bold rounded-md hover:bg-green-700 mb-4"
    >
      Tambah User Baru
    </button>

    <!-- Form Add/Edit User -->
    <div v-if="showForm" class="mb-6 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h3 class="text-lg font-semibold mb-4">{{ isEditMode ? 'Edit User' : 'Tambah User' }}</h3>
      <form @submit.prevent="handleSubmit">
        <input
          v-model="form.first_name"
          type="text"
          placeholder="Nama Depan"
          required
          class="w-full p-3 text-black mb-4 border rounded-lg"
        />
        <input
          v-model="form.last_name"
          type="text"
          placeholder="Nama Belakang"
          required
          class="w-full p-3 text-black mb-4 border rounded-lg"
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
          class="w-full p-3 text-black mb-4 border rounded-lg"
        />
        <button
          type="submit"
          class="w-full py-3 bg-emerald-800 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {{ isEditMode ? 'Update' : 'Tambah' }} User
        </button>
        <button
          type="button"
          @click="closeForm"
          class="w-full py-3 mt-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
        >
          Batal
        </button>
      </form>
    </div>

    <!-- User List -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="user in users" :key="user.id" class="bg-white text-black p-4 rounded-lg shadow-lg">
        <UserCard :user="user" />
        <div class="mt-4 flex justify-between">
          <button
            @click="openEditForm(user)"
            class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            @click="openDeleteConfirm(user)"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Konfirmasi Hapus -->
    <Modal :show="showDeleteConfirm" @close="closeDeleteConfirm" @confirm="confirmDelete">
      <p>Apakah Anda yakin ingin menghapus user ini?</p>
    </Modal>
  </div>
</template>

<script>
import { getUsers, addUser, editUser, deleteUser } from '@/api/users';
import UserCard from '@/components/UserCard.vue';
import Modal from '@/components/Modal.vue'; // Modal komponen konfirmasi

export default {
  components: {
    UserCard,
    Modal,
  },
  data() {
    return {
      users: [],
      showForm: false,
      isEditMode: false,
      showDeleteConfirm: false,
      form: {
        id: null,
        first_name: '',
        last_name: '',
        email: '',
      },
      userToDelete: null,
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
    openDeleteConfirm(user) {
      this.userToDelete = user;
      this.showDeleteConfirm = true;
    },
    closeDeleteConfirm() {
      this.showDeleteConfirm = false;
      this.userToDelete = null;
    },
    async confirmDelete() {
      try {
        await deleteUser(this.userToDelete.id);
        alert('User berhasil dihapus');
        this.fetchUsers();
        this.closeDeleteConfirm();
      } catch (err) {
        alert('Gagal menghapus user');
        console.error(err);
      }
    },
  },
};
</script>

