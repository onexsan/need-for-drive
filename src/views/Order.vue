<template>
  <section class="order">
    <Header />
    <div class="order__steps order-steps">
      <div class="container order-steps__container">
        <ul class="order-steps__list">
          <li
            class="order-steps__item"
            :class="{
              'order-steps__item--active': currentStep === step.id,
              'order-steps__item--disabled': currentStep < step.id,
            }"
            v-for="step in steps"
            :key="step.id"
          >
            <router-link to="/" class="order-steps__link">{{
              step.title
            }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <main class="order__main order-main">
      <div class="container order-main__container">
        <div class="order-main__wrapper">
          <StepOne v-show="currentStep === 1" />
          <div class="order-main__details order-details">
            <h3 class="order-details__title">Ваш заказ:</h3>
            <ul class="order-details__list details-list">
              <li class="details-list__item details-item">
                <div class="details-item__title">Пункт выдачи</div>
                <div class="details-item__value">
                  Ульяновск, Нариманова&nbsp;42
                </div>
              </li>
            </ul>
            <div class="order-details__price">
              <span>Цена:</span> от 8 000 до 12 000 ₽
            </div>
            <button class="btn order-details__btn" disabled>
              Выбрать модель
            </button>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import Header from '@/components/layout/Header.vue';
import StepOne from '@/components/pages/order/StepOne.vue';
export default {
  components: {
    Header,
    StepOne,
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
        {
          title: 'Итого',
          id: 4,
        },
      ],
      currentStep: 1,
    };
  },
};
</script>
