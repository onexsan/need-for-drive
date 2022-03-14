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
import { loadYmap } from 'vue-yandex-maps';
export default {
  props: ['allMarkers'],
  data() {
    return {
      coords: [59.939098, 30.315868],
      markers: [],
    };
  },
  watch: {
    allMarkers: async function (val) {
      await loadYmap();

      var array = [];

      ymaps.ready(async function () {
        var allCoords = await val.map((item) => {
          var geocoder = new ymaps.geocode(item);

          geocoder.then(function (res) {
            var geoobject = res.geoObjects.get(0).geometry.getCoordinates();
            var name = res.geoObjects.get(0).properties.get('name');

            console.log(geoobject);
            console.log(name);

            return {
              name,
              geoobject,
            };
          });
        });
        console.log(allCoords);
        console.log(array);
      });
    },
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
