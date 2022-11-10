export const state = () => ({
  PaymentInformation: {
    cardType: 'visa',
    cardNumber: '',
    firstName: '',
    surname: '',
    validFrom: '/',
    expiryDate: '/',
    issueNumber: '',
    securityNumber: ''
  }
})

export const mutations = {
  setPaymentCardType (state, payload) {
    state.PaymentInformation.cardType = payload
  },
  setPaymentCardNumber (state, payload) {
    state.PaymentInformation.cardNumber = payload
  },
  setPaymentFirstName (state, payload) {
    state.PaymentInformation.firstName = payload
  },
  setPaymentSurname (state, payload) {
    state.PaymentInformation.surname = payload
  },
  setPaymentValidFrom (state, payload) {
    state.PaymentInformation.validFrom = payload
  },
  setPaymentValidFromMonth (state, payload) {
    state.PaymentInformation.validFrom =
     payload + '/' + state.PaymentInformation.validFrom.substring(state.PaymentInformation.validFrom.indexOf('/') + 1)
  },
  setPaymentValidFromYear (state, payload) {
    state.PaymentInformation.validFrom =
      state.PaymentInformation.validFrom.substring(0, state.PaymentInformation.validFrom.lastIndexOf('/') + 1) + payload
  },
  setPaymentExpiryDate (state, payload) {
    state.PaymentInformation.expiryDate = payload
  },
  setPaymentExpiryDateMonth (state, payload) {
    state.PaymentInformation.expiryDate =
      payload + '/' + state.PaymentInformation.expiryDate.substring(state.PaymentInformation.expiryDate.indexOf('/') + 1)
  },
  setPaymentExpiryDateYear (state, payload) {
    state.PaymentInformation.expiryDate =
      state.PaymentInformation.expiryDate.substring(0, state.PaymentInformation.expiryDate.lastIndexOf('/') + 1) + payload
  },
  setPaymentIssueNumber (state, payload) {
    state.PaymentInformation.issueNumber = payload
  },
  setPaymentSecurityNumber (state, payload) {
    state.PaymentInformation.securityNumber = payload
  }
}
