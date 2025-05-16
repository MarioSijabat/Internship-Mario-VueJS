<template>
  <div class="bg-white p-4 rounded shadow">
    <img :src="user.avatar" alt="Avatar" class="w-16 h-16 rounded-full mb-4 mx-auto" />
    <h3 class="text-lg font-semibold text-center">{{ user.first_name }} {{ user.last_name }}</h3>
    <p class="text-center text-gray-500">{{ user.email }}</p>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,  // Pastikan menerima prop user
  },
};
</script>
