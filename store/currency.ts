import type { Currency } from '@prisma/client'
import { defineStore } from 'pinia'

const defaultCurrency: Currency = {
  symbol: "",
  name: "",
  symbol_native: "",
  decimal_digits: 2,
  rounding: 0,
  code: "",
  name_plural: "",
  id: ''
}

export const useCurrencyStore = defineStore('currency', () => {
  const currencies = ref<Currency[]>([])

  const getCurrency = (id: string) => {
    let cure = defaultCurrency
    if (id) {
      $fetch<Currency>(`/api/currency/${id}`)
        .then((curr) => {
          cure = curr
        })
    }

    return cure
  }

  const fetch = async () => {
    currencies.value = await $fetch<Currency[]>('/api/currency', { method: 'GET' })
  }

  return { currencies, getCurrency, fetch }
})
