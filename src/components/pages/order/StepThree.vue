<template>
  <form class="order-main__form order-form">
    <fieldset>
      <legend class="order-form__legend">Цвет</legend>
      <div class="form-group form-group--radio-list order-form__form-group">
        <div class="form-group__radio form-group-radio">
          <label class="radio" for="all-colors">
            <input
              type="radio"
              class="radio__input"
              name="color"
              id="all-colors"
              v-model="stepThree.color"
              value="Любой"
            />
            <span class="radio__text">Любой</span>
            <span class="radio__icon"></span>
          </label>
        </div>
        <div class="form-group__radio">
          <label class="radio" for="red-color">
            <input
              type="radio"
              class="radio__input"
              name="color"
              id="red-color"
              v-model="stepThree.color"
              value="Красный"
            />
            <span class="radio__text">Красный</span>
            <span class="radio__icon"></span>
          </label>
        </div>
        <div class="form-group__radio">
          <label class="radio" for="blue-color">
            <input
              type="radio"
              class="radio__input"
              name="color"
              id="blue-color"
              v-model="stepThree.color"
              value="Голубой"
            />
            <span class="radio__text">Голубой</span>
            <span class="radio__icon"></span>
          </label>
        </div>
      </div>
    </fieldset>
    <fieldset>
      <legend class="order-form__legend">Дата аренды</legend>
      <div
        class="form-group order-form__form-group order-form__form-group--grid"
      >
        <label for="order-from" class="order-form__label">С</label>
        <input
          type="date"
          name="order-from"
          id="order-from"
          class="form-control custom-input order-form__input"
          placeholder="Введите дату и время"
          v-model="stepThree.dateFrom"
        />
        <label for="order-to" class="order-form__label">По</label>
        <input
          type="date"
          name="order-to"
          id="order-to"
          class="form-control custom-input order-form__input"
          placeholder="Введите дату и время"
          v-model="stepThree.dateTo"
        />
      </div>
    </fieldset>
    <fieldset>
      <legend class="order-form__legend">Тариф</legend>
      <div class="form-group order-form__form-group">
        <div class="form-group__radio form-group-radio">
          <label class="radio" for="rate-minute">
            <input
              type="radio"
              class="radio__input"
              name="rate"
              id="rate-minute"
              v-model="stepThree.rate"
              value="Поминутно, 7₽/мин"
            />
            <span class="radio__text">Поминутно, 7₽/мин</span>
            <span class="radio__icon"></span>
          </label>
        </div>
        <div class="form-group__radio">
          <label class="radio" for="rate-day">
            <input
              type="radio"
              class="radio__input"
              name="rate"
              id="rate-day"
              v-model="stepThree.rate"
              value="На сутки, 1999 ₽/сутки"
            />
            <span class="radio__text">На сутки, 1999 ₽/сутки</span>
            <span class="radio__icon"></span>
          </label>
        </div>
      </div>
    </fieldset>
    <fieldset>
      <legend class="order-form__legend">Доп. услуги</legend>
      <div class="form-group order-form__form-group">
        <div class="form-group__checkbox form-group-checkbox">
          <label class="checkbox" for="extra-fuel">
            <input
              type="checkbox"
              class="checkbox__input"
              name="extra-fuel"
              id="extra-fuel"
              v-model="stepThree.extraFuel"
            />
            <span class="checkbox__text">Полный бак, 500р</span>
            <span class="checkbox__icon"></span>
          </label>
        </div>
        <div class="form-group__checkbox form-group-checkbox">
          <label class="checkbox" for="extra-baby-chair">
            <input
              type="checkbox"
              class="checkbox__input"
              name="extra-baby-chair"
              id="extra-baby-chair"
              v-model="stepThree.extraBabyChair"
            />
            <span class="checkbox__text">Детское кресло, 200р</span>
            <span class="checkbox__icon"></span>
          </label>
        </div>
        <div class="form-group__checkbox form-group-checkbox">
          <label class="checkbox" for="extra-right-side">
            <input
              type="checkbox"
              class="checkbox__input"
              name="extra-right-side"
              id="extra-right-side"
              v-model="stepThree.extraRightSide"
            />
            <span class="checkbox__text">Правый руль, 1600р</span>
            <span class="checkbox__icon"></span>
          </label>
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
      stepThree: {
        color: '',
        dateFrom: '',
        dateTo: '',
        rate: '',
        extraFuel: false,
        extraBabyChair: false,
        extraRightSide: false,
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
      return (
        required(this.stepThree.color) &&
        required(this.stepThree.dateFrom) &&
        required(this.stepThree.dateTo) &&
        required(this.stepThree.rate)
      );
    },
  },
  watch: {
    stepThree: {
      deep: true,
      handler(val) {
        this.$store.commit('upd_order_details', val);
        this.$store.commit('upd_steps', {
          step: 3,
          formStatus: this.isFormFilled,
        });
      },
    },
  },
};
</script>
