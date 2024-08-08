
const HOST = process.env.NEXT_PUBLIC_API
export const API_ROUTE = {
  DASHBOARD: `${HOST}/dashboard`,
  THE_SIMS: {
    CASTAWAY_PRODUCT: `${HOST}/the-sims/castaway-product`,
    TWO_PETS_CONSOLE_PRODUCT: `${HOST}/the-sims/two-pets-console-product`,
  }
}