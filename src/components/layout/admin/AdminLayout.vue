<template>
  <div class="admin-wrapper">
    <router-view name="Sidebar" />
    <div class="main-content">
      <router-view name="Header" />
      <router-view />
      <router-view name="Footer" />
    </div>

    <IconTemplate />
  </div>
</template>

<script>
import IconTemplate from '@/components/common/IconTemplate.vue';
export default {
  components: {
    IconTemplate,
  },
};
</script>

<style lang="scss">
.admin-wrapper {
  height: 100%;
  background-color: $gray-admin;
  font-family: Helvetica, Arial, sans-serif;
  display: grid;
  grid-template-columns: auto 1fr;
}

.admin-wrapper .main-content {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 0px;
  background-color: $gray-admin;
}
</style>
