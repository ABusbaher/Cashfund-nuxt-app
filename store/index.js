export const state = () => ({
  personalDetails: {
    title: 'mr',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    postcode: '',
    houseNumber: '',
    street: '',
    city: '',
    country: ''
  }
})

export const mutations = {
  setPersonalDetailsTitle (state, payload) {
    state.personalDetails.title = payload
  },
  setPersonalDetailsFirstName (state, payload) {
    state.personalDetails.firstName = payload
  },
  setPersonalDetailsLastName (state, payload) {
    state.personalDetails.lastName = payload
  },
  setPersonalDetailsEmail (state, payload) {
    state.personalDetails.email = payload
  },
  setPersonalDetailsPostcode (state, payload) {
    state.personalDetails.postcode = payload
  },
  setPersonalDetailsHouseNumber (state, payload) {
    state.personalDetails.houseNumber = payload
  },
  setPersonalDetailsMobile (state, payload) {
    state.personalDetails.mobile = payload
  },
  setPersonalDetailsStreet (state, payload) {
    state.personalDetails.street = payload
  },
  setPersonalDetailsCity (state, payload) {
    state.personalDetails.city = payload
  },
  setPersonalDetailsCountry (state, payload) {
    state.personalDetails.country = payload
  }
}
