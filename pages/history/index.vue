<script lang="ts" setup>
  import type { InvoiceHistory } from '@prisma/client'
  import { formatDate } from '~/lib/formateDate';


  const historyList = ref<InvoiceHistory[]>([])

  onMounted(async () => {
    await $fetch<InvoiceHistory[]>('/api/history')
      .then((list) => {
        historyList.value = list
      })
  })
</script>

<template>

  <div class="container">
    <section class="invoice__section">
      <header class="invoice__section__header">
        <h1>Your invoice history</h1>
      </header>
      <div class="invoice__section__body">
        <ul>
          <li v-for="history in historyList">
            <NuxtLink :to="{ name: 'history-id', params: { id: history.id } }">{{ history.id }}</NuxtLink>
            <time :datetime="formatDate(history.date, 'YYYY-MM-DD HH:mm')">{{ formatDate(history.date) }}</time>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>