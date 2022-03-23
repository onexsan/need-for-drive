<template>
  <section class="order">
    <Header />
    <div class="order__nav order-nav">
      <div class="container order-nav__container">
        <ul class="order-nav__list">
          <li
            class="order-nav__item"
            :class="{
              'order-nav__item--active': currentStep === step.id,
              'order-nav__item--allowed': isNavLinkAvailable(step.id),
            }"
            v-for="step in steps"
            :key="step.id"
            @click="currentStep = step.id"
          >
            <div class="order-nav__link">{{ step.title }}</div>
          </li>
          <li
            class="order-nav__item"
            :class="{
              'order-nav__item--active': currentStep === 4,
              'order-nav__item--allowed': areAllStepsFilled,
            }"
            @click="currentStep = 4"
          >
            <div class="order-nav__link">Итого</div>
          </li>
        </ul>
      </div>
    </div>
    <main class="order__main order-main">
      <div class="container order-main__container">
        <div class="order-main__wrapper">
          <StepOne v-show="currentStep === 1" />
          <StepTwo v-show="currentStep === 2" />
          <StepThree v-show="currentStep === 3" />
          <StepFour v-show="currentStep === 4" />
          <div class="order-main__details order-details">
            <template v-if="areAnyStepsFilled">
              <h3 class="order-details__title">Ваш заказ:</h3>
              <ul class="order-details__list details-list">
                <li
                  class="details-list__item details-item"
                  v-if="orderDetails.city && orderDetails.place"
                >
                  <div class="details-item__title">Пункт выдачи</div>
                  <div class="details-item__value">
                    {{ orderDetails.city.name }},
                    {{ orderDetails.place.address }}
                  </div>
                </li>
                <li
                  class="details-list__item details-item"
                  v-if="orderDetails.name"
                >
                  <div class="details-item__title">Модель</div>
                  <div class="details-item__value">
                    {{ orderDetails.name }}
                  </div>
                </li>
                <li
                  class="details-list__item details-item"
                  v-if="orderDetails.color"
                >
                  <div class="details-item__title">Цвет</div>
                  <div class="details-item__value">
                    {{ orderDetails.color }}
                  </div>
                </li>
                <li
                  class="details-list__item details-item"
                  v-if="duration !== null"
                >
                  <div class="details-item__title">Длительность аренды</div>
                  <div class="details-item__value">
                    {{ duration.days }}д.
                    {{ duration.hours ? `${duration.hours}ч.` : '' }}
                    {{ duration.minutes ? `${duration.minutes}мин.` : '' }}
                  </div>
                </li>
                <li
                  class="details-list__item details-item"
                  v-if="orderDetails.rate"
                >
                  <div class="details-item__title">Тариф</div>
                  <div class="details-item__value">
                    {{ orderDetails.rate }}
                  </div>
                </li>
                <li
                  class="details-list__item details-item"
                  v-if="orderDetails.extraFuel"
                >
                  <div class="details-item__title">Полный бак</div>
                  <div class="details-item__value">Да</div>
                </li>
                <li
                  class="details-list__item details-item"
                  v-if="orderDetails.extraBabyChair"
                >
                  <div class="details-item__title">Детское кресло</div>
                  <div class="details-item__value">Да</div>
                </li>
                <li
                  class="details-list__item details-item"
                  v-if="orderDetails.extraRightSide"
                >
                  <div class="details-item__title">Правый руль</div>
                  <div class="details-item__value">Да</div>
                </li>
              </ul>
              <div class="order-details__price" v-if="countedPrice">
                <span>Цена:</span> {{ countedPrice }} ₽
              </div>
              <div
                class="order-details__price order-details__price--error"
                v-if="!isMinPriceReached"
              >
                <span>Минимальная цена:</span>
                {{ orderDetails.priceMin }} ₽
              </div>
              <div
                class="order-details__price order-details__price--error"
                v-if="isMaxPriceExceeded"
              >
                <span>Превышена максимальная цена:</span>
                {{ orderDetails.priceMax }} ₽
              </div>
            </template>

            <p v-else>Заполните необходимые поля.</p>

            <button
              class="btn order-details__btn"
              v-if="currentStep < 3"
              @click="currentStep += 1"
              :disabled="!stepsCompleted[currentStep]"
            >
              {{ currentStep === 1 ? 'Выбрать модель' : 'Дополнительно' }}
            </button>
            <button
              class="btn order-details__btn"
              v-if="currentStep === 3"
              @click="currentStep += 1"
              :disabled="isFinalStepDisabled"
            >
              Итого
            </button>
            <button
              class="btn order-details__btn"
              v-else-if="currentStep === 4"
              @click="$bvModal.show(`order-confirmation-modal`)"
            >
              Заказать
            </button>

            <p
              class="order-details__error"
              v-if="stepsCompleted[currentStep] === false && areAllStepsFilled"
            >
              Заполните необходимые поля.
            </p>
          </div>
        </div>
      </div>
    </main>
    <OrderConfirmationModal />
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/layout/Header.vue';
import StepOne from '@/components/pages/order/StepOne.vue';
import StepTwo from '@/components/pages/order/StepTwo.vue';
import StepThree from '@/components/pages/order/StepThree.vue';
import StepFour from '@/components/pages/order/StepFour.vue';
import OrderConfirmationModal from '@/components/modals/OrderConfirmationModal.vue';

