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

<style lang="scss">
#order-confirmation-modal {
  .modal-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  ~ .modal-backdrop {
    background-color: $white;
  }

  .modal-content,
  .modal-footer {
    border: none;
  }

  .order-confirmation-modal__text {
    font-weight: normal;
    font-size: 24px;
    color: $black;
    text-align: center;

    @include phones {
      font-size: 16px;
    }
  }

  .modal-body {
    padding: 24px 24px 0px 24px;
  }
  .modal-footer {
    padding: 0px 24px 24px 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
