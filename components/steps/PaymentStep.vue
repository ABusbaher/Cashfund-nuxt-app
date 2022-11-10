<script>
import { validationMixin } from 'vuelidate'
import { required, numeric, between } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
const twoDigitsCurrentYear = parseInt(new Date().getFullYear().toString().substr(2, 2))
const currentMonth = new Date().getMonth() + 1

export default {
  name: 'PaymentStep',
  mixins: [validationMixin],
  props: {
    showErrors: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      paymentInfo: {
        cardType: this.$store.state.payment.PaymentInformation.cardType,
        cardNumber: this.$store.state.payment.PaymentInformation.cardNumber,
        firstName: this.$store.state.payment.PaymentInformation.firstName,
        surname: this.$store.state.payment.PaymentInformation.surname,
        validFrom: this.$store.state.payment.PaymentInformation.validFrom,
        expiryDate: this.$store.state.payment.PaymentInformation.expiryDate,
        issueNumber: this.$store.state.payment.PaymentInformation.issueNumber,
        securityNumber: this.$store.state.payment.PaymentInformation.securityNumber,
        validFromMonth: this.$store.state.payment.PaymentInformation.validFrom.substring(
          0, this.$store.state.payment.PaymentInformation.validFrom.indexOf('/')),
        validFromYear: this.$store.state.payment.PaymentInformation.validFrom.split('/')[1],
        expiryDateMonth: this.$store.state.payment.PaymentInformation.expiryDate.substring(
          0, this.$store.state.payment.PaymentInformation.expiryDate.indexOf('/')),
        expiryDateYear: this.$store.state.payment.PaymentInformation.expiryDate.split('/')[1]
      }
    }
  },
  validations: {
    paymentInfo: {
      cardNumber: {
        required,
        numeric
      },
      firstName: {
        required
      },
      surname: {
        required
      },
      validFromMonth: {
        required,
        between: between(1, 12)
      },
      validFromYear: {
        required,
        between: between(twoDigitsCurrentYear - 7, twoDigitsCurrentYear),
        isCurrentDateOrLess (value, { validFromMonth }) {
          if (parseInt(value) < twoDigitsCurrentYear) {
            return true
          }
          return parseInt(value) === twoDigitsCurrentYear && parseInt(validFromMonth) <= currentMonth
        }
      },
      expiryDateMonth: {
        required,
        between: between(1, 12)
      },
      expiryDateYear: {
        required,
        between: between(twoDigitsCurrentYear, twoDigitsCurrentYear + 7),
        isCurrentDateOrMore (value, { expiryDateMonth }) {
          if (parseInt(value) > twoDigitsCurrentYear) {
            return true
          }
          return parseInt(value) === twoDigitsCurrentYear && parseInt(expiryDateMonth) >= currentMonth
        }
      },
      issueNumber: {
        required,
        numeric
      },
      securityNumber: {
        required,
        numeric
      }
    }
  },
  computed: {
    ...mapState(['payment'])
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
    setCardType (value) {
      this.paymentInfo.cardType = value
      this.$store.commit('payment/setPaymentCardType', value)
    },
    setCardNumber (value) {
      this.paymentInfo.cardNumber = value
      this.$v.paymentInfo.cardNumber.$touch()
      this.$store.commit('payment/setPaymentCardNumber', value)
    },
    setFirstName (value) {
      this.paymentInfo.firstName = value
      this.$v.paymentInfo.firstName.$touch()
      this.$store.commit('payment/setPaymentFirstName', value)
    },
    setSurname (value) {
      this.paymentInfo.surname = value
      this.$v.paymentInfo.surname.$touch()
      this.$store.commit('payment/setPaymentSurname', value)
    },
    setValidFrom (value) {
      this.paymentInfo.validFrom = value
      this.$v.paymentInfo.validFrom.$touch()
      this.$store.commit('payment/setPaymentValidFrom', value)
    },
    setValidFromMonth (value) {
      this.paymentInfo.validFromMonth = value
      this.$v.paymentInfo.validFromMonth.$touch()
      this.$store.commit('payment/setPaymentValidFromMonth', value)
    },
    setValidFromYear (value) {
      this.paymentInfo.validFromYear = value
      this.$v.paymentInfo.validFromYear.$touch()
      this.$store.commit('payment/setPaymentValidFromYear', value)
    },
    setExpiryDateMonth (value) {
      this.paymentInfo.expiryDateMonth = value
      this.$v.paymentInfo.expiryDateMonth.$touch()
      this.$store.commit('payment/setPaymentExpiryDateMonth', value)
    },
    setExpiryDateYear (value) {
      this.paymentInfo.expiryDateYear = value
      this.$v.paymentInfo.expiryDateYear.$touch()
      this.$store.commit('payment/setPaymentExpiryDateYear', value)
    },
    setIssueNumber (value) {
      this.paymentInfo.issueNumber = value
      this.$v.paymentInfo.issueNumber.$touch()
      this.$store.commit('payment/setPaymentIssueNumber', value)
    },
    setSecurityNumber (value) {
      this.paymentInfo.securityNumber = value
      this.$v.paymentInfo.securityNumber.$touch()
      this.$store.commit('payment/setPaymentSecurityNumber', value)
    }
  }
}
</script>

