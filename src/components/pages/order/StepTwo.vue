<template>
  <form class="order-main__form order-form">
    <fieldset>
      <div class="form-group form-group--radio-list order-form__form-group">
        <div class="form-group__radio">
          <label class="radio" for="all-models">
            <input
              type="radio"
              class="radio__input"
              name="models"
              id="all-models"
              :value="1"
              v-model="filter"
            />
            <span class="radio__text">Все модели</span>
            <span class="radio__icon"></span>
          </label>
        </div>
        <div class="form-group__radio">
          <label class="radio" for="economy-models">
            <input
              type="radio"
              class="radio__input"
              name="models"
              id="economy-models"
              :value="2"
              v-model="filter"
            />
            <span class="radio__text">Эконом</span>
            <span class="radio__icon"></span>
          </label>
        </div>
        <div class="form-group__radio">
          <label class="radio" for="premium-models">
            <input
              type="radio"
              class="radio__input"
              name="models"
              id="premium-models"
              :value="3"
              v-model="filter"
            />
            <span class="radio__text">Премиум</span>
            <span class="radio__icon"></span>
          </label>
        </div>
      </div>
    </fieldset>
    <Loader v-if="cars.status === 'loading'" />
    <fieldset v-else>
      <ul class="order-form__models order-models">
        <li
          class="order-models__item"
          :class="{
            'order-models__item--active': stepTwo.chosenModel.id === item.id,
          }"
          v-for="item in carsList"
          :key="item.id"
          @click.prevent="pickModel(item.id)"
        >
          <div class="order-models__title">{{ item.name }}</div>
          <div class="order-models__price">
            {{ item.priceMin }} - {{ item.priceMax }} ₽
          </div>
          <div class="order-models__img-wrapper">
            <img
              v-if="item.thumbnail.path"
              v-image-fall-back
              :src="item.thumbnail.path"
              :alt="item.name"
              class="order-models__img"
            />
          </div>
        </li>
      </ul>
    </fieldset>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';

import Loader from '@/components/common/Loader.vue';
export default {
  data() {
    return {
      stepTwo: {
        chosenModel: '',
      },
      filter: '',
      carsList: [],
    };
  },
  computed: {
    ...mapState(['cars']),
    economyCars() {
      return this.cars.list.filter(
        (el) =>
          el.categoryId.name.toLowerCase() === 'эконом' ||
          el.categoryId.name.toLowerCase().includes('эконом') ||
          el.categoryId.name.toLowerCase().includes('доступные')
      );
    },
    premiumCars() {
      return this.cars.list.filter((el) =>
        el.categoryId.description.toLowerCase().includes('премиум')
      );
    },
  },
  methods: {
    pickModel(val) {
      this.stepTwo.chosenModel = this.cars.list.find((el) => el.id === val);
    },
  },
  validations: {
    stepTwo: {
      chosenModel: {
        required,
      },
    },
  },
  mounted() {
    this.filter = 1;
  },
  watch: {
    'stepTwo.chosenModel': function (val) {
      this.$emit('changeFormData', {
        formStatus: !this.$v.stepTwo.chosenModel.$invalid,
        formDetails: val,
        step: 2,
      });
    },
    cars: {
      handler: function (val) {
        if (val != undefined) {
          this.carsList = val.list;
        }
      },
      immediate: true,
      deep: true,
    },
    filter: {
      handler: function (val) {
        if (val === 1) {
          this.carsList = this.cars.list;
        } else if (val === 2) {
          this.carsList = this.economyCars;
        } else if (val === 3) {
          this.carsList = this.premiumCars;
        }
      },
      immediate: true,
    },
  },
  components: { Loader },
};
</script>
