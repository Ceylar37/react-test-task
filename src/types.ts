import {FilterValue} from "./components/Field";

const crypto = ['BTC', 'ETH', 'USDTTRC']
const banks = ['ACRUB', 'SBERRUB', 'TCSBRUB']
const cash = ['CASHUSD', 'CASHRUB']

export const filtersArrays: Omit<Record<FilterValue, string[]>, FilterValue.ALL> = {
  [FilterValue.CRYPTO]: crypto,
  [FilterValue.BANK]: banks,
  [FilterValue.CASH]: cash,
}

export interface Direction {
  code: string;
  name: string
}