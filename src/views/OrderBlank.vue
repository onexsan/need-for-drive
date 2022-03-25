<template>
  <section class="order order--confirmed">
    <Header />
    <router-view></router-view>
  </section>
</template>

<script>
import Header from '@/components/layout/Header.vue';
export default {
  components: {
    Header,
  },
};
</script>
