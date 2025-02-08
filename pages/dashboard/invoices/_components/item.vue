<script setup lang="ts">
    import type { Invoice } from '@prisma/client'

    import { formatDate } from '~/lib/filters/formateDate'
    import { useInvoiceStore } from '~/store/invoice'

    type InvoiceItemProps = {
        index: number
        invoiceItem: Invoice
    }

    const props = defineProps<InvoiceItemProps>()
    const { saveToServer, removeInvoice } = useInvoiceStore()

    const deleteId = ref<number | null>(null)

    const savingToServer = async (invoiceDetail: Invoice) => {
        await saveToServer(invoiceDetail)
        removeInvoice(props.index)
    }

    const deleteInvoice = () => {
        if (deleteId.value != null && deleteId.value >= 0)
            removeInvoice(deleteId.value)
                .then(() => {
                    deleteId.value = null
                })
    }
</script>

<template>
    <div class="invoice__item">
        <div class="invoice__item__detail">
            <strong>To <span>{{ invoiceItem.to_name }}</span></strong>
            <em>{{ formatDate(invoiceItem.date) }}</em>
        </div>
        <div class="invoice__item__action">
            <a href="#" class="btn btn__danger btn--outline btn--xs" @click.prevent="deleteId = index">Delete</a>
            <NuxtLink :to="{ name: 'dashboard-generate-invoice', query: { index, id: invoiceItem.id } }"
                class="btn btn__secondary btn--xs">Load
            </NuxtLink>
            <a href="#" class="btn btn__info btn--xs" v-if="!invoiceItem.id"
                @click.prevent="savingToServer(invoiceItem)">Sync</a>
        </div>
        <div class="invoice__item__overlay" v-if="typeof deleteId == 'number' && deleteId == index">
            <div class="holder">
                <strong class="title">Are you sure you want to delete?</strong>
                <div class="btn__holder">
                    <a href="#" class="btn btn--xs btn__primary" @click.prevent="deleteInvoice">Yes</a>
                    <a href="#" class="btn btn--xs btn__secondary btn--outline" @click.prevent="deleteId = null">No</a>
                </div>
            </div>
        </div>
    </div>
</template>