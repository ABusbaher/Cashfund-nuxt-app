<script>
import DonateStep from '@/components/steps/DonateStep'
import PaymentStep from '@/components/steps/PaymentStep'
import DonationInfoStep from '@/components/steps/DonationInfoStep'
import PersonalStep from '@/components/steps/PersonalStep'
import ConfirmationStep from '@/components/steps/ConfirmationStep'

export default {
  name: 'StepWrapper',
  components: {
    DonateStep,
    PaymentStep,
    DonationInfoStep,
    PersonalStep,
    ConfirmationStep
  },
  data () {
    return {
      steps: ['donate', 'personal', 'donation-info', 'payment', 'confirmation'],
      currentStep: 'donate',
      continue: '',
      showErrors: false
    }
  },
  methods: {
    nextStep () {
      if (!this.continue) {
        this.showErrors = true
        return
      }
      const currentIndex = this.steps.indexOf(this.currentStep)
      const nextIndex = (currentIndex + 1) % this.steps.length
      this.currentStep = this.steps[nextIndex]
      this.showErrors = false
    },
    previousStep () {
      const currentIndex = this.steps.indexOf(this.currentStep)
      const previousIndex = (currentIndex - 1) % this.steps.length
      this.currentStep = this.steps[previousIndex]
    },
    donationStep (value) {
      this.continue = value.value
    },
    personalStep (value) {
      this.continue = value.value
    },
    donationInfoStep (value) {
      this.continue = value.value
    },
    paymentStep (value) {
      this.continue = value.value
    }
  }
}
</script>

<template>
  <div class="step-wrapper">
    Progress bar
    <KeepAlive>
      <div v-if="currentStep === 'donate'">
        <DonateStep :show-errors="showErrors" @can-continue="donationStep" />
      </div>
      <div v-else-if="currentStep === 'personal'">
        <PersonalStep :show-errors="showErrors" @can-continue="personalStep" />
      </div>
      <div v-else-if="currentStep === 'donation-info'">
        <DonationInfoStep :show-errors="showErrors" @can-continue="donationInfoStep" />
      </div>
      <div v-else-if="currentStep === 'payment'">
        <PaymentStep :show-errors="showErrors" @can-continue="paymentStep" />
      </div>
      <div v-else-if="currentStep === 'confirmation'">
        <ConfirmationStep />
      </div>
      <div v-else>
        Bad data sent!
      </div>
    </KeepAlive>
    <button v-if="currentStep !== 'donate'" @click="previousStep">
      Previous Step
    </button>
    <button
      v-if="currentStep !== 'confirmation'"
      :class="['button', this.continue ? 'btn-active' : '']"
      @click="nextStep"
    >
      Next Step
    </button>
  </div>
</template>
