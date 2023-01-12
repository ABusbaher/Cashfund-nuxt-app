<script>
import DonateStep from '@/components/steps/DonateStep'
import PaymentStep from '@/components/steps/PaymentStep'
import DonationInfoStep from '@/components/steps/DonationInfoStep'
import PersonalStep from '@/components/steps/PersonalStep'
import ConfirmationStep from '@/components/steps/ConfirmationStep'
import AllStepsWithError from "@/components/steps/AllStepsWithError";

export default {
  name: 'StepWrapper',
  components: {
    DonateStep,
    PaymentStep,
    DonationInfoStep,
    PersonalStep,
    ConfirmationStep,
    AllStepsWithError
  },
  data () {
    return {
      steps: ['donate', 'personal', 'donation-info', 'payment', 'confirmation'],
      currentStep: 'donate',
      continue: '',
      showErrors: false,
      forceActive: true,
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
    <div class="step-wrapper__progress-bar" v-show="forceActive === false">
      <span class="step-wrapper__progress-bar__step1"
            data-text = "1"
            data-text-desktop = "1 - Donate"
      />
      <span
        :class="['step-wrapper__progress-bar__step2', currentStep !== 'donate' ? 'active-step' : '']"
        data-text = "2"
        data-text-desktop = "2 - Personal"
      />
      <span
        :class="['step-wrapper__progress-bar__step3', (currentStep !== 'donate' && currentStep !== 'personal')
          ? 'active-step' : '']"
        data-text = "3"
        data-text-desktop = "3 - Donation info"
      />
      <span
        :class="['step-wrapper__progress-bar__step4', (currentStep === 'payment' || currentStep === 'confirmation')
          ? 'active-step' : '']"
        data-text = "4"
        data-text-desktop = "4 - Payment"
      />
      <span
        :class="currentStep === 'confirmation' ? 'active-step5' : 'step-wrapper__progress-bar__step5'"
        data-text = "5"
        data-text-desktop = "5 - Confirmation"
      />
    </div>
    <KeepAlive>
      <div v-if="forceActive === true">
        <AllStepsWithError />
      </div>
      <div v-else-if="currentStep === 'donate'">
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
    <div class="navigation-buttons">
      <button v-if="currentStep !== 'donate'" class="button btn-active" @click="previousStep">
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
  </div>
</template>
