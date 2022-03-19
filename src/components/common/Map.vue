<template>
  <yandex-map
    ref="map"
    v-if="showMap"
    :coords="coords"
    zoom="3"
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
      coords: [55.795366, 49.105579],
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

        var mapComponent = this.$refs.map;
        var myMap = mapComponent.myMap;
        myMap.geoObjects.removeAll();

        for (let item of val) {
          ymaps.geocode(item).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            var coords = firstGeoObject.geometry.getCoordinates();
            firstGeoObject.properties.set('iconCaption', item);
            myMap.geoObjects.add(firstGeoObject);
            if (val.length === 1) {
              myMap.setCenter(coords, 14, { duration: 300 });
            }
          });
        }

        let self = this;
        myMap.geoObjects.events.add('click', function (e) {
          let coords = e.get('target')['properties'].get('iconCaption');
          self.pickedAddress = coords;
        });
      },
    },
    currentAddress: {
      handler: async function (val) {
        if (val === '') {
          await loadYmap();

          var mapComponent = this.$refs.map;
          var myMap = mapComponent.myMap;
          myMap.setCenter(this.coords, 3, { duration: 300 });
        }
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
