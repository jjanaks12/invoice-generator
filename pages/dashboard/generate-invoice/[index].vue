<script lang="ts" setup>
    import InvoiceForm from '@/components/invoice/form.vue'

    definePageMeta({
        middleware: 'auth'
    })

    const route = useRoute()
    const index = ref<number | undefined>(undefined)
    const id = ref<string | undefined>(undefined)
    const invoiceForm = ref()

    const routeInit = () => {
        index.value = route.query.index ? parseInt(route.query.index as string) : undefined
        id.value = route.query.id ? route.query.id as string : undefined
    }

    watch(() => route.fullPath, routeInit, {
        deep: true,
        immediate: true
    })

    watch(index, () => {
        if (typeof index.value == 'undefined') {
            invoiceForm.value.resetForm()
        }
    })

    onMounted(() => routeInit)
</script>

<template>
    <div class="container">
        <ClientOnly>
            <InvoiceForm :invoice-index="index" :invoice-id="id" ref="invoiceForm" />
        </ClientOnly>
    </div>
</template>