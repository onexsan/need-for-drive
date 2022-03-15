<template>
  <yandex-map :coords="coords" zoom="10">
    <ymap-marker
      v-for="(item, idx) in markers"
      :key="idx"
      :coords="item"
      :markerId="(idx + 1).toString()"
    >
    </ymap-marker>
  </yandex-map>
</template>

<script>
export default {
  props: ['allMarkers'],
  data() {
    return {
      coords: [59.939098, 30.315868],
      markers: [],
    };
  },
};
</script>

<style>
.order-form__map-wrapper {
  height: 350px;
}

.ymap-container {
  height: 350px;
}
</style>