export default {
  components: {
    Header,
    OrderConfirmationModal,
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
  },
  data() {
    return {
      steps: [
        {
          title: 'Местоположение',
          id: 1,
        },
        {
          title: 'Модель',
          id: 2,
        },
        {
          title: 'Дополнительно',
          id: 3,
        },
      ],
      currentStep: 1,
    };
  },
  computed: {
    ...mapState(['orderDetails', 'stepsCompleted']),
    areAllStepsFilled() {
      let steps = Object.values(this.stepsCompleted);
      return steps.every((el) => el === true);
    },
    areAnyStepsFilled() {
      let steps = Object.values(this.stepsCompleted);
      return steps.some((el) => el === true);
    },
    duration() {
      if (this.orderDetails.dateFrom && this.orderDetails.dateTo) {
        var delta =
          Math.abs(
            new Date(this.orderDetails.dateTo) -
              new Date(this.orderDetails.dateFrom)
          ) / 1000;

        var days = Math.floor(delta / 86400);
        delta -= days * 86400;

        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        return { days, hours, minutes };
      }
      return null;
    },
    countedPrice() {
      if (!this.orderDetails.rate && !this.duration) {
        return this.orderDetails.priceMin !== undefined
          ? this.orderDetails.priceMin
          : null;
      } else if (this.orderDetails.rate && this.duration) {
        let price = this.calcPrice(
          this.duration,
          this.orderDetails.rate,
          this.orderDetails.ratePrice,
          this.orderDetails.extraBabyChair,
          this.orderDetails.extraFuel,
          this.orderDetails.extraRightSide
        );
        return price;
      }
      return null;
    },
    isMinPriceReached() {
      let isPriceIncorrect =
        this.countedPrice !== null &&
        this.countedPrice < this.orderDetails.priceMin &&
        this.orderDetails.priceMax > this.orderDetails.priceMin;

      if (isPriceIncorrect) {
        return false;
      }
      return true;
    },
    isMaxPriceExceeded() {
      let isPriceIncorrect =
        this.countedPrice !== null &&
        this.countedPrice > this.orderDetails.priceMax &&
        this.orderDetails.priceMax > this.orderDetails.priceMin;

      if (isPriceIncorrect) {
        return true;
      }
      return false;
    },
    isFinalStepDisabled() {
      return (
        this.stepsCompleted[this.currentStep] === false ||
        !this.areAllStepsFilled ||
        !this.isMinPriceReached ||
        this.isMaxPriceExceeded
      );
    },
  },
  methods: {
    calcPrice(time, rate, ratePrice, hasBabyChair, hasFullTank, hasRightWheel) {
      let days = time.hours > 0 || time.minutes > 0 ? time.days + 1 : time.days;
      let weeks = Math.ceil(days / 7);
      let months = Math.ceil(days / 30);
      let minutes = time.days * 1440 + time.hours * 60 + time.minutes;

      let price = '';
      if (rate === 'Суточный') {
        price = days * ratePrice;
      } else if (rate === 'Недельный (Акция!)') {
        price = weeks * ratePrice;
      } else if (rate === 'Месячный') {
        price = months * ratePrice;
      } else if (rate === 'Поминутно') {
        price = minutes * ratePrice;
      }

      if (hasBabyChair) {
        price += 200;
      }
      if (hasFullTank) {
        price += 500;
      }
      if (hasRightWheel) {
        price += 1600;
      }

      return price;
    },
    isNavLinkAvailable(id) {
      return (
        this.currentStep >= id ||
        this.stepsCompleted[id] === true ||
        this.stepsCompleted[id - 1] === true
      );
    },
  },
  async mounted() {
    await this.$store.dispatch('getStepOneData');
    await this.$store.dispatch('getCars');
    await this.$store.dispatch('getStepThreeData');
  },
};
</script>
