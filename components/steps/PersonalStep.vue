<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
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
      'setPersonalDetailsFirstName',
      'setPersonalDetailsLastName',
      'setPersonalDetailsEmail',
      'setPersonalDetailsTitle',
      'setPersonalDetailsMobile',
      'setPersonalDetailsPostcode',
      'setPersonalDetailsHouseNumber',
      'setPersonalDetailsStreet',
      'setPersonalDetailsCity',
      'setPersonalDetailsCountry'
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
  <div>
    <h3>Personal details</h3>
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
    <p v-if="!$v.form.firstName.required && showErrors" class="error">
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
    <p v-if="!$v.form.lastName.required && showErrors" class="error">
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
    <p v-if="!$v.form.email.required && showErrors" class="error">
      Email is required
    </p>
    <p v-if="!$v.form.email.email && showErrors" class="error">
      Not valid email
    </p>

    <label for="mobile">Mobile</label>
    <input
      id="mobile"
      v-model.trim="form.mobile"
      name="mobile"
      type="text"
      placeholder="Enter your mobile phone"
      @keyup="setMobile($event.target.value)"
    >
    <p v-if="!$v.form.mobile.required && showErrors" class="error">
      Mobile phone is required
    </p>

    <h3>Billing address</h3>
    <label for="postcode">Postcode</label>
    <input
      id="postcode"
      v-model.trim="form.postcode"
      name="postcode"
      type="text"
      placeholder="Enter your post code"
      @keyup="setPostCode($event.target.value)"
    >
    <p v-if="!$v.form.postcode.required && showErrors" class="error">
      Post code is required
    </p>
    <label for="houseNumber">House number</label>
    <input
      id="houseNumber"
      v-model.trim="form.houseNumber"
      name="houseNumber"
      type="text"
      placeholder="Enter your house number"
      @keyup="setHouseNumber($event.target.value)"
    >
    <p v-if="!$v.form.houseNumber.required && showErrors" class="error">
      House number is required
    </p>
    <label for="street">Street</label>
    <input
      id="street"
      v-model.trim="form.street"
      name="street"
      type="text"
      placeholder="Enter your street"
      @keyup="setStreet($event.target.value)"
    >
    <p v-if="!$v.form.street.required && showErrors" class="error">
      Street is required
    </p>
    <label for="city">City</label>
    <input
      id="city"
      v-model.trim="form.city"
      name="city"
      type="text"
      placeholder="Enter your city"
      @keyup="setCity($event.target.value)"
    >
    <p v-if="!$v.form.city.required && showErrors" class="error">
      City is required
    </p>
    <label for="country">Country</label>
    <input
      id="country"
      v-model.trim="form.country"
      name="country"
      type="text"
      placeholder="Enter your country"
      @keyup="setCountry($event.target.value)"
    >
    <p v-if="!$v.form.country.required && showErrors" class="error">
      Country is required
    </p>
  </div>
</template>
