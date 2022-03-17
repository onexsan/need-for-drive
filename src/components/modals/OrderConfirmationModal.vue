<template>
  <b-modal
    id="order-confirmation-modal"
    class="order-confirmation-modal"
    :hide-header="true"
  >
    <p class="order-confirmation-modal__text">{{ aim }} заказ</p>
    <template #modal-footer>
      <button
        v-if="aim === `Подтвердить`"
        class="btn"
        @click="sendOrder"
        :disabled="orderRequest.status === 'loading'"
      >
        {{ aim }}
      </button>
      <button
        v-else-if="aim === `Отменить`"
        class="btn"
        @click="cancelOrder"
        :disabled="orderRequest.status === 'loading'"
      >
        {{ aim }}
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
  props: ['aim'],
  computed: {
    ...mapState(['orderRequest']),
  },
  methods: {
    async sendOrder() {
      await this.$store.dispatch('sendOrder');
    },
    async cancelOrder() {
      let orderID = this.$route.params.id;
      await this.$store.dispatch('cancelOrder', orderID);
    },
  },
  watch: {
    'orderRequest.response': {
      handler: function (val) {
        if (val.id && val.id !== '' && val.id !== undefined) {
          this.$router.push(`/order-details/${val.id}`).catch((err) => {
            if (
              err.name !== 'NavigationDuplicated' &&
              !err.message.includes(
                'Avoided redundant navigation to current location'
              )
            ) {
              console.log(err);
            } else {
              this.$router.go();
            }
          });
        }
      },
    },
  },
};
</script>
