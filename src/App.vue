<template>
  <div id="app" class="wrapper">
    <Sidebar />
    <div class="main-content">
      <router-view />
    </div>
    <IconTemplate />
  </div>
</template>

<script>
import Sidebar from '@/components/layout/Sidebar.vue';
import IconTemplate from '@/components/common/IconTemplate.vue';
export default {
  components: {
    Sidebar,
    IconTemplate,
  },
};
</script>

<style lang="scss">
@import '@/scss/main.scss';
</style>
