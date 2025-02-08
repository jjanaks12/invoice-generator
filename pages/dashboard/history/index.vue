<script lang="ts" setup>
  import type { InvoiceHistory } from '@prisma/client'
  import { formatDate, fromNow } from '~/lib/filters/formateDate'
  const { public: { appName } } = useRuntimeConfig()

  useHead({
    title: `Invoice history :: ${appName}`
  })

  definePageMeta({
    middleware: 'auth'
  })

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
        <ul class="list">
          <li v-for="history in historyList" class="list__item">
            <NuxtLink :to="`/dashboard/history/${history.id}`">
              {{ history.id }}
              <MdiIcon preserveAspectRatio="xMidYMid meet" size="12" icon="mdiLinkVariant" />
            </NuxtLink>
            <strong class="list__item__title">To {{ history.details.data.to_name }}</strong>
            <time :datetime="formatDate(history.date, 'YYYY-MM-DD HH:mm')">{{ fromNow(history.date) }}</time>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>