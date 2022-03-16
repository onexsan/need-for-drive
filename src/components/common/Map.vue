<template>
  <yandex-map :coords="coords" zoom="5" @map-was-initialized="workWithMap">
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
      pickedAddress: '',
    };
  },
  methods: {
    async workWithMap(payload) {
      await loadYmap();

      var myMap = payload;

      for (let item of this.allMarkers) {
        ymaps.geocode(item).then(function (res) {
          var firstGeoObject = res.geoObjects.get(0);

          firstGeoObject.options.set(
            'preset',
            'islands#darkBlueDotIconWithCaption'
          );
          firstGeoObject.properties.set('iconCaption', item);
          myMap.geoObjects.add(firstGeoObject);
        });
      }

      myMap.geoObjects.events.add('click', function (e) {
        let coords = e.get('target')['properties'].get('iconCaption');
        console.log(coords);
      });

      myMap.geoObjects.options.set(
        'iconImageHref',
        'https://sandbox.api.maps.yandex.net/examples/ru/2.1/icon_customImage/images/ball.png'
      );
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
