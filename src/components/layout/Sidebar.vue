<template>
  <aside class="sidebar">
    <div class="container sidebar__container">
      <button class="menu-btn">
        <IconMenu :iconColor="'white'" width="32" height="32" />
      </button>
      <button class="link link--green link--lang">Eng</button>
    </div>
  </aside>
</template>

<script>
import IconMenu from '@/components/icons/IconMenu.vue';
export default {
  components: {
    IconMenu,
  },
};
</script>

<style></style>
