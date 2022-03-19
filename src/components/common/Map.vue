<template>
  <yandex-map
    v-if="showMap"
    :coords="coords"
    zoom="5"
    @map-was-initialized="workWithMap"
  >
  </yandex-map>
</template>

<script>
import { loadYmap } from 'vue-yandex-maps';

export default {
  props: ['allMarkers', 'currentAddress'],
  data() {
    return {
      coords: [59.939098, 30.315868],
      markers: [],
      pickedAddress: '',
      showMap: false,
      mapObj: '',
    };
  },
  computed: {
    currentAddressPoints() {
      if (this.currentAddress !== null) {
        return this.allMarkers.filter((el) => el.includes(this.currentAddress));
      }
      return null;
    },
  },
  methods: {
    async workWithMap(payload) {
      await loadYmap();

      var myMap = payload;
      this.mapObj = payload;

      for (let item of this.allMarkers) {
        ymaps.geocode(item).then(function (res) {
          var firstGeoObject = res.geoObjects.get(0);

          firstGeoObject.properties.set('iconCaption', item);
          myMap.geoObjects.add(firstGeoObject);
        });
      }

      let self = this;
      myMap.geoObjects.events.add('click', function (e) {
        let coords = e.get('target')['properties'].get('iconCaption');
        self.pickedAddress = coords;
      });

      myMap.geoObjects.options.set(
        'iconImageHref',
        'https://sandbox.api.maps.yandex.net/examples/ru/2.1/icon_customImage/images/ball.png'
      );
    },
  },
  watch: {
    pickedAddress: function (val) {
      if (val !== '') {
        this.$emit('updAddress', val);
      }
    },
    currentAddressPoints: {
      handler: async function (val) {
        await loadYmap();

        var myMap = this.mapObj;

        for (let item of val) {
          ymaps.geocode(item).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            firstGeoObject.properties.set('iconCaption', item);
            myMap.geoObjects.add(firstGeoObject);
          });
        }

        let self = this;
        myMap.geoObjects.events.add('click', function (e) {
          let coords = e.get('target')['properties'].get('iconCaption');
          self.pickedAddress = coords;
        });
      },
    },
  },
  mounted() {
    this.showMap = true;
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
