<template>
  <div id="app" class="wrapper">
    <Sidebar />
    <div class="maincontent">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/layout/Sidebar.vue';
export default {
  components: {
    Sidebar,
  },
};
</script>

<style lang="scss">
@import '@/scss/main.scss';
</style>
