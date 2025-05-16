<!-- src/components/UserForm.vue -->
<template>
  <div class="user-form">
    <form @submit.prevent="submitForm">
      <label for="firstName">First Name</label>
      <input v-model="user.first_name" type="text" id="firstName" required />

      <label for="lastName">Last Name</label>
      <input v-model="user.last_name" type="text" id="lastName" required />

      <label for="email">Email</label>
      <input v-model="user.email" type="email" id="email" required />

      <button type="submit">{{ isEdit ? 'Edit' : 'Add' }} User</button>
      <button type="button" @click="closeForm">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({
        first_name: '',
        last_name: '',
        email: '',
      }),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    submitForm() {
      this.$emit('submit', this.user);
    },
    closeForm() {
      this.$emit('close');
    },
  },
};
</script>
