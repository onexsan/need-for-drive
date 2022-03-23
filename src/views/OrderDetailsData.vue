<template>
  <div>
    <div class="order__nav order-nav">
      <div class="container order-nav__container">
        <p class="order-nav__order-id">Заказ номер {{ orderID }}</p>
      </div>
    </div>

    <Loader v-if="order.status === 'loading'" />
    <main class="order__main order-main" v-else>
      <div class="container order-main__container" v-if="order.data">
        <div class="order-main__wrapper">
          <div class="order__summary order-summary">
            <div class="order-summary__col">
              <div
                class="order-summary__title"
                v-if="order.data.orderStatusId.name"
              >
                Ваш заказ
                {{ orderStatus }}
              </div>
              <div class="order-summary__model" v-if="order.data.carId.name">
                {{ order.data.carId.name }}
              </div>
              <div
                class="order-summary__license"
                v-if="order.data.carId.number"
              >
                {{ order.data.carId.number }}
              </div>
              <div class="order-summary__extra" v-if="order.data.isFullTank">
                <span>Топливо</span> 100%
              </div>
              <div
                class="order-summary__extra"
                v-if="order.data.isNeedChildChair"
              >
                С <span>детским креслом</span>
              </div>
              <div class="order-summary__extra" v-if="order.data.isRightWheel">
                С <span>правым рулём</span>
              </div>
              <div class="order-summary__extra" v-if="availableFrom">
                <span>Доступна</span> с {{ availableFrom }}
              </div>
            </div>
            <div class="order-summary__col">
              <img
                v-image-fall-back
                v-if="
                  order.data.carId.thumbnail && order.data.carId.thumbnail.path
                "
                :src="order.data.carId.thumbnail.path"
                alt="Выбранная модель автомобиля"
                class="order-summary__img"
              />
            </div>
          </div>
          <div class="order-main__details order-details">
            <h3 class="order-details__title">Ваш заказ:</h3>
            <ul class="order-details__list details-list">
              <li
                class="details-list__item details-item"
                v-if="order.data.cityId.name || order.data.pointId.address"
              >
                <div class="details-item__title">Пункт выдачи</div>
                <div class="details-item__value">
                  {{ orderCity }}{{ orderPoint }}
                </div>
              </li>
              <li
                class="details-list__item details-item"
                v-if="order.data.carId.name"
              >
                <div class="details-item__title">Модель</div>
                <div class="details-item__value">
                  {{ order.data.carId.name }}
                </div>
              </li>
              <li
                class="details-list__item details-item"
                v-if="order.data.color"
              >
                <div class="details-item__title">Цвет</div>
                <div class="details-item__value">{{ order.data.color }}</div>
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
                v-if="order.data.rateId.rateTypeId.name"
              >
                <div class="details-item__title">Тариф</div>
                <div class="details-item__value">
                  {{ order.data.rateId.rateTypeId.name }}
                </div>
              </li>
              <li
                class="details-list__item details-item"
                v-if="order.data.isFullTank"
              >
                <div class="details-item__title">Полный бак</div>
                <div class="details-item__value">Да</div>
              </li>
              <li
                class="details-list__item details-item"
                v-if="order.data.isNeedChildChair"
              >
                <div class="details-item__title">Детское кресло</div>
                <div class="details-item__value">Да</div>
              </li>
              <li
                class="details-list__item details-item"
                v-if="order.data.isRightWheel"
              >
                <div class="details-item__title">Правый руль</div>
                <div class="details-item__value">Да</div>
              </li>
            </ul>
            <div class="order-details__price" v-if="order.data.price">
              <span>Цена:</span> {{ order.data.price }} ₽
            </div>
            <button
              v-if="order.data.orderStatusId.name !== 'Отмененые'"
              class="btn btn-danger order-details__btn"
              @click="$bvModal.show(`order-confirmation-modal`)"
            >
              Отменить
            </button>
          </div>
        </div>
      </div>
    </main>

    <OrderConfirmationModal modalPurpose="Отменить" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Loader from '@/components/common/Loader.vue';
import OrderConfirmationModal from '@/components/modals/OrderConfirmationModal.vue';
export default {
  computed: {
    ...mapState(['order']),
    orderID() {
      return this.$route.params.id;
    },
    dateFrom() {
      let isDateFromAvailable = this.order.data.dateFrom;
      if (isDateFromAvailable) {
        let date = new Date(this.order.data.dateFrom);
        return (
          [
            date.getFullYear(),
            this.padTo2Digits(date.getMonth() + 1),
            this.padTo2Digits(date.getDate()),
          ].join('-') +
          ' ' +
          [
            this.padTo2Digits(date.getHours()),
            this.padTo2Digits(date.getMinutes()),
          ].join(':')
        );
      }
      return null;
    },
    dateTo() {
      let isDateToAvailable = this.order.data.dateTo;
      if (isDateToAvailable) {
        let date = new Date(this.order.data.dateTo);
        return (
          [
            date.getFullYear(),
            this.padTo2Digits(date.getMonth() + 1),
            this.padTo2Digits(date.getDate()),
          ].join('-') +
          ' ' +
          [
            this.padTo2Digits(date.getHours()),
            this.padTo2Digits(date.getMinutes()),
          ].join(':')
        );
      }
      return null;
    },
    availableFrom() {
      let isDateFromAvailable = this.dateFrom;

      if (isDateFromAvailable) {
        return `${this.dateFrom.split(' ')[0].split('-').reverse().join('.')} ${
          this.dateFrom.split(' ')[1]
        }`;
      }
      return null;
    },
    duration() {
      let datesAreAvailable = this.dateFrom && this.dateTo;

      if (datesAreAvailable) {
        var delta =
          Math.abs(new Date(this.dateTo) - new Date(this.dateFrom)) / 1000;

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
    orderStatus() {
      let isOrderDataAvailable =
        this.order && this.order.data.orderStatusId.name;

      if (isOrderDataAvailable) {
        return this.order.data.orderStatusId.name === 'Отмененые'
          ? 'отменен'
          : 'подтверждён';
      }
      return null;
    },
    orderCity() {
      if (this.order) {
        return this.order.data.cityId.name
          ? `${this.order.data.cityId.name}`
          : '';
      }
      return null;
    },
    orderPoint() {
      if (this.order) {
        return this.order.data.pointId.address
          ? this.order.data.cityId.name
            ? `, ${this.order.data.pointId.address}`
            : this.order.data.pointId.address
          : '';
      }
      return null;
    },
  },
  methods: {
    padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    },
  },
  async mounted() {
    await this.$store.dispatch('getOrderStatus', 'Отмененые');
  },
  watch: {
    orderID: {
      handler: async function (val) {
        let isOrderIdAvailable = val !== undefined;

        if (isOrderIdAvailable) {
          await this.$store.dispatch('getOrder', val);
        }
      },
      immediate: true,
    },
  },
  components: {
    Loader,
    OrderConfirmationModal,
  },
};
</script>