<template>
  <div class="form">
    <div class="form__input">
      <h2 class="form__title">
        Payment details
      </h2>
      <label class="form__input__lbl">Card type</label>
      <select class="form__input__select" @change="setCardType($event.target.value)">
        <option value="visa" :selected="'visa' === $store.state.payment.PaymentInformation.cardType">
          Visa debit
        </option>
        <option value="master-card" :selected="'master-card' === $store.state.payment.PaymentInformation.cardType">
          Master Card
        </option>
      </select>

      <label for="cardNumber" class="form__input__lbl">Card number</label>
      <input
        id="cardNumber"
        v-model.trim="paymentInfo.cardNumber"
        name="cardNumber"
        type="text"
        :class="['form__input__txt', ($v.paymentInfo.cardNumber.$error) ? 'is-danger' : '']"
        placeholder="Enter your card number"
        @keyup="setCardNumber($event.target.value)"
      >
      <p v-if="!$v.paymentInfo.cardNumber.required && showErrors" class="error-txt">
        Card number is required
      </p>
      <p v-if="!$v.paymentInfo.cardNumber.numeric && showErrors" class="error-txt">
        Only numbers allowed for card number
      </p>

      <label for="firstName" class="form__input__lbl">First name</label>
      <input
        id="firstName"
        v-model.trim="paymentInfo.firstName"
        name="firstName"
        type="text"
        :class="['form__input__txt', ($v.paymentInfo.firstName.$error) ? 'is-danger' : '']"
        placeholder="Enter your first name"
        @keyup="setFirstName($event.target.value)"
      >
      <p v-if="!$v.paymentInfo.firstName.required && showErrors" class="error-txt">
        First name is required
      </p>

      <label for="surname" class="form__input__lbl">Surname</label>
      <input
        id="surname"
        v-model.trim="paymentInfo.surname"
        name="firstName"
        type="text"
        :class="['form__input__txt', ($v.paymentInfo.surname.$error) ? 'is-danger' : '']"
        placeholder="Enter your surname"
        @keyup="setSurname($event.target.value)"
      >
      <p v-if="!$v.paymentInfo.surname.required && showErrors" class="error-txt">
        Surname is required
      </p>

      <br>
      <label for="validFromMonth" class="form__input__lbl">Valid from</label>
      <input
        id="validFromMonth"
        v-model.trim="paymentInfo.validFromMonth"
        name="validFromMonth"
        type="text"
        :class="['form__input__small', ($v.paymentInfo.validFromMonth.$error) ? 'is-danger' : '']"
        @keyup="setValidFromMonth($event.target.value)"
      >
      <span class="delimiter">/</span>
      <input
        id="validFromYear"
        v-model.trim="paymentInfo.validFromYear"
        name="validFromYear"
        type="text"
        :class="['form__input__small', ($v.paymentInfo.validFromMonth.$error) ? 'is-danger' : '']"
        @keyup="setValidFromYear($event.target.value)"
      >
      <p v-if="!$v.paymentInfo.validFromMonth.required && showErrors" class="error-txt">
        Card valid from month is required
      </p>
      <p v-if="!$v.paymentInfo.validFromMonth.between && showErrors" class="error-txt">
        Card valid from month must be between {{ $v.paymentInfo.validFromMonth.$params.between.min }} and
        {{ $v.paymentInfo.validFromMonth.$params.between.max }}
      </p>
      <p v-if="!$v.paymentInfo.validFromYear.required && showErrors" class="error-txt">
        Card valid from year is required
      </p>
      <p v-if="!$v.paymentInfo.validFromYear.between && showErrors" class="error-txt">
        Card valid from year must be between {{ $v.paymentInfo.validFromYear.$params.between.min }} and
        {{ $v.paymentInfo.validFromYear.$params.between.max }}
      </p>

      <p v-if="!$v.paymentInfo.validFromYear.isCurrentDateOrLess && showErrors" class="error-txt">
        Card valid from date can not be in future
      </p>
      <br>
      <label for="expiryDateMonth" class="form__input__lbl">Expiry date</label>
      <input
        id="expiryDateMonth"
        v-model.trim="paymentInfo.expiryDateMonth"
        name="expiryDateMonth"
        type="text"
        :class="['form__input__small', ($v.paymentInfo.expiryDateMonth.$error) ? 'is-danger' : '']"
        @keyup="setExpiryDateMonth($event.target.value)"
      >
      <span class="delimiter">/</span>
      <input
        id="expiryDateYear"
        v-model.trim="paymentInfo.expiryDateYear"
        name="validFromYear"
        type="text"
        :class="['form__input__small', ($v.paymentInfo.expiryDateMonth.$error) ? 'is-danger' : '']"
        @keyup="setExpiryDateYear($event.target.value)"
      >
      <p v-if="!$v.paymentInfo.expiryDateMonth.required && showErrors" class="error-txt">
        Card expiry date month is required
      </p>
      <p v-if="!$v.paymentInfo.expiryDateMonth.between && showErrors" class="error-txt">
        Card expiry date month must be between {{ $v.paymentInfo.expiryDateMonth.$params.between.min }} and
        {{ $v.paymentInfo.expiryDateMonth.$params.between.max }}
      </p>
      <p v-if="!$v.paymentInfo.expiryDateYear.required && showErrors" class="error-txt">
        Card expiry date year is required
      </p>
      <p v-if="!$v.paymentInfo.expiryDateYear.between && showErrors" class="error-txt">
        Card expiry date year must be between {{ $v.paymentInfo.expiryDateYear.$params.between.min }} and
        {{ $v.paymentInfo.expiryDateYear.$params.between.max }}
      </p>

      <p v-if="!$v.paymentInfo.expiryDateYear.isCurrentDateOrMore && showErrors" class="error-txt">
        Card expiry date can not be in the past
      </p>

      <label for="issueNumber" class="form__input__lbl">Issue number</label>
      <input
        id="issueNumber"
        v-model.trim="paymentInfo.issueNumber"
        name="issueNumber"
        type="text"
        :class="['form__input__txt', ($v.paymentInfo.issueNumber.$error) ? 'is-danger' : '']"
        placeholder="Enter your card issue number"
        @keyup="setIssueNumber($event.target.value)"
      >
      <p v-if="!$v.paymentInfo.issueNumber.required && showErrors" class="error-txt">
        Card issue number is required
      </p>
      <p v-if="!$v.paymentInfo.issueNumber.numeric && showErrors" class="error-txt">
        Only numbers allowed for card issue number
      </p>

      <label for="securityNumber" class="form__input__lbl">Security number</label>
      <div class="input-with-tooltip">
        <input
          id="securityNumber"
          v-model.trim="paymentInfo.securityNumber"
          name="securityNumber"
          type="text"
          :class="['form__input__txt', ($v.paymentInfo.securityNumber.$error) ? 'is-danger' : '']"
          placeholder="Enter your card security number"
          @keyup="setSecurityNumber($event.target.value)"
        >
        <div class="img-tooltip">
          <span class="tooltip tooltip--left" data-text="Check back of card">
            <img :src="require('/assets/images/icons/help_outline.svg')" alt="tooltip">
          </span>
        </div>
      </div>
      <p v-if="!$v.paymentInfo.securityNumber.required && showErrors" class="error-txt">
        Card security number is required
      </p>
      <p v-if="!$v.paymentInfo.securityNumber.numeric && showErrors" class="error-txt">
        Only numbers allowed for card security number
      </p>
    </div>
  </div>
</template>
