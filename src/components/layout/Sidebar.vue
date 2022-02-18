<template>
  <aside class="sidebar">
    <div class="container sidebar__container">
      <button class="menu-btn" v-b-modal.hamburger-modal>
        <IconMenu :iconColor="'white'" width="32" height="32" />
      </button>
      <button class="link link--green link--lang">Eng</button>
    </div>
    <HamburgerModal />
  </aside>
</template>

<script>
import IconMenu from '@/components/icons/IconMenu.vue';
import HamburgerModal from '@/components/modals/HamburgerModal.vue';
export default {
  components: {
    IconMenu,
    HamburgerModal,
  },
};
</script>

<style></style>
