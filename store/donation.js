export const state = () => ({
  DonationInformation: {
    accountHolder: '',
    accountNumber: '',
    amount: '10',
    frequency: 'monthly',
    sortCode: ''
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
  setDonationSortCode (state, payload) {
    state.DonationInformation.sortCode = payload
  }
}
