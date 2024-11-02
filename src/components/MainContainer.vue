<script setup lang="ts"></script>
<template>
  <div class="main-content">
    <RouterView />
  </div>
</template>
<style scoped>
.main-content {
  width: calc(100% - 200px);
  height: 100%;
  display: flex;
}
</style>
