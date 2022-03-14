<template>
  <div>
    <StepOne
      v-show="currentStep === 1"
      @changeFormData="changeFormData"
    />
    <StepTwo v-show="currentStep === 2" @changeFormData="changeFormData" />
    <StepThree v-show="currentStep === 3" @changeFormData="changeFormData" />
    <StepFour v-show="currentStep === 4" :filledForm="filledForm" />
  </div>
</template>

<script>
import StepOne from '@/components/pages/order/StepOne.vue';
import StepTwo from '@/components/pages/order/StepTwo.vue';
import StepThree from '@/components/pages/order/StepThree.vue';
import StepFour from '@/components/pages/order/StepFour.vue';
export default {
  props: ['currentStep', 'filledForm'],
  components: {
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
  },
  data() {
    return {
      steps: {
        1: {
          formDetails: {},
          formStatus: false,
        },
        2: {
          formDetails: {},
          formStatus: false,
        },
        3: {
          formDetails: {},
          formStatus: false,
        },
      },
    };
  },
  methods: {
    changeFormData(val) {
      this.steps[val.step].formDetails = val.formDetails;
      this.steps[val.step].formStatus = val.formStatus;
    },
  },
  watch: {
    steps: {
      handler: function (val) {
        this.$emit('updateFormData', {
          steps: val,
        });
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
