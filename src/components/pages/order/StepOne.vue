<template>
  <form class="order-main__form order-form">
    <fieldset>
      <div
        class="form-group order-form__form-group order-form__form-group--grid"
      >
        <label for="order-city" class="order-form__label">Город</label>
        <input
          type="search"
          name="order-city"
          id="order-city"
          class="custom-input order-form__input form-control"
          placeholder="Начните вводить город..."
          v-model="stepOne.city"
        />
        <label for="order-place" class="order-form__label">Пункт выдачи</label>
        <input
          type="search"
          name="order-place"
          id="order-place"
          class="custom-input order-form__input form-control"
          placeholder="Начните вводить пункт..."
          v-model="stepOne.place"
        />
      </div>
    </fieldset>
    <fieldset>
      <div class="form-group order-form__form-group">
        <legend class="order-form__legend">Выбрать на карте:</legend>
        <div class="order-form__img-placeholder">
          <img
            src="~@/assets/img/order-map.png"
            alt="Карта пунктов выдачи"
            class="order-form__map"
          />
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      stepOne: {
        city: '',
        place: '',
      },
    };
  },
  computed: {
    isFormFilled() {
      return this.$v.form;
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
};
</script>
