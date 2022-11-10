<script>
import { validationMixin } from 'vuelidate'
import { required, email, helpers } from 'vuelidate/lib/validators'
import { mapState, mapMutations } from 'vuex'

const monthlyAmountValidator = (value, context) => context.type === 'monthly' ? helpers.req(value) : true
const oneOffAmountValidator = (value, context) => context.type === 'one-off' ? helpers.req(value) : true

export default {
  name: 'DonateStep',
  mixins: [validationMixin],
  props: {
    showErrors: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      form: {
        title: this.$store.state.personalDetails.title,
        firstName: this.$store.state.personalDetails.firstName,
        lastName: this.$store.state.personalDetails.lastName,
        email: this.$store.state.personalDetails.email
      },
      payment: {
        amount: this.$store.state.donation.DonationInformation.amount,
        type: this.$store.state.donation.DonationInformation.frequency
      }
    }
  },
  validations: {
    form: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      }
    },
    payment: {
      amount: {
        monthlyAmountValidator,
        oneOffAmountValidator
      }
    }
  },
  computed: {
    ...mapState(['personalDetails']),
    ...mapState(['donation'])
  },
  watch: {
    $v: {
      handler: function (val) {
        if (!val.$invalid) {
          this.$emit('can-continue', { value: true })
        } else {
          this.$emit('can-continue', { value: false })
        }
      },
      deep: true
    }
  },
  mounted () {
    if (!this.$v.$invalid) {
      this.$emit('can-continue', { value: true })
    } else {
      this.$emit('can-continue', { value: false })
    }
  },
  methods: {
    ...mapMutations([
      'setPersonalDetailsFirstName',
      'setPersonalDetailsLastName',
      'setPersonalDetailsEmail',
      'setPersonalDetailsTitle'
    ]),
    setFirstName (value) {
      this.form.firstName = value
      this.$v.form.firstName.$touch()
      this.setPersonalDetailsFirstName(value)
    },
    setLastName (value) {
      this.form.lastName = value
      this.$v.form.lastName.$touch()
      this.setPersonalDetailsLastName(value)
    },
    setEmail (value) {
      this.form.email = value
      this.$v.form.email.$touch()
      this.setPersonalDetailsEmail(value)
    },
    setTitle (value) {
      this.form.title = value
      this.setPersonalDetailsTitle(value)
    },
    setDonation (value) {
      this.payment.amount = value
      this.$v.payment.amount.$touch()
      this.$store.commit('donation/setDonationAmount', value)
    },
    updateDonationFrequency (value) {
      if (value === this.payment.type) {
        return
      }
      if (value === 'monthly') {
        this.$store.commit('donation/setDonationFrequency', value)
        this.payment.type = 'monthly'
        this.$store.commit('donation/setDonationAmount', null)
        this.payment.amount = null
        return
      }
      this.$store.commit('donation/setDonationFrequency', 'one-off')
      this.payment.type = 'one-off'
      this.$store.commit('donation/setDonationAmount', null)
      this.payment.amount = null
    }
  }
}
</script>

