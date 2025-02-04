export const TEST_IDS = {
  common: {
    cart: {
      cartItem: 'cartItem',
      cartItemName: 'cartItemName',
      cartItemPlusOne: 'cartItemPlusOne',
      cartItemMinusOne: 'cartItemMinusOne',
      cartItemCount: 'cartItemCount',
      cartItemPrice: 'cartItemPrice',
      cartSubTotal: 'cartSubTotal',
    },
    alert: 'alert',
  },
  reset: {
    resetButton: 'resetButton',
    resetSuccess: 'resetSuccess',
    resetError: 'resetError',
  },
  homepageCard: {
    useCaseTitle: 'useCaseTitle',
    useCaseDescription: 'useCaseDescription',
    useCaseIcon: 'useCaseIcon',
  },
  loanRisk: {
    monthlyInstallmentValue: 'monthlyInstallmentValue',
    submitApplication: 'submitApplication',
    name: 'name',
    surname: 'surname',
    loanValue: 'loanValue',
    monthlyIncome: 'monthlyIncome',
    loanTerm: 'loanTerm',
  },
  personalization: {
    coffeeProduct: 'coffeeProduct',
    coffeeProductPrice: 'coffeeProductPrice',
    coffeeProductName: 'coffeeProductName',
    addToCart: 'addToCart',
    search: 'search',
    searchHistoryItem: 'searchHistoryItem',
  },
  paymentFraud: {
    submitPayment: 'submitPayment',
    cardNumber: 'cardNumber',
    cardExpiration: 'cardExpiration',
    cardCvv: 'cardCvv',
    usingStolenCard: 'usingStolenCard',
    askForChargeback: 'askForChargeback',
  },
  paywall: {
    articleCard: 'articleCard',
    articleContent: 'articleContent',
    goBack: 'goBack',
  },
  couponFraud: {
    couponCode: 'couponCode',
    submitCoupon: 'submitCoupon',
  },
  webScraping: {
    search: 'search',
    card: 'card',
    originAirportCode: 'originAirportCode',
    destinationAirportCode: 'destinationAirportCode',
    price: 'price',
    departureTime: 'departureTime',
    arrivalTime: 'arrivalTime',
    airline: 'airline',
  },
  credentialStuffing: {
    login: 'login',
    password: 'password',
  },
} as const;
