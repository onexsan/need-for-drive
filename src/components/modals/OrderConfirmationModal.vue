<template>
  <b-modal
    id="order-confirmation-modal"
    class="order-confirmation-modal"
    :hide-header="true"
  >
    <p class="order-confirmation-modal__text">Подтвердить заказ</p>
    <template #modal-footer>
      <button class="btn">Подтвердить</button>
      <button
        class="btn btn-danger"
        @click="$bvModal.hide(`order-confirmation-modal`)"
      >
        Вернуться
      </button>
    </template>
  </b-modal>
</template>
