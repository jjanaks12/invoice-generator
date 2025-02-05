<script lang="ts" setup>
  import type { InvoiceHistory } from '@prisma/client'
  import Preview from '~/components/invoice/preview.client.vue'

  const route = useRoute()
  const router = useRouter()
  const history = ref<InvoiceHistory>()

  definePageMeta({
    middleware: 'auth'
  })

  onMounted(async () => {
    history.value = await $fetch<InvoiceHistory>(`/api/history/${route.params.id}`)
  })
</script>

<template>
  <client-only>
    <preview :show="true" :fields="history?.details?.fields || []" :data="history?.details?.data || {}" :on-close="() => {
      router.go(-1)
    }" />
  </client-only>
</template>
