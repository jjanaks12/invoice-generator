import type { Invoice } from '@prisma/client'
import { defineStore } from 'pinia'

export const useInvoiceStore = defineStore('invoice', () => {
  const invoices = ref<Invoice[]>([])
  const invoicesFromCloud = ref<Invoice[]>([])
  const fieldLength = computed(() => JSON.stringify(invoices.value || {}).length)

  const getInvoice = (index: number) => invoices.value[index]

  const totolInvoices = computed(() => invoices.value.length)

  const removeInvoice = (index: number) => new Promise((resolve) => {
    console.log(index);

    invoices.value.splice(index, 1)
    resolve(true)
  })

  const isInInvoiceList = (invoice: Invoice): boolean => {
    const a = invoices.value.find(inv => inv.to_name === invoice.from_name) != undefined
    console.log(a, invoice, invoices.value);

    return false
  }

  const getInvoiceFromCloud = async (id: string) => {
    return await $fetch<Invoice>(`/api/invoice/${id}`)
  }

  const fetchInvoiceFromSever = async () => {
    const invoices = await $fetch<Invoice[]>('/api/invoice', {
      method: 'GET'
    })

    invoicesFromCloud.value = invoices
  }

  const saveToServer = async (invoiceItem: Invoice) => {
    try {
      const a = await $fetch('/api/invoice', {
        method: 'POST',
        body: invoiceItem
      })

      fetchInvoiceFromSever()

      return Promise.resolve
    } catch (e) {
      throw createError({
        statusCode: 500,
        message: 'Internal server error'
      })
    }
  }

  return { invoices, totolInvoices, fieldLength, invoicesFromCloud, getInvoice, removeInvoice, isInInvoiceList, saveToServer, fetchInvoiceFromSever, getInvoiceFromCloud }
}, {
  persist: [{
    storage: persistedState.localStorage,
    paths: ['invoices']
  }]
})
