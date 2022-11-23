export enum FilterValue {
  ALL = 'All',
  CRYPTO = 'Crypto',
  BANK = 'Bank',
  CASH = 'Cash'
}

export const FilterName: Record<FilterValue, string> = {
  [FilterValue.ALL]: 'Все',
  [FilterValue.CRYPTO]: 'Криптовалюты',
  [FilterValue.BANK]: 'Банки',
  [FilterValue.CASH]: 'Наличные',
}
