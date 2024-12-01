<script lang="ts" setup>
  import { useInvoiceStore } from '@/store/invoice'

  const { invoices } = storeToRefs(useInvoiceStore())
  const { removeInvoice } = useInvoiceStore()
  const deleteId = ref<number | null>(null)

  const deleteInvoice = () => {
    if (deleteId.value != null && deleteId.value >= 0)
      removeInvoice(deleteId.value)
        .then(() => {
          deleteId.value = null
        })
  }
</script>

<template>
  <ClientOnly>
    <div class="container">
      <section class="invoice__section">
        <header class="invoice__section__header">
          <h1>Your saved invoices</h1>
        </header>
        <div class="invoice__section__body">
          <div class="invoice__list">
            <div class="invoice__item" v-for="(invoiceItem, index) in invoices">
              <div class="invoice__item__detail">
                <strong>To <span>{{ invoiceItem.to_name }}</span></strong>
                <em>{{ invoiceItem.date }}</em>
              </div>
              <div class="invoice__item__action">
                <a href="#" class="btn btn__danger btn--outline btn--xs" @click.prevent="deleteId = index">Delete</a>
                <NuxtLink :to="{ name: 'generate-invoice', query: { index } }" class="btn btn__secondary btn--xs">Load
                </NuxtLink>
                <a href="#" class="btn btn__info btn--xs btn--disabled" disabled
                  @click.prevent="deleteId = index">Sync</a>
              </div>
              <div class="invoice__item__overlay" v-if="deleteId == index">
                <div class="holder">
                  <strong class="title">Are you sure you want to delete?</strong>
                  <div class="btn__holder">
                    <a href="#" class="btn btn--xs btn__primary" @click.prevent="deleteInvoice">Yes</a>
                    <a href="#" class="btn btn--xs btn__secondary btn--outline" @click.prevent="deleteId = null">No</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </ClientOnly>
</template>
