<script>
import {validationMixin} from "vuelidate";
import {email, numeric, required} from "vuelidate/lib/validators";
import {mapMutations, mapState} from "vuex";

export default {
  name: 'AllStepsWithError',
  mixins: [validationMixin],
  // props: {
  //   showErrors: {
  //     type: Boolean,
  //     required: true
  //   }
  // },
  data () {
    return {
      showErrors: true,
      form: {
        title: this.$store.state.personalDetails.title,
        firstName: this.$store.state.personalDetails.firstName,
        lastName: this.$store.state.personalDetails.lastName,
        email: this.$store.state.personalDetails.email,
        mobile: this.$store.state.personalDetails.mobile,
        postcode: this.$store.state.personalDetails.postcode,
        houseNumber: this.$store.state.personalDetails.houseNumber,
        street: this.$store.state.personalDetails.street,
        city: this.$store.state.personalDetails.city,
        country: this.$store.state.personalDetails.country
      },
      payment: {
        amount: this.$store.state.donation.DonationInformation.amount,
        type: this.$store.state.donation.DonationInformation.frequency
      },
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
      },
      mobile: {
        required
      },
      postcode: {
        required
      },
      houseNumber: {
        required
      },
      street: {
        required
      },
      city: {
        required
      },
      country: {
        required
      }
    },
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
    // payment: {
    //   amount: {
    //     monthlyAmountValidator,
    //     oneOffAmountValidator
    //   }
    // }
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
    setMobile (value) {
      this.form.mobile = value
      this.$v.form.mobile.$touch()
      this.setPersonalDetailsMobile(value)
    },
    setPostCode (value) {
      this.form.postcode = value
      this.$v.form.postcode.$touch()
      this.setPersonalDetailsPostcode(value)
    },
    setHouseNumber (value) {
      this.form.houseNumber = value
      this.$v.form.houseNumber.$touch()
      this.setPersonalDetailsHouseNumber(value)
    },
    setStreet (value) {
      this.form.street = value
      this.$v.form.street.$touch()
      this.setPersonalDetailsStreet(value)
    },
    setCity (value) {
      this.form.city = value
      this.$v.form.city.$touch()
      this.setPersonalDetailsCity(value)
    },
    setCountry (value) {
      this.form.country = value
      this.$v.form.country.$touch()
      this.setPersonalDetailsCountry(value)
    },
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
        Personal details
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

      <label for="mobile" class="form__input__lbl">Mobile</label>
      <input
        id="mobile"
        v-model.trim="form.mobile"
        name="mobile"
        :class="['form__input__txt', ($v.form.mobile.$error) ? 'is-danger' : '']"
        type="text"
        placeholder="Enter your mobile phone"
        @keyup="setMobile($event.target.value)"
      >
      <p v-if="!$v.form.mobile.required && showErrors" class="error-txt">
        Mobile phone is required
      </p>
    </div>

    <div class="form__input">
      <h2 class="form__title">
        Billing address
      </h2>
      <label for="postcode" class="form__input__lbl">Postcode</label>
      <input
        id="postcode"
        v-model.trim="form.postcode"
        name="postcode"
        :class="['form__input__txt', ($v.form.postcode.$error) ? 'is-danger' : '']"
        type="text"
        placeholder="Enter your post code"
        @keyup="setPostCode($event.target.value)"
      >
      <p v-if="!$v.form.postcode.required && showErrors" class="error-txt">
        Post code is required
      </p>
      <label for="houseNumber" class="form__input__lbl">House number</label>
      <input
        id="houseNumber"
        v-model.trim="form.houseNumber"
        name="houseNumber"
        :class="['form__input__txt', ($v.form.houseNumber.$error) ? 'is-danger' : '']"
        type="text"
        placeholder="Enter your house number"
        @keyup="setHouseNumber($event.target.value)"
      >
      <p v-if="!$v.form.houseNumber.required && showErrors" class="error-txt">
        House number is required
      </p>
      <label for="street" class="form__input__lbl">Street</label>
      <input
        id="street"
        v-model.trim="form.street"
        name="street"
        :class="['form__input__txt', ($v.form.street.$error) ? 'is-danger' : '']"
        type="text"
        placeholder="Enter your street"
        @keyup="setStreet($event.target.value)"
      >
      <p v-if="!$v.form.street.required && showErrors" class="error-txt">
        Street is required
      </p>
      <label for="city" class="form__input__lbl">City</label>
      <input
        id="city"
        v-model.trim="form.city"
        name="city"
        :class="['form__input__txt', ($v.form.city.$error) ? 'is-danger' : '']"
        type="text"
        placeholder="Enter your city"
        @keyup="setCity($event.target.value)"
      >
      <p v-if="!$v.form.city.required && showErrors" class="error-txt">
        City is required
      </p>
      <label for="country" class="form__input__lbl">Country</label>
      <input
        id="country"
        v-model.trim="form.country"
        name="country"
        :class="['form__input__txt', ($v.form.country.$error) ? 'is-danger' : '']"
        type="text"
        placeholder="Enter your country"
        @keyup="setCountry($event.target.value)"
      >
      <p v-if="!$v.form.country.required && showErrors" class="error-txt">
        Country is required
      </p>


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
      </div>
    </div>
</template>
