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
              'order-nav__item--allowed':
                currentStep >= step.id ||
                formStatuses[step.id] === true ||
                formStatuses[step.id - 1] === true,
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
          <OrderStep
            :currentStep="currentStep"
            :filledForm="formDetails"
            @updateFormData="updateFormData"
          />
          <div class="order-main__details order-details">
            <template v-if="areAnyStepsFilled">
              <h3 class="order-details__title">Ваш заказ:</h3>
              <ul class="order-details__list details-list">
                <li
                  class="details-list__item details-item"
                  v-if="formDetails.city && formDetails.place"
                >
                  <div class="details-item__title">Пункт выдачи</div>
                  <div class="details-item__value">
                    {{ formDetails.city }}, {{ formDetails.place }}
                  </div>
                </li>
                <li
                  class="details-list__item details-item"
                  v-if="formDetails.model"
                >
                  <div class="details-item__title">Модель</div>
                  <div class="details-item__value">
                    {{ formDetails.model }}
                  </div>
                </li>
                <li
                  class="details-list__item details-item"
                  v-if="formDetails.color"
                >
                  <div class="details-item__title">Цвет</div>
                  <div class="details-item__value">
                    {{ formDetails.color }}
                  </div>
                </li>
                <li
                  class="details-list__item details-item"
                  v-if="hours !== null"
                >
                  <div class="details-item__title">Длительность аренды</div>
                  <div class="details-item__value">
                    {{ hours > 0 ? `${hours} д.` : 'Менее суток' }}
                  </div>
                </li>
                <li
                  class="details-list__item details-item"
                  v-if="formDetails.rate"
                >
                  <div class="details-item__title">Тариф</div>
                  <div class="details-item__value">
                    {{ formDetails.rate }}
                  </div>
                </li>
                <li
                  class="details-list__item details-item"
                  v-if="formDetails.extraFuel === true"
                >
                  <div class="details-item__title">Полный бак</div>
                  <div class="details-item__value">Да</div>
                </li>
                <li
                  class="details-list__item details-item"
                  v-if="formDetails.extraBabyChair === true"
                >
                  <div class="details-item__title">Детское кресло</div>
                  <div class="details-item__value">Да</div>
                </li>
                <li
                  class="details-list__item details-item"
                  v-if="formDetails.extraRightSide === true"
                >
                  <div class="details-item__title">Правый руль</div>
                  <div class="details-item__value">Да</div>
                </li>
              </ul>
              <div class="order-details__price">
                <span>Цена:</span> 16 000 ₽
              </div>
            </template>

            <p v-else>Заполните необходимые поля.</p>

            <button
              class="btn order-details__btn"
              v-if="currentStep < 3"
              @click="currentStep += 1"
              :disabled="formStatuses[currentStep] === false"
            >
              {{ currentStep === 1 ? 'Выбрать модель' : 'Дополнительно' }}
            </button>
            <button
              class="btn order-details__btn"
              v-if="currentStep === 3"
              @click="currentStep += 1"
              :disabled="
                formStatuses[currentStep] === false || !areAllStepsFilled
              "
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
              v-if="formStatuses[currentStep] === false && areAllStepsFilled"
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
import Header from '@/components/layout/Header.vue';
import OrderStep from '@/components/pages/order/OrderStep.vue';
import OrderConfirmationModal from '@/components/modals/OrderConfirmationModal.vue';
export default {
  components: {
    Header,
    OrderConfirmationModal,
    OrderStep,
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
      formDetails: {},
      formStatuses: {
        1: false,
        2: false,
        3: false,
      },
    };
  },
  computed: {
    areAllStepsFilled() {
      let steps = Object.values(this.formStatuses);
      return steps.every((el) => el === true);
    },
    areAnyStepsFilled() {
      let steps = Object.values(this.formStatuses);
      return steps.some((el) => el === true);
    },
    hours() {
      if (this.formDetails.dateFrom && this.formDetails.dateTo) {
        var delta =
          Math.abs(
            new Date(this.formDetails.dateTo) -
              new Date(this.formDetails.dateFrom)
          ) / 1000;

        var days = Math.floor(delta / 86400);
        delta -= days * 86400;

        return days;
      }
      return null;
    },
  },
  methods: {
    updateFormData(val) {
      for (let key of Object.keys(val.steps)) {
        this.formStatuses[key] = val.steps[key].formStatus;
      }
      for (let val of Object.values(val.steps)) {
        let merged = { ...this.formDetails, ...val.formDetails };
        this.formDetails = merged;
      }
    },
  },
  async mounted() {
    const token = Buffer.from(`11d7c9f` + ':' + `4cbcea96de`).toString(
      'base64'
    );
    try {
      let request = await this.axios({
        method: 'post',
        url: '/auth/login',
        data: {
          username: 'intern',
          password: 'intern-S!',
        },
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      console.log(request);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
