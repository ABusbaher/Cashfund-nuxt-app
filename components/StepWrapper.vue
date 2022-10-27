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
      continue: ''
    }
  },
  methods: {
    nextStep () {
      const currentIndex = this.steps.indexOf(this.currentStep)
      const nextIndex = (currentIndex + 1) % this.steps.length
      this.currentStep = this.steps[nextIndex]
    },
    previousStep () {
      const currentIndex = this.steps.indexOf(this.currentStep)
      const previousIndex = (currentIndex - 1) % this.steps.length
      this.currentStep = this.steps[previousIndex]
    },
    donationStep (value) {
      this.continue = value.value
    }
  }
}
</script>

<template>
  <div class="step-wrapper">
    Progress bar
    <p>Form element</p>
    <div v-if="currentStep === 'donate'">
      <DonateStep @can-continue="donationStep" />
    </div>
    <div v-else-if="currentStep === 'personal'">
      <PersonalStep />
    </div>
    <div v-else-if="currentStep === 'donation-info'">
      <DonationInfoStep />
    </div>
    <div v-else-if="currentStep === 'payment'">
      <PaymentStep />
    </div>
    <div v-else-if="currentStep === 'confirmation'">
      <ConfirmationStep />
    </div>
    <div v-else>
      Bad data sent!
    </div>

    <button v-if="currentStep !== 'donate'" @click="previousStep">
      Previous Step
    </button>
    <button
      v-if="currentStep !== 'confirmation'"
      :class="['button', this.continue ? 'btn-active' : '']"
      :disabled="!this.continue"
      @click="nextStep"
    >
      Next Step
    </button>
  </div>
</template>
