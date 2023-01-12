<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PersonalStep',
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
        email: this.$store.state.personalDetails.email,
        mobile: this.$store.state.personalDetails.mobile,
        postcode: this.$store.state.personalDetails.postcode,
        houseNumber: this.$store.state.personalDetails.houseNumber,
        street: this.$store.state.personalDetails.street,
        city: this.$store.state.personalDetails.city,
        country: this.$store.state.personalDetails.country
      }
    }
  },
  validations: {
    form: {
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
    }
  },
  computed: {
    ...mapState(['personalDetails'])
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
      'setPersonalDetailsMobile',
      'setPersonalDetailsPostcode',
      'setPersonalDetailsHouseNumber',
      'setPersonalDetailsStreet',
      'setPersonalDetailsCity',
      'setPersonalDetailsCountry'
    ]),
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
      <label for="title" class="form__input__lbl">Title</label>

      <div class="form__input__disabled">
        <input
          id="title"
          name="title"
          type="text"
          :value="form.title"
          disabled
        >
        <span
          class="tooltip tooltip--left"
          data-text="Already entered value, if you want to change it please go to previous steps"
        >
          <img :src="require('/assets/images/icons/help_outline.svg')" alt="tooltip">
        </span>
      </div>

      <label for="first-name" class="form__input__lbl">First name</label>

      <div class="form__input__disabled">
        <input
          id="first-name"
          name="first-name"
          class="form__input__txt"
          type="text"
          :value="form.firstName"
          disabled
        >
        <span
          class="tooltip tooltip--left"
          data-text="Already entered value, if you want to change it please go to previous steps"
        >
          <img :src="require('/assets/images/icons/help_outline.svg')" alt="tooltip">
        </span>
      </div>

      <label for="last-name" class="form__input__lbl">Last name</label>
      <div class="form__input__disabled">
        <input
          id="last-name"
          class="form__input__txt"
          name="last-name"
          type="text"
          :value="form.lastName"
          disabled
        >
        <span
          class="tooltip tooltip--left"
          data-text="Already entered value, if you want to change it please go to previous steps"
        >
          <img :src="require('/assets/images/icons/help_outline.svg')" alt="tooltip">
        </span>
      </div>

      <label for="email" class="form__input__lbl">Email</label>
      <div class="form__input__disabled">
        <input
          id="email"
          name="email"
          class="form__input__txt"
          type="text"
          :value="form.email"
          disabled
        >
        <span
          class="tooltip tooltip--left"
          data-text="Already entered value, if you want to change it please go to previous steps"
        >
          <img :src="require('/assets/images/icons/help_outline.svg')" alt="tooltip">
        </span>
      </div>

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
    </div>
  </div>
</template>
