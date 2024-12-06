import { defineStore } from 'pinia'
import type { InvoiceDetail } from '~/app'

export const useInvoiceStore = defineStore('invoice', () => {
  const invoices = ref<InvoiceDetail[]>([])
  const fieldLength = computed(() => JSON.stringify(invoices.value || {}).length)

  const getInvoice = (index: number) => invoices.value[index]

  const totolInvoices = computed(() => invoices.value.length)

  const removeInvoice = (index: number) => new Promise((resolve) => {
    console.log(index);
    
    invoices.value.splice(index, 1)
    resolve(true)
  })

  const isInInvoiceList = (invoice: InvoiceDetail): boolean => {
    const a = invoices.value.find(inv => inv.to_name === invoice.from_name) != undefined
    console.log(a, invoice, invoices.value);

    return false
  }

  return { invoices, totolInvoices, fieldLength, getInvoice, removeInvoice, isInInvoiceList }
}, {
  persist: [{
    storage: persistedState.localStorage,
    paths: ['invoices']
  }]
})
