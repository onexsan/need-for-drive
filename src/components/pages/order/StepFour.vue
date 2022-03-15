<template>
  <div class="order__summary order-summary">
    <div class="order-summary__model" v-if="orderDetails.name">
      {{ orderDetails.name }}
    </div>
    <div class="order-summary__license" v-if="orderDetails.number">
      {{ orderDetails.number }}
    </div>
    <div class="order-summary__extra" v-if="orderDetails.extraFuel === true">
      <span>Топливо</span> 100%
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
    <div class="order-summary__extra" v-if="orderDetails.dateFrom">
      <span>Доступна</span> с
      {{ orderDetails.dateFrom.split('-').reverse().join('.') }}
    </div>
    <img
      v-image-fall-back
      v-if="orderDetails.thumbnail && orderDetails.thumbnail.path"
      :src="orderDetails.thumbnail.path"
      alt="Выбранная модель автомобиля"
      class="order-summary__img"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['orderDetails']),
  },
};
</script>
