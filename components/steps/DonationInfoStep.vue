<script>
import { validationMixin } from 'vuelidate'
import { required, numeric } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'

export default {
  name: 'DonationInfoStep',
  mixins: [validationMixin],
  props: {
    showErrors: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      donationInfo: {
        accountHolder: this.$store.state.donation.DonationInformation.accountHolder,
        accountNumber: this.$store.state.donation.DonationInformation.accountNumber,
        amount: this.$store.state.donation.DonationInformation.amount,
        type: this.$store.state.donation.DonationInformation.frequency,
        confirmAccount: this.$store.state.donation.DonationInformation.confirmAccount,
        confirmPayment: this.$store.state.donation.DonationInformation.confirmPayment
      }
    }
  },
  validations: {
    donationInfo: {
      accountHolder: {
        required
      },
      accountNumber: {
        required,
        numeric
      },
      amount: {
        required,
        numeric
      },
      type: {
        required
      },
      confirmAccount: {
        required: function () {
          return this.donationInfo.confirmAccount
        }
      },
      confirmPayment: {
        required: function () {
          return this.donationInfo.confirmPayment
        }
      }
    }
  },
  computed: {
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
    setAccountHolder (value) {
      this.donationInfo.accountHolder = value
      this.$v.donationInfo.accountHolder.$touch()
      this.$store.commit('donation/setDonationAccountHolder', value)
    },
    setAccountNumber (value) {
      this.donationInfo.accountNumber = value
      this.$v.donationInfo.accountNumber.$touch()
      this.$store.commit('donation/setDonationAccountNumber', value)
    },
    setAmount (value) {
      this.donationInfo.amount = value
      this.$v.donationInfo.amount.$touch()
      this.$store.commit('donation/setDonationAmount', value)
    },
    setFrequency (value) {
      this.donationInfo.type = value
      this.$v.donationInfo.type.$touch()
      this.$store.commit('donation/setDonationFrequency', value)
    },
    setConfirmAccount (value) {
      this.donationInfo.confirmAccount = value
      this.$v.donationInfo.confirmAccount.$touch()
      this.$store.commit('donation/setConfirmAccount', value)
    },
    setConfirmPayment (value) {
      this.donationInfo.confirmPayment = value
      this.$v.donationInfo.confirmPayment.$touch()
      this.$store.commit('donation/setConfirmPayment', value)
    }
  }
}
</script>

<template>
  <div>
    Donation Info form
    <label for="accountHolder">Name of Account holder</label>
    <input
      id="accountHolder"
      v-model.trim="donationInfo.accountHolder"
      name="accountHolder"
      type="text"
      placeholder="Enter your account holder name"
      @keyup="setAccountHolder($event.target.value)"
    >
    <p v-if="!$v.donationInfo.accountHolder.required && showErrors" class="error">
      Account holder name is required
    </p>

    <label for="accountNumber">Account number</label>
    <input
      id="accountNumber"
      v-model.trim="donationInfo.accountNumber"
      name="accountNumber"
      type="text"
      placeholder="Enter your account number"
      @keyup="setAccountNumber($event.target.value)"
    >
    <p v-if="!$v.donationInfo.accountNumber.required && showErrors" class="error">
      Account number name is required
    </p>
    <p v-if="!$v.donationInfo.accountNumber.numeric && showErrors" class="error">
      Only numbers allowed for account number
    </p>

    <label for="amount">Your donation</label>
    <input
      id="amount"
      v-model.trim="donationInfo.amount"
      name="amount"
      type="text"
      placeholder="Enter your donation amount"
      @keyup="setAmount($event.target.value)"
    >
    <p v-if="!$v.donationInfo.amount.required && showErrors" class="error">
      Donation amount is required
    </p>
    <p v-if="!$v.donationInfo.amount.numeric && showErrors" class="error">
      Only numbers allowed for donation amount
    </p>

    <select @change="setFrequency($event.target.value)">
      <option value="monthly" :selected="'monthly' === $store.state.donation.DonationInformation.frequency">
        Monthly
      </option>
      <option value="one-off" :selected="'one-off' === $store.state.donation.DonationInformation.frequency">
        One-off
      </option>
    </select>

    <input
      id="confirmAccount"
      type="checkbox"
      name="confirmAccount"
      :value="donationInfo.confirmAccount"
      :checked="donationInfo.confirmAccount"
      @change="setConfirmAccount($event.target.checked)"
    >
    <label for="confirmAccount">
      I confirm that I am the account holder and the only person required to authorise debits from this account.
    </label><br>
    <p v-if="!$v.donationInfo.confirmAccount.required && showErrors" class="error">
      Please confirm that you are account holder
    </p>

    <p>
      I confirm I have paid or will pay an amount of Income Tax and / or Capital Gains Tax for each tax year
      (6 April to 5 April) that is at least equal to the amount of tax that all the charities or
      Community Amateur Sports Clubs (CASs) that I donate to will reclaim on my gifts for that tax year.
      By ticking this box I confirm that I want to treat all donations I have made for the last 4 years
      and any future donations I may make, as Gift aid donations until further notice.
    </p>
    <p>
      I understand that other taxes such as VAT and Council Tax do not qualify. I understand the charity will redeem
      28p of tax on every €1 that I give or after 6 April 2019.
    </p>
    <input
      id="confirmPayment"
      type="checkbox"
      name="confirmPayment"
      :value="donationInfo.confirmPayment"
      :checked="donationInfo.confirmPayment"
      @change="setConfirmPayment($event.target.checked)"
    >
    <label for="confirmAccount">
      I have read and I understand the above statement.
    </label><br>
    <p v-if="!$v.donationInfo.confirmPayment.required && showErrors" class="error">
      Please confirm that you accept above statement
    </p>
  </div>
</template>
