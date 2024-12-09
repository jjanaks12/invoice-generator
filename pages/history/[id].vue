<script lang="ts" setup>
  import type { InvoiceHistory } from '@prisma/client'
  import Preview from '~/components/invoice/preview.client.vue'

  const route = useRoute()
  const router = useRouter()
  const history = ref<InvoiceHistory>()

  onMounted(async () => {
    history.value = await $fetch<InvoiceHistory>(`/api/history/${route.params.id}`)
  })
</script>

<template>
  <div class="container">
  </div>
  <client-only>
    <!-- @vue-expect-error -->
    <preview :show="true" :fields="history?.details?.fields || []" :data="history?.details?.data || {}" :on-close="() => {
      router.go(-1)
    }" />
  </client-only>
</template>
