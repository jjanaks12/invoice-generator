<script lang="ts" setup>
  import { useInvoiceStore } from '@/store/invoice'

  import InvoiceItem from './_components/item.vue'

  definePageMeta({
    layout: 'default',
    middleware: 'auth'
  })

  const { invoices, invoicesFromCloud } = storeToRefs(useInvoiceStore())
  const { fetchInvoiceFromSever } = useInvoiceStore()

  onMounted(() => {
    if (invoicesFromCloud.value.length == 0)
      fetchInvoiceFromSever()
  })

</script>

<template>
  <ClientOnly>
    <div class="container">
      <section class="invoice__section">
        <header class="invoice__section__header">
          <h1>Your saved invoices</h1>
        </header>
        <div class="invoice__section__body">
          <h2 v-if="invoices.length > 0">Synced with cloud</h2>
          <div class="invoice__list">
            <InvoiceItem v-for="invoiceItem in invoicesFromCloud" :invoice-item="invoiceItem" :index="0" />
          </div>
          <template v-if="invoices.length > 0">
            <h2>Not synced </h2>
            <div class="invoice__list">
              <InvoiceItem v-for="(invoiceItem, index) in invoices" :invoice-item="invoiceItem" :index="index" />
            </div>
          </template>
        </div>
      </section>
    </div>
  </ClientOnly>
</template>
