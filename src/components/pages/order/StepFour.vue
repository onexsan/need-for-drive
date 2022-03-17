<template>
  <div class="order__summary order-summary">
    <div class="order-summary__col">
      <div class="order-summary__model" v-if="orderDetails.name">
        {{ orderDetails.name }}
      </div>
      <div class="order-summary__license" v-if="orderDetails.number">
        {{ orderDetails.number }}
      </div>
      <div
        class="order-summary__extra"
        v-if="orderDetails.tank || orderDetails.extraFuel === true"
      >
        <span>Топливо</span>
        {{ orderDetails.extraFuel === true ? '100' : orderDetails.tank }}%
      </div>
      <div
        class="order-summary__extra"
        v-if="orderDetails.extraBabyChair === true"
      >
        С <span>детским креслом</span>
      </div>
      <div
        class="order-summary__extra"
        v-if="orderDetails.extraRightSide === true"
      >
        С <span>правым рулём</span>
      </div>
      <div class="order-summary__extra" v-if="availableFrom">
        <span>Доступна</span> с
        {{ availableFrom }}
      </div>
    </div>
    <div class="order-summary__col">
      <img
        v-image-fall-back
        v-if="orderDetails.thumbnail && orderDetails.thumbnail.path"
        :src="orderDetails.thumbnail.path"
        alt="Выбранная модель автомобиля"
        class="order-summary__img"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['orderDetails']),
    availableFrom() {
      if (this.orderDetails.dateFrom) {
        return `${this.orderDetails.dateFrom
          .split(' ')[0]
          .split('-')
          .reverse()
          .join('.')} ${this.orderDetails.dateFrom.split(' ')[1]}`;
      }
      return null;
    },
  },
};
</script>
