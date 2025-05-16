<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h3 class="text-lg font-semibold text-gray-800">Apakah Anda yakin?</h3>
      <p class="text-sm text-gray-600">Apakah Anda yakin ingin menghapus user ini?</p>
      <div class="mt-4 flex justify-end">
        <button
          @click="closeModal"
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2"
        >
          Batal
        </button>
        <button
          @click="confirmAction"
          class="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Konfirmasi
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean, // Properti untuk menunjukkan modal
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    confirmAction() {
      this.$emit('confirm');
    },
  },
};
</script>

