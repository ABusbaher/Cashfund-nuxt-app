export const state = () => ({
  DonationInformation: {
    accountHolder: '',
    accountNumber: '',
    amount: null,
    frequency: 'monthly',
    confirmAccount: false,
    confirmPayment: false
  }
})

export const mutations = {
  setDonationAccountHolder (state, payload) {
    state.DonationInformation.accountHolder = payload
  },
  setDonationAccountNumber (state, payload) {
    state.DonationInformation.accountNumber = payload
  },
  setDonationAmount (state, payload) {
    state.DonationInformation.amount = payload
  },
  setDonationFrequency (state, payload) {
    state.DonationInformation.frequency = payload
  },
  setConfirmAccount (state, payload) {
    state.DonationInformation.confirmAccount = payload
  },
  setConfirmPayment (state, payload) {
    state.DonationInformation.confirmPayment = payload
  }
}
