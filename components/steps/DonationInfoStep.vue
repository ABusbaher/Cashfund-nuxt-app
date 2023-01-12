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
  <div class="form">
    <div class="form__input">
      <h2 class="form__title">
        Donation information
      </h2>
      <label for="accountHolder" class="form__input__lbl">Name of Account holder</label>
      <input
        id="accountHolder"
        v-model.trim="donationInfo.accountHolder"
        name="accountHolder"
        :class="['form__input__txt', ($v.donationInfo.accountHolder.$error) ? 'is-danger' : '']"
        type="text"
        placeholder="Enter your account holder name"
        @keyup="setAccountHolder($event.target.value)"
      >
      <p v-if="!$v.donationInfo.accountHolder.required && showErrors" class="error-txt">
        Account holder name is required
      </p>

      <label for="accountNumber" class="form__input__lbl">Account number</label>
      <input
        id="accountNumber"
        v-model.trim="donationInfo.accountNumber"
        name="accountNumber"
        :class="['form__input__txt', ($v.donationInfo.accountNumber.$error) ? 'is-danger' : '']"
        type="text"
        placeholder="Enter your account number"
        @keyup="setAccountNumber($event.target.value)"
      >
      <p v-if="!$v.donationInfo.accountNumber.required && showErrors" class="error-txt">
        Account number name is required
      </p>
      <p v-if="!$v.donationInfo.accountNumber.numeric && showErrors" class="error-txt">
        Only numbers allowed for account number
      </p>

      <label for="amount" class="form__input__lbl">Your donation</label>
      <div class="form__input__disabled">
        <input
          id="amount"
          name="amount"
          type="text"
          :value="'€ ' + donationInfo.amount"
          disabled
        >
        <span
          class="tooltip tooltip--left"
          data-text="Already entered value, if you want to change it please go to previous steps"
        >
          <img :src="require('/assets/images/icons/help_outline.svg')" alt="tooltip">
        </span>
      </div>

      <label for="frequency" class="form__input__lbl">Payment frequency</label>
      <div class="form__input__disabled">
        <input
          id="frequency"
          name="amount"
          type="text"
          :value="donationInfo.type"
          disabled
        >
        <span
          class="tooltip tooltip--left"
          data-text="Already entered value, if you want to change it please go to previous steps"
        >
          <img :src="require('/assets/images/icons/help_outline.svg')" alt="tooltip">
        </span>
      </div>

      <div class="form__input__checkbox">
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
        </label>
      </div>
      <p v-if="!$v.donationInfo.confirmAccount.required && showErrors" class="error-txt">
        Please confirm that you are account holder
      </p>
    </div>
    <div class="form__input">
      <h2 class="form__title">
        Gift aid
      </h2>
      <div class="licence-agreement">
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
        <div class="form__input__checkbox">
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
          </label>
        </div>
        <p v-if="!$v.donationInfo.confirmPayment.required && showErrors" class="error-txt">
          Please confirm that you accept above statement
        </p>
      </div>
    </div>
  </div>
</template>
