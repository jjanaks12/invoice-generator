<script lang="ts" setup>
    import InvoiceForm from '@/components/invoice/form.vue'
    
    /* definePageMeta({
        middleware: 'auth'
    }) */

    const route = useRoute()
    const index = ref<number | undefined>(undefined)
    const invoiceForm = ref()

    watch(() => route.fullPath, () => {
        index.value = route.query.index ? parseInt(route.query.index as string) : undefined
    }, {
        deep: true,
        immediate: true
    })

    watch(index, () => {
        if (typeof index.value == 'undefined') {
            invoiceForm.value.resetForm()
        }
    })

    onMounted(() => {
        index.value = route.query.index ? parseInt(route.query.index as string) : undefined
    })
</script>

<template>
    <div class="container">
        <ClientOnly>
            <InvoiceForm :invoice-index="index" ref="invoiceForm" />
        </ClientOnly>
    </div>
</template>