<template>
  <div class="form">
    <div class="form__input">
      <h2 class="form__title">
        About you
      </h2>
      <label class="form__input__lbl">Title</label>
      <select class="form__input__select" @change="setTitle($event.target.value)">
        <option value="mr" :selected="'mr' === $store.state.personalDetails.title">
          Mr
        </option>
        <option value="mrs" :selected="'mrs' === $store.state.personalDetails.title">
          Mrs
        </option>
      </select>
      <label for="first-name" class="form__input__lbl">First name</label>
      <input
        id="first-name"
        v-model.trim="form.firstName"
        name="first-name"
        type="text"
        :class="['form__input__txt', ($v.form.firstName.$error) ? 'is-danger' : '']"
        placeholder="Enter your first name"
        @keyup="setFirstName($event.target.value)"
      >
      <p v-if="!$v.form.firstName.required && showErrors" class="error-txt">
        First name is required
      </p>

      <label for="last-name" class="form__input__lbl">Last name</label>
      <input
        id="last-name"
        v-model.trim="form.lastName"
        name="last-name"
        type="text"
        :class="['form__input__txt', ($v.form.lastName.$error) ? 'is-danger' : '']"
        placeholder="Enter your last name"
        @keyup="setLastName($event.target.value)"
      >
      <p v-if="!$v.form.lastName.required && showErrors" class="error-txt">
        Last name is required
      </p>

      <label for="email" class="form__input__lbl">Email</label>
      <input
        id="email"
        v-model.trim="form.email"
        name="email"
        type="text"
        :class="['form__input__txt', ($v.form.email.$error) ? 'is-danger' : '']"
        placeholder="Enter your email address"
        @keyup="setEmail($event.target.value)"
      >
      <p v-if="!$v.form.email.required && showErrors" class="error-txt">
        Email is required
      </p>
      <p v-if="!$v.form.email.email && showErrors" class="error-txt">
        Not valid email
      </p>

      <h2 class="form__title">
        Your gift
      </h2>
      <div class="donation-buttons">
        <button
          :class="['button', (payment.type === 'one-off') ? 'btn-active' : '']"
          @click="updateDonationFrequency('one-off')"
        >
          One-off Gift
        </button>
        <button
          :class="['button', (payment.type === 'monthly') ? 'btn-active' : '']"
          @click="updateDonationFrequency('monthly')"
        >
          Regular giving
        </button>
      </div>
      <div v-show="payment.type === 'monthly'" class="donation-input" @change="setDonation($event.target.value)">
        <div class="donation-input__radio">
          <input
            id="5_monthly"
            type="radio"
            name="monthly_gift"
            value="5"
            :checked="'5' === $store.state.donation.DonationInformation.amount"
          >
          <label for="5_monthly">5€ a month</label>
        </div>
        <div class="donation-input__radio">
          <input
            id="10_monthly"
            type="radio"
            name="monthly_gift"
            value="10"
            :checked="'10' === $store.state.donation.DonationInformation.amount"
          >
          <label for="10_monthly">10€ a month</label>
        </div>
        <div class="donation-input__radio">
          <input
            id="20_monthly"
            type="radio"
            name="monthly_gift"
            value="20"
            :checked="'20' === $store.state.donation.DonationInformation.amount"
          >
          <label for="20_monthly">20€ a month</label>
        </div>
        <div class="donation-input__radio">
          <input
            id="50_monthly"
            type="radio"
            name="monthly_gift"
            value="50"
            :checked="'50' === $store.state.donation.DonationInformation.amount"
          >
          <label for="50_monthly">50€ a month</label>
        </div>

        <p v-if="!$v.payment.amount.monthlyAmountValidator && showErrors" class="error-txt">
          Please select monthly amount to donate
        </p>
      </div>

      <div v-show="payment.type === 'one-off'" class="donation-input" @change="setDonation($event.target.value)">
        <div class="donation-input__radio">
          <input
            id="10_one-time"
            type="radio"
            name="one-off_gift"
            value="10"
            :checked="'10' === $store.state.donation.DonationInformation.amount"
            @change="setDonation($event.target.value)"
          >
          <label for="10_one-time">10€</label>
        </div>

        <div class="donation-input__radio">
          <input
            id="20_one-time"
            type="radio"
            name="one-off_gift"
            value="20"
            :checked="'20' === $store.state.donation.DonationInformation.amount"
          >
          <label for="20_one-time">20€</label>
        </div>

        <div class="donation-input__radio">
          <input
            id="50_one-time"
            type="radio"
            name="one-off_gift"
            value="50"
            :checked="'50' === $store.state.donation.DonationInformation.amount"
          >
          <label for="50_one-time">50€</label>
        </div>
        <div class="donation-input__radio">
          <input
            id="100_one-time"
            type="radio"
            name="one-off_gift"
            value="100"
            :checked="'100' === $store.state.donation.DonationInformation.amount"
          >
          <label for="100_one-time">100€</label>
        </div>

        <p v-if="!$v.payment.amount.oneOffAmountValidator && showErrors" class="error-txt">
          Please select one off amount to donate
        </p>
      </div>
    </div>
  </div>
</template>
