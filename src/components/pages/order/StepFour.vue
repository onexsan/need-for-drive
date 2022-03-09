<template>
  <div class="order__summary order-summary">
    <div class="order-summary__model" v-if="filledForm.model">
      {{ filledForm.model }}
    </div>
    <div class="order-summary__license">K 761 HA 73</div>
    <div class="order-summary__extra" v-if="filledForm.extraFuel === true">
      <span>Топливо</span> 100%
    </div>
    <div class="order-summary__extra" v-if="filledForm.extraBabyChair === true">
      С <span>детским креслом</span>
    </div>
    <div class="order-summary__extra" v-if="filledForm.extraRightSide === true">
      С <span>правым рулём</span>
    </div>
    <div class="order-summary__extra" v-if="filledForm.dateFrom">
      <span>Доступна</span> с
      {{ filledForm.dateFrom.split('-').reverse().join('.') }}
    </div>
    <img
      src="~@/assets/img/car-example.png"
      alt="Выбранная модель автомобиля"
      class="order-summary__img"
    />
  </div>
</template>

<script>
export default {
  props: ['filledForm'],
};
</script>
