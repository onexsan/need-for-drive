<template>
  <form class="order-main__form order-form">
    <fieldset>
      <div class="form-group order-form__form-group">
        <SearchAutocomplete
          inputID="order-city"
          inputLabel="Город"
          :items="cities"
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
    ...mapState(['cities', 'points']),
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
    address() {
      if (this.stepOne.city && this.stepOne.place) {
        return `${this.stepOne.city.name} ${this.stepOne.place.address}`;
      }
      return null;
    },
    allMarkers() {
      if (this.points) {
        return this.points
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
          let filteredPoints = this.points.filter(
            (el) => el.cityId !== null && el.cityId.name === city
          );
          this.filteredPoints = filteredPoints;
        } else {
          this.filteredPoints = [];
        }

        this.$emit('changeFormData', {
          formStatus: this.isFormFilled,
          formDetails: val,
          step: 1,
        });
      },
      deep: true,
    },
  },
  components: {
    SearchAutocomplete,
    Map,
  },
};
</script>
