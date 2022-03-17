<template>
  <b-modal
    id="order-confirmation-modal"
    class="order-confirmation-modal"
    :hide-header="true"
  >
    <p class="order-confirmation-modal__text">Подтвердить заказ</p>
    <template #modal-footer>
      <button
        class="btn"
        @click="sendOrder"
        :disabled="orderRequest.status === 'loading'"
      >
        Подтвердить
      </button>
      <button
        class="btn btn-danger"
        @click="$bvModal.hide(`order-confirmation-modal`)"
      >
        Вернуться
      </button>
    </template>
  </b-modal>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['orderRequest']),
  },
  methods: {
    async sendOrder() {
      await this.$store.dispatch('sendOrder');
    },
  },
  watch: {
    'orderRequest.response': {
      handler: function (val) {
        if (val.id && val.id !== '' && val.id !== undefined) {
          this.$router.push(`/order-details/${val.id}`);
        }
      },
    },
  },
};
</script>
