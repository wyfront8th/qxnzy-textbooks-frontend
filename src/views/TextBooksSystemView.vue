<script setup lang="ts">
import MainAside from '@/components/MainAside.vue'
import MainContainer from '@/components/MainContainer.vue'
import MainTopNav from '@/components/MainTopNav.vue'
</script>

<template>
  <MainTopNav />
  <div class="main-warp">
    <MainAside />
    <MainContainer />
  </div>
</template>
<style scoped>
.main-warp {
  flex: 1;
  display: flex;
}
.no-spacing {
  margin: 0;
}
</style>
