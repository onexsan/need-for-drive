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
              'order-nav__item--disabled': currentStep < step.id - 1,
            }"
            v-for="step in steps"
            :key="step.id"
            @click="currentStep = step.id"
          >
            <div class="order-nav__link">{{ step.title }}</div>
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
            <h3 class="order-details__title">Ваш заказ:</h3>
            <ul class="order-details__list details-list">
              <li class="details-list__item details-item">
                <div class="details-item__title">Пункт выдачи</div>
                <div class="details-item__value">
                  Ульяновск, Нариманова&nbsp;42
                </div>
              </li>
              <li class="details-list__item details-item">
                <div class="details-item__title">Модель</div>
                <div class="details-item__value">Hyndai,&nbsp;i30 N</div>
              </li>
              <li class="details-list__item details-item">
                <div class="details-item__title">Цвет</div>
                <div class="details-item__value">Голубой</div>
              </li>
              <li class="details-list__item details-item">
                <div class="details-item__title">Длительность аренды</div>
                <div class="details-item__value">1д 2ч</div>
              </li>
              <li class="details-list__item details-item">
                <div class="details-item__title">Тариф</div>
                <div class="details-item__value">На сутки</div>
              </li>
              <li class="details-list__item details-item">
                <div class="details-item__title">Полный бак</div>
                <div class="details-item__value">Да</div>
              </li>
            </ul>
            <div class="order-details__price"><span>Цена:</span> 16 000 ₽</div>
            <button
              class="btn order-details__btn"
              @click="$bvModal.show(`order-confirmation-modal`)"
            >
              Выбрать модель
            </button>
          </div>
        </div>
      </div>
    </main>
    <OrderConfirmationModal />
  </section>
</template>

<script>
import Header from '@/components/layout/Header.vue';
import StepOne from '@/components/pages/order/StepOne.vue';
import StepTwo from '@/components/pages/order/StepTwo.vue';
import StepThree from '@/components/pages/order/StepThree.vue';
import StepFour from '@/components/pages/order/StepFour.vue';
import OrderConfirmationModal from '@/components/modals/OrderConfirmationModal.vue';

export default {
  components: {
    Header,
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    OrderConfirmationModal,
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
