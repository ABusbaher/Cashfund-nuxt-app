<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'DonateStep',
  mixins: [validationMixin],
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
      },
      monthlyGiving: true
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
      'setPersonalDetailsTitle',
      'donation/setDonationAmount',
      'donation/setDonationFrequency'
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
      this.$store.commit('donation/setDonationAmount', value)
    },
    updateDonationFrequency (value) {
      if (value === 'monthly') {
        this.$store.commit('donation/setDonationFrequency', value)
        this.payment.type = 'monthly'
        this.monthlyGiving = true
        return
      }
      this.$store.commit('donation/setDonationFrequency', 'one-off')
      this.payment.type = 'one-off'
      this.monthlyGiving = false
    }
  }
}
</script>

<template>
  <div>
    <h3>About you</h3>
    <label>Title</label>
    <select @change="setTitle($event.target.value)">
      <option value="mr" :selected="'mr' === $store.state.personalDetails.title">
        Mr
      </option>
      <option value="mrs" :selected="'mrs' === $store.state.personalDetails.title">
        Mrs
      </option>
    </select>
    <label for="first-name">First name</label>
    <input
      id="first-name"
      v-model.trim="form.firstName"
      name="first-name"
      type="text"
      :class="['input', ($v.form.firstName.$error) ? 'is-danger' : '']"
      placeholder="Enter your first name"
      @keyup="setFirstName($event.target.value)"
    >
    <p v-if="!$v.form.firstName.required" class="error">
      First name is required
    </p>

    <label for="last-name">Last name</label>
    <input
      id="last-name"
      v-model.trim="form.lastName"
      name="last-name"
      type="text"
      placeholder="Enter your last name"
      @keyup="setLastName($event.target.value)"
    >
    <p v-if="!$v.form.lastName.required" class="error">
      Last name is required
    </p>

    <label for="email">Email</label>
    <input
      id="email"
      v-model.trim="form.email"
      name="email"
      type="text"
      placeholder="Enter your email address"
      @keyup="setEmail($event.target.value)"
    >
    <p v-if="!$v.form.email.required" class="error">
      Email is required
    </p>
    <p v-if="!$v.form.email.email" class="error">
      Not valid email
    </p>

    <h3>Your gift</h3>
    <button
      :class="['button', (monthlyGiving === false) ? 'btn-active' : '']"
      @click="updateDonationFrequency('one-off')"
    >
      One-off Gift
    </button>
    <button
      :class="['button', (monthlyGiving === true) ? 'btn-active' : '']"
      @click="updateDonationFrequency('monthly')"
    >
      Regular giving
    </button>
    <br>
    <div v-show="monthlyGiving" class="monthly_gift" @change="setDonation($event.target.value)">
      <input
        id="5_monthly"
        type="radio"
        name="monthly_gift"
        value="5"
        :checked="'5' === $store.state.donation.DonationInformation.amount"
      >
      <label for="5_monthly">5€ a month</label>
      <input
        id="10_monthly"
        type="radio"
        name="monthly_gift"
        value="10"
        :checked="'10' === $store.state.donation.DonationInformation.amount"
      >
      <label for="10_monthly">10€ a month</label>
      <input
        id="20_monthly"
        type="radio"
        name="monthly_gift"
        value="20"
        :checked="'20' === $store.state.donation.DonationInformation.amount"
      >
      <label for="20_monthly">20€ a month</label>
      <input
        id="50_monthly"
        type="radio"
        name="monthly_gift"
        value="50"
        :checked="'50' === $store.state.donation.DonationInformation.amount"
      >
      <label for="50_monthly">50€ a month</label>
    </div>
    <div v-show="monthlyGiving === false" class="one-off_gift" @change="setDonation($event.target.value)">
      <input
        id="10_one-time"
        type="radio"
        name="one-off_gift"
        value="10"
        :checked="'10' === $store.state.donation.DonationInformation.amount"
        @change="setDonation($event.target.value)"
      >
      <label for="10_one-time">10€</label>
      <input
        id="20_one-time"
        type="radio"
        name="one-off_gift"
        value="20"
        :checked="'20' === $store.state.donation.DonationInformation.amount"
      >
      <label for="20_one-time">20€</label>
      <input
        id="50_one-time"
        type="radio"
        name="one-off_gift"
        value="50"
        :checked="'50' === $store.state.donation.DonationInformation.amount"
      >
      <label for="50_one-time">50€</label>
      <input
        id="100_one-time"
        type="radio"
        name="one-off_gift"
        value="100"
        :checked="'100' === $store.state.donation.DonationInformation.amount"
      >
      <label for="100_one-time">100€</label>
    </div>
  </div>
</template>
