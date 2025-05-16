<!-- src/components/Alert.vue -->
<template>
  <div class="alert">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  },
};
</script>
