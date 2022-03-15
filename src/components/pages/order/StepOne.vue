<template>
  <form class="order-main__form order-form">
    <Loader v-if="stepOneData.status === 'loading'" />
    <template v-else>
      <fieldset>
        <div class="form-group order-form__form-group">
          <SearchAutocomplete
            inputID="order-city"
            inputLabel="Город"
            :items="filteredCities"
            @updData="updData"
          />
          <SearchAutocomplete
            inputID="order-place"
            inputLabel="Пункт выдачи"
            :items="filteredPoints"
            @updData="updData"
            :disabled="isPointDisabled"
          />
        </div>
      </fieldset>
    </template>
    <fieldset>
      <div class="form-group order-form__form-group">
        <legend class="order-form__legend">Выбрать на карте:</legend>
        <Map :allMarkers="allMarkers" />
      </div>
    </fieldset>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import SearchAutocomplete from '@/components/common/SearchAutocomplete.vue';
import Loader from '@/components/common/Loader.vue';
import Map from '@/components/common/Map.vue';

export default {
  data() {
    return {
      stepOne: {
        city: '',
        place: '',
      },
      filteredPoints: [],
    };
  },
  computed: {
    ...mapState(['stepOneData']),
    filteredCities() {
      if (this.stepOneData.cities && this.stepOneData.points) {
        let arrayOfCities = [];
        for (let item of this.stepOneData.cities) {
          let pwz = this.stepOneData.points.find(
            (el) => el.cityId !== null && el.cityId.name === item.name
          );

          if (pwz !== undefined) {
            arrayOfCities.push(item);
          }
        }
        return arrayOfCities;
      }
      return null;
    },
    isFormFilled() {
      return this.$v.form;
    },
    isPointDisabled() {
      if (
        this.stepOne.city === '' ||
        (this.stepOne.city && Object.keys(this.stepOne.city).length === 0)
      ) {
        return true;
      }
      return false;
    },
    allMarkers() {
      if (this.stepOneData.points) {
        return this.stepOneData.points
          .map(function (el) {
            if (el.cityId !== null) {
              return `${el.cityId.name} ${el.address}`;
            }
          })
          .filter((el) => el !== undefined);
      }
      return null;
    },
  },
  methods: {
    updData(data) {
      if (data.type === 'Город') {
        this.stepOne.city = data.value;
      }
      if (data.type === 'Пункт выдачи') {
        this.stepOne.place = data.value;
      }
    },
  },
  validations: {
    form: function () {
      return required(this.stepOne.city) && required(this.stepOne.place);
    },
  },
  watch: {
    stepOne: {
      handler: function (val) {
        let city = val.city.name;
        if (city && city !== undefined) {
          let filteredPoints = this.stepOneData.points.filter(
            (el) => el.cityId !== null && el.cityId.name === city
          );
          this.filteredPoints = filteredPoints;
        } else {
          this.filteredPoints = [];
        }

        this.$store.commit('upd_order_details', val);
        this.$store.commit('upd_steps', {
          step: 1,
          formStatus: this.isFormFilled,
        });
      },
      deep: true,
    },
  },
  components: {
    SearchAutocomplete,
    Map,
    Loader,
  },
};
</script>
