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
    <fieldset>
      <ul class="order-form__models order-models">
        <li
          class="order-models__item"
          :class="{
            'order-models__item--active': stepTwo.chosenModel === cars[idx],
          }"
          v-for="(item, idx) in cars"
          :key="item.id"
          @click.prevent="pickModel(idx)"
        >
          <div class="order-models__title">{{ item.model }}</div>
          <div class="order-models__price">{{ item.price }}</div>
          <div class="order-models__img-wrapper">
            <img
              src="~@/assets/img/car-example.png"
              alt="Изображение автомобиля"
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
export default {
  data() {
    return {
      stepTwo: {
        chosenModel: '',
      },
      filter: '',
      cars: [
        {
          model: 'ELANTRA',
          price: '12 000 - 25 000 ₽',
        },
        {
          model: 'i30 N',
          price: '10 000 - 32 000 ₽',
        },
        {
          model: 'ELANTRA',
          price: '12 000 - 25 000 ₽',
        },
        {
          model: 'i30 N',
          price: '10 000 - 32 000 ₽',
        },
        {
          model: 'ELANTRA',
          price: '12 000 - 25 000 ₽',
        },
        {
          model: 'i30 N',
          price: '10 000 - 32 000 ₽',
        },
        {
          model: 'ELANTRA',
          price: '12 000 - 25 000 ₽',
        },
      ],
    };
  },
  methods: {
    pickModel(val) {
      this.stepTwo.chosenModel = this.cars[val];
    },
  },
  validations: {
    stepTwo: {
      chosenModel: {
        required,
      },
    },
  },
  watch: {
    'stepTwo.chosenModel': function (val) {
      this.$store.commit('upd_order_details', val);
      this.$store.commit('upd_steps', {
        step: 2,
        formStatus: !this.$v.stepTwo.chosenModel.$invalid,
      });
    },
  },
};
</script>